/**
 * MacOSWindow — Production-grade draggable window manager
 *
 * Features:
 * - Direct DOM manipulation during drag (no React rerenders → 60fps)
 * - Viewport boundary clamping (windows cannot escape the desktop)
 * - Drag momentum (velocity-based deceleration on release)
 * - Edge snapping: drag to left/right screen edge → snap to half-screen
 * - Snap preview overlay (purple ghost rectangle)
 * - Bottom-right resize handle
 * - Dynamic shadow depth based on focus state
 * - Perfect macOS traffic-light buttons with hover icons
 * - Spring-based open/close animations
 */
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  children: React.ReactNode;
}

interface MacOSWindowProps extends WindowState {
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  isFocused: boolean;
}

const MENU_H = 28;      // menu bar height
const DOCK_H = 86;      // dock + padding
const SNAP_ZONE = 28;   // px from edge to trigger snap
const MIN_W = 420;
const MIN_H = 280;

// ── Traffic Light Button ──────────────────────────────────────────────────────
const TrafficLight = ({
  color, shadow, hoverSymbol, title, onClick, onMouseDown,
}: {
  color: string;
  shadow: string;
  hoverSymbol: string;
  title: string;
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
}) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 12, height: 12,
        borderRadius: "50%",
        background: color,
        border: "0.5px solid rgba(0,0,0,0.18)",
        boxShadow: `0 0 0 0.5px rgba(0,0,0,0.08), 0 0 5px ${shadow}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", flexShrink: 0,
        transition: "filter 0.1s",
        filter: hov ? "brightness(0.9)" : "none",
      }}
    >
      <svg
        viewBox="0 0 8 8"
        style={{ width: 6, height: 6, opacity: hov ? 1 : 0, transition: "opacity 0.08s" }}
      >
        {hoverSymbol === "x" && (
          <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round" />
        )}
        {hoverSymbol === "−" && (
          <path d="M1 4h6" stroke="rgba(0,0,0,0.45)" strokeWidth="1.5" strokeLinecap="round" />
        )}
        {hoverSymbol === "+" && (
          <path d="M4 1v6M1 4h6" stroke="rgba(0,0,0,0.45)" strokeWidth="1.3" strokeLinecap="round" />
        )}
      </svg>
    </button>
  );
};

// ── Main Window Component ─────────────────────────────────────────────────────
const MacOSWindow = ({
  id, title, icon,
  isMinimized, isMaximized,
  x: initX, y: initY,
  width: initW, height: initH,
  zIndex, children,
  onClose, onMinimize, onMaximize, onFocus, isFocused,
}: MacOSWindowProps) => {
  // Use refs for current position/size during drag (avoids rerenders)
  const posRef  = useRef({ x: initX, y: initY });
  const sizeRef = useRef({ w: initW, h: initH });

  // State only for re-render triggers
  const [pos,  setPos]  = useState({ x: initX, y: initY });
  const [size, setSize] = useState({ w: initW, h: initH });
  const [snapPreview, setSnapPreview] = useState<"left" | "right" | null>(null);
  const [tlHovering, setTlHovering] = useState(false); // whether mouse is over traffic lights group

  const divRef = useRef<HTMLDivElement>(null);

  // Sync when maximized prop changes
  useEffect(() => {
    if (isMaximized) {
      const np = { x: 0, y: MENU_H };
      const ns = { w: window.innerWidth, h: window.innerHeight - MENU_H - DOCK_H };
      posRef.current = np;
      sizeRef.current = ns;
      setPos(np);
      setSize(ns);
    } else {
      posRef.current = { x: initX, y: initY };
      sizeRef.current = { w: initW, h: initH };
      setPos({ x: initX, y: initY });
      setSize({ w: initW, h: initH });
    }
  }, [isMaximized, initX, initY, initW, initH]);

  // ── Drag logic ──────────────────────────────────────────────────────────────
  const drag = useRef({
    active: false,
    startMX: 0, startMY: 0,
    startX: 0, startY: 0,
    prevMX: 0, prevMY: 0,
    prevT: 0,
    vx: 0, vy: 0,
  });

  const handleTitleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized || e.button !== 0) return;
    if (tlHovering) return; // don't drag when clicking traffic lights area
    onFocus(id);
    e.preventDefault();

    const d = drag.current;
    d.active = true;
    d.startMX = e.clientX;
    d.startMY = e.clientY;
    d.startX  = posRef.current.x;
    d.startY  = posRef.current.y;
    d.prevMX  = e.clientX;
    d.prevMY  = e.clientY;
    d.prevT   = performance.now();
    d.vx = 0; d.vy = 0;

    const clampX = (x: number) => Math.max(0, Math.min(window.innerWidth  - sizeRef.current.w, x));
    const clampY = (y: number) => Math.max(MENU_H, Math.min(window.innerHeight - DOCK_H - 30, y));

    let rafId = 0;
    let latestMX = e.clientX, latestMY = e.clientY;

    const onMove = (me: MouseEvent) => {
      latestMX = me.clientX;
      latestMY = me.clientY;

      // Track velocity
      const now = performance.now();
      const dt  = Math.max(1, now - d.prevT);
      d.vx = (me.clientX - d.prevMX) / dt;
      d.vy = (me.clientY - d.prevMY) / dt;
      d.prevMX = me.clientX;
      d.prevMY = me.clientY;
      d.prevT  = now;

      // Snap preview
      if (me.clientX < SNAP_ZONE)                         setSnapPreview("left");
      else if (me.clientX > window.innerWidth - SNAP_ZONE) setSnapPreview("right");
      else                                                  setSnapPreview(null);

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!d.active || !divRef.current) return;
        const dx = latestMX - d.startMX;
        const dy = latestMY - d.startMY;
        const nx = clampX(d.startX + dx);
        const ny = clampY(d.startY + dy);
        posRef.current = { x: nx, y: ny };
        divRef.current.style.left = `${nx}px`;
        divRef.current.style.top  = `${ny}px`;
      });
    };

    const onUp = (me: MouseEvent) => {
      cancelAnimationFrame(rafId);
      d.active = false;

      const clampXf = (x: number) => Math.max(0, Math.min(window.innerWidth  - sizeRef.current.w, x));
      const clampYf = (y: number) => Math.max(MENU_H, Math.min(window.innerHeight - DOCK_H - 30, y));

      // Determine final position
      let fx = posRef.current.x;
      let fy = posRef.current.y;

      if (me.clientX < SNAP_ZONE) {
        // Snap left half
        fx = 0; fy = MENU_H;
        sizeRef.current = { w: Math.floor(window.innerWidth / 2), h: window.innerHeight - MENU_H - DOCK_H };
        setSize({ ...sizeRef.current });
      } else if (me.clientX > window.innerWidth - SNAP_ZONE) {
        // Snap right half
        fx = Math.floor(window.innerWidth / 2); fy = MENU_H;
        sizeRef.current = { w: Math.floor(window.innerWidth / 2), h: window.innerHeight - MENU_H - DOCK_H };
        setSize({ ...sizeRef.current });
      } else {
        // Apply momentum (capped)
        const momentumScale = 120;
        const capVel = (v: number) => Math.max(-15, Math.min(15, v));
        fx = clampXf(fx + capVel(d.vx) * momentumScale);
        fy = clampYf(fy + capVel(d.vy) * momentumScale);
      }

      posRef.current = { x: fx, y: fy };
      setPos({ x: fx, y: fy });
      setSnapPreview(null);

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup",   onUp);
  }, [id, isMaximized, onFocus, tlHovering]);

  // ── Resize logic ────────────────────────────────────────────────────────────
  const resizeRef = useRef({ active: false, startMX: 0, startMY: 0, startW: 0, startH: 0 });

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const r = resizeRef.current;
    r.active  = true;
    r.startMX = e.clientX;
    r.startMY = e.clientY;
    r.startW  = sizeRef.current.w;
    r.startH  = sizeRef.current.h;

    let rafId = 0;

    const onMove = (me: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!r.active) return;
        const nw = Math.max(MIN_W, r.startW + (me.clientX - r.startMX));
        const nh = Math.max(MIN_H, r.startH + (me.clientY - r.startMY));
        sizeRef.current = { w: nw, h: nh };
        if (divRef.current) {
          divRef.current.style.width  = `${nw}px`;
          divRef.current.style.height = `${nh}px`;
        }
      });
    };

    const onUp = () => {
      cancelAnimationFrame(rafId);
      r.active = false;
      setSize({ ...sizeRef.current });
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  }, []);

  if (isMinimized) return null;

  return (
    <>
      {/* ── Snap preview ghost ── */}
      <AnimatePresence>
        {snapPreview && (
          <motion.div
            key="snap-preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1,  scale: 1 }}
            exit={  { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            style={{
              position: "fixed",
              top: MENU_H + 6,
              left: snapPreview === "left" ? 6 : "50%",
              width: "calc(50% - 12px)",
              bottom: DOCK_H + 6,
              borderRadius: 14,
              background: "rgba(120,80,255,0.12)",
              border: "2px solid rgba(140,100,255,0.35)",
              zIndex: zIndex - 1,
              pointerEvents: "none",
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ── The Window ── */}
      <motion.div
        ref={divRef}
        key={id}
        initial={{ scale: 0.76, opacity: 0, y: 60, originX: 0.5, originY: 1 }}
        animate={{ scale: 1,    opacity: 1, y: 0, originX: 0.5, originY: 0.5 }}
        exit={{
          scale: 0.72, opacity: 0, y: 50, originX: 0.5, originY: 1,
          transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
        onMouseDown={() => onFocus(id)}
        style={{
          position:      "fixed",
          left:          pos.x,
          top:           pos.y,
          width:         size.w,
          height:        size.h,
          zIndex,
          display:       "flex",
          flexDirection: "column",
          borderRadius:  12,
          overflow:      "hidden",
          willChange:    "transform",
          boxShadow: isFocused
            ? "0 45px 110px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.13), 0 1px 0 rgba(255,255,255,0.07) inset"
            : "0 22px 65px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.07)",
          transition: "box-shadow 0.25s ease",
        }}
      >
        {/* ── Title Bar ── */}
        <div
          onMouseDown={handleTitleMouseDown}
          onDoubleClick={() => onMaximize(id)}
          style={{
            height: 44,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            userSelect: "none",
            cursor: "default",
            backdropFilter: "blur(50px) saturate(1.8)",
            WebkitBackdropFilter: "blur(50px) saturate(1.8)",
            background: isFocused
              ? "rgba(36, 24, 62, 0.97)"
              : "rgba(28, 20, 48, 0.94)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            transition: "background 0.2s",
          }}
        >
          {/* Traffic Lights group */}
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}
            onMouseEnter={() => setTlHovering(true)}
            onMouseLeave={() => setTlHovering(false)}
          >
            <TrafficLight
              color="#ff5f57" shadow="rgba(255,95,87,0.5)"
              hoverSymbol="x" title="Close"
              onClick={() => onClose(id)}
              onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}
            />
            <TrafficLight
              color="#febc2e" shadow="rgba(254,188,46,0.5)"
              hoverSymbol="−" title="Minimize"
              onClick={() => onMinimize(id)}
              onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}
            />
            <TrafficLight
              color="#28c840" shadow="rgba(40,200,64,0.5)"
              hoverSymbol="+" title="Full Screen"
              onClick={() => onMaximize(id)}
              onMouseDown={(e) => { e.stopPropagation(); onFocus(id); }}
            />
          </div>

          {/* Centered title */}
          <div style={{
            flex: 1, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 7, pointerEvents: "none",
          }}>
            <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>
            <span style={{
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.01em",
              fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
              color: isFocused ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.32)",
              transition: "color 0.2s",
            }}>
              {title}
            </span>
          </div>

          <div style={{ width: 68 }} /> {/* balance traffic lights */}
        </div>

        {/* ── Content Area ── */}
        <div style={{
          flex: 1, overflow: "hidden",
          background: "rgba(13, 9, 26, 0.95)",
          backdropFilter: "blur(60px)",
        }}>
          <div
            className="custom-scrollbar"
            style={{ height: "100%", overflowY: "auto", overflowX: "hidden" }}
          >
            {children}
          </div>
        </div>

        {/* ── Resize Handle ── */}
        {!isMaximized && (
          <div
            onMouseDown={handleResizeMouseDown}
            style={{
              position: "absolute", bottom: 0, right: 0,
              width: 18, height: 18,
              cursor: "se-resize", zIndex: 10,
              display: "flex", alignItems: "flex-end", justifyContent: "flex-end",
              padding: 3,
            }}
          >
            <svg viewBox="0 0 10 10" fill="none" style={{ width: 10, height: 10, opacity: 0.25 }}>
              <path d="M9 1L1 9M9 5L5 9M9 9" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default MacOSWindow;
