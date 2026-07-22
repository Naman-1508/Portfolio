/**
 * MacOSContextMenu — Native right-click context menu
 * Appears at cursor, dismisses on outside click / Escape
 */
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  separator?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

interface MacOSContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

const MacOSContextMenu = ({ x, y, items, onClose }: MacOSContextMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Clamp to viewport
  const menuW = 220;
  const menuH = items.length * 30 + 16;
  const cx = Math.min(x, window.innerWidth  - menuW - 8);
  const cy = Math.min(y, window.innerHeight - menuH - 8);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("mousedown", handle);
    document.addEventListener("keydown",   handleKey);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("keydown",   handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit={{   opacity: 0, scale: 0.92, y: -6  }}
      transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.5 }}
      style={{
        position:     "fixed",
        left:         cx,
        top:          cy,
        width:        menuW,
        zIndex:       99999,
        borderRadius: 10,
        overflow:     "hidden",
        padding:      "4px 0",
        background:   "rgba(40, 28, 66, 0.88)",
        backdropFilter: "blur(50px) saturate(2)",
        WebkitBackdropFilter: "blur(50px) saturate(2)",
        border:       "1px solid rgba(255,255,255,0.13)",
        boxShadow:    "0 20px 60px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06)",
        fontFamily:   "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {items.map((item, i) => {
        if (item.separator) {
          return <div key={item.id || `sep-${i}`} style={{ height: 1, margin: "4px 0", background: "rgba(255,255,255,0.1)" }} />;
        }
        return (
          <div
            key={item.id}
            role="menuitem"
            tabIndex={0}
            onClick={() => { item.onClick?.(); onClose(); }}
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "5px 14px",
              fontSize:       13,
              color:          item.danger ? "rgba(255,80,80,0.9)" : "rgba(255,255,255,0.88)",
              cursor:         "default",
              transition:     "background 0.08s",
              userSelect:     "none",
              gap:            8,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = item.danger
                ? "rgba(255,60,60,0.25)"
                : "rgba(120,90,255,0.35)";
              (e.currentTarget as HTMLDivElement).style.borderRadius = "6px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon && <span style={{ fontSize: 14, opacity: 0.8 }}>{item.icon}</span>}
              <span>{item.label}</span>
            </div>
            {item.shortcut && (
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}>
                {item.shortcut}
              </span>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export { MacOSContextMenu };

// ── Context menu state helper types ────────────────────────────────────────
export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
}

export const defaultContextMenuState: ContextMenuState = {
  visible: false, x: 0, y: 0, items: [],
};
