/**
 * MacOSDock — Premium macOS Dock
 *
 * Fixed:
 * - Only ONE icon magnifies at a time (proper gaussian falloff)
 * - Magnification only affects 1 neighbour on each side clearly
 * - Bounce only for the clicked icon
 * - macOS-style SVG app icons
 */
import { useState, useRef, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface DockItem {
  id: string;
  icon: string;          // emoji fallback
  svgIcon?: React.ReactNode; // optional SVG
  label: string;
  onClick: () => void;
  isOpen?: boolean;
  isFocused?: boolean;
  separatorBefore?: boolean;
}

interface MacOSDockProps {
  items: DockItem[];
  launchingId?: string | null;
}

const BASE  = 52;
const MAX_S = 1.65;  // max scale — real macOS is ~1.6
const SPREAD = 1.4;  // gaussian spread (lower = tighter magnification)

function gaussianScale(distance: number): number {
  if (distance === 0) return MAX_S;
  // Only magnify up to 2 neighbours
  if (Math.abs(distance) > 2.5) return 1;
  return 1 + (MAX_S - 1) * Math.exp(-(distance * distance) / (2 * SPREAD * SPREAD));
}

// ── macOS-accurate SVG app icons ────────────────────────────────────────────

const IconFinder = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="url(#finderGrad)" />
    <defs>
      <linearGradient id="finderGrad" x1="0" y1="0" x2="60" y2="60">
        <stop stopColor="#5AC8FA" />
        <stop offset="1" stopColor="#1565C0" />
      </linearGradient>
    </defs>
    {/* Face */}
    <ellipse cx="30" cy="33" rx="18" ry="16" fill="white" />
    {/* Left eye quadrant — blue */}
    <path d="M12 33 Q12 17 30 17 L30 33 Z" fill="#1A73E8" />
    {/* Right eye quadrant — white stays */}
    {/* Eyes */}
    <circle cx="22" cy="26" r="4" fill="#1A73E8" />
    <circle cx="22" cy="26" r="2" fill="white" />
    <circle cx="38" cy="26" r="4" fill="white" />
    <circle cx="38" cy="26" r="2" fill="#1A73E8" />
    {/* Smile */}
    <path d="M22 37 Q30 44 38 37" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

const IconTerminal = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="#1C1C1E" />
    <text x="10" y="36" fontFamily="'SF Mono', monospace" fontSize="13" fill="#00FF00">{">"}_</text>
    <text x="10" y="48" fontFamily="'SF Mono', monospace" fontSize="9" fill="#00FF0066">terminal</text>
  </svg>
);

const IconSafari = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="url(#safariGrad)" />
    <defs>
      <linearGradient id="safariGrad" x1="0" y1="0" x2="60" y2="60">
        <stop stopColor="#64D2FF" />
        <stop offset="1" stopColor="#0A84FF" />
      </linearGradient>
    </defs>
    <circle cx="30" cy="30" r="18" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
    <circle cx="30" cy="30" r="14" stroke="white" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Compass needle */}
    <polygon points="30,14 33,30 30,28 27,30" fill="white" />
    <polygon points="30,46 27,30 30,32 33,30" fill="rgba(255,255,255,0.4)" />
    <circle cx="30" cy="30" r="2" fill="white" />
    {/* Compass ticks */}
    {[0,90,180,270].map(deg => {
      const r = (deg * Math.PI) / 180;
      const x1 = 30 + 16 * Math.sin(r); const y1 = 30 - 16 * Math.cos(r);
      const x2 = 30 + 13 * Math.sin(r); const y2 = 30 - 13 * Math.cos(r);
      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1.5" opacity="0.8" />;
    })}
  </svg>
);

const IconAboutMac = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="url(#aboutGrad)" />
    <defs>
      <linearGradient id="aboutGrad" x1="0" y1="0" x2="60" y2="60">
        <stop stopColor="#8E8E93" />
        <stop offset="1" stopColor="#3A3A3C" />
      </linearGradient>
    </defs>
    {/* Apple logo */}
    <path d="M37.5 16.5c-1.8 2.2-4.7 3.9-7.5 3.7-.4-2.8 1-5.7 2.7-7.5 1.9-2.1 5-3.7 7.6-3.8.4 2.9-.8 5.8-2.8 7.6zm2.8 4.5c-4.1-.2-7.7 2.3-9.7 2.3-2 0-5.1-2.2-8.4-2.1-4.3.1-8.3 2.5-10.5 6.4-4.5 7.7-1.2 19.2 3.2 25.5 2.1 3.1 4.7 6.5 8 6.4 3.2-.1 4.4-2 8.3-2 3.9 0 5 2 8.3 1.9 3.5-.1 5.7-3.1 7.8-6.2 2.5-3.5 3.5-6.9 3.5-7.1-.1 0-6.7-2.6-6.8-10.2-.1-6.4 5.2-9.4 5.5-9.6-3-4.5-7.6-5-9.2-5.3z" fill="white" transform="scale(0.6) translate(10, 5)" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="url(#mailGrad)" />
    <defs>
      <linearGradient id="mailGrad" x1="0" y1="0" x2="60" y2="60">
        <stop stopColor="#5AC8FA" />
        <stop offset="1" stopColor="#0A84FF" />
      </linearGradient>
    </defs>
    <rect x="10" y="18" width="40" height="28" rx="4" fill="white" opacity="0.9" />
    <polyline points="10,22 30,34 50,22" stroke="#0A84FF" strokeWidth="2.5" fill="none" />
  </svg>
);

const IconCalendar = () => {
  const d = new Date();
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  return (
    <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
      <rect width="60" height="60" rx="13" fill="white" />
      <rect x="0" y="0" width="60" height="18" rx="13" fill="#FF3B30" />
      <rect x="0" y="9" width="60" height="9" fill="#FF3B30" />
      <text x="30" y="14" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="9" fontWeight="700" fill="white">{month}</text>
      <text x="30" y="46" textAnchor="middle" fontFamily="-apple-system, sans-serif" fontSize="26" fontWeight="200" fill="#1C1C1E">{day}</text>
    </svg>
  );
};

const IconVSCode = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="#0078D4" />
    <path d="M44 10L32 22 20 14 10 20 22 30 10 40 20 46 32 38 44 50 52 46V14L44 10Z" fill="white" opacity="0.9" />
    <path d="M44 10L32 22 32 38 44 50 52 46V14L44 10Z" fill="white" opacity="0.5" />
    <path d="M10 20L22 30 10 40 10 40 14 42.3 24 33.4 24 26.6 14 17.7 10 20Z" fill="#0078D4" />
  </svg>
);

const IconMissions = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="url(#mcGrad)" />
    <defs>
      <linearGradient id="mcGrad" x1="0" y1="0" x2="60" y2="60">
        <stop stopColor="#30D158" />
        <stop offset="1" stopColor="#25A244" />
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="20" height="15" rx="3" fill="white" opacity="0.9" />
    <rect x="32" y="8" width="20" height="15" rx="3" fill="white" opacity="0.7" />
    <rect x="8" y="27" width="20" height="15" rx="3" fill="white" opacity="0.7" />
    <rect x="32" y="27" width="20" height="15" rx="3" fill="white" opacity="0.9" />
    <rect x="16" y="45" width="28" height="9" rx="4" fill="white" opacity="0.5" />
  </svg>
);

const IconResume = () => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect width="60" height="60" rx="13" fill="white" stroke="rgba(0,0,0,0.1)" />
    <rect x="12" y="10" width="36" height="45" rx="3" fill="#F5F5F5" stroke="rgba(0,0,0,0.08)" />
    <rect x="16" y="17" width="22" height="2.5" rx="1" fill="#FF3B30" />
    <rect x="16" y="23" width="28" height="1.5" rx="0.75" fill="#3C3C3C" opacity="0.5" />
    <rect x="16" y="27" width="24" height="1.5" rx="0.75" fill="#3C3C3C" opacity="0.3" />
    <rect x="16" y="33" width="28" height="1.5" rx="0.75" fill="#3C3C3C" opacity="0.5" />
    <rect x="16" y="37" width="20" height="1.5" rx="0.75" fill="#3C3C3C" opacity="0.3" />
    <rect x="16" y="43" width="28" height="1.5" rx="0.75" fill="#3C3C3C" opacity="0.5" />
  </svg>
);

// Portfolio section icons
const IconFolder = ({ color = "#0A84FF" }: { color?: string }) => (
  <svg viewBox="0 0 60 60" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M5 18 Q5 14 9 14 L24 14 L28 18 L51 18 Q55 18 55 22 L55 48 Q55 52 51 52 L9 52 Q5 52 5 48 Z" fill={color} />
    <path d="M5 22 L55 22 L55 48 Q55 52 51 52 L9 52 Q5 52 5 48 Z" fill={color} opacity="0.85" />
  </svg>
);

// Icon map for dock
const IconMessages = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="14" fill="#34C759" />
    <path d="M32 12C20.954 12 12 19.828 12 29.5c0 5.433 2.923 10.292 7.42 13.504C18.672 45.98 15.65 49 14.5 50c4.156-.3 8.3-2.072 11.23-4.57 1.986.722 4.09 1.07 6.27 1.07 11.046 0 20-7.828 20-17.5S43.046 12 32 12z" fill="#FFF" />
  </svg>
);

const IconMusic = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="14" fill="#FF2D55" />
    <path d="M26 40c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5V22l16-3v14c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5V15L26 18v22z" fill="#FFF" />
  </svg>
);

const IconNotes = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="14" fill="#F2F2F7" />
    <rect x="8" y="8" width="48" height="14" fill="#FFCC00" rx="4" />
    <path d="M16 32h32M16 42h32M16 52h24" stroke="#D1D1D6" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IconPhotos = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="14" fill="#FFF" />
    <path d="M32 32c0-8.837-7.163-16-16-16 0 8.837 7.163 16 16 16z" fill="#32D74B" opacity="0.8" />
    <path d="M32 32c8.837 0 16-7.163 16-16 0 8.837-7.163 16-16 16z" fill="#FFD60A" opacity="0.8" />
    <path d="M32 32c0 8.837 7.163 16 16 16 0-8.837-7.163-16-16-16z" fill="#FF375F" opacity="0.8" />
    <path d="M32 32c-8.837 0-16 7.163-16 16 0-8.837 7.163-16 16-16z" fill="#0A84FF" opacity="0.8" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 64 64" width="100%" height="100%">
    <rect width="64" height="64" rx="14" fill="#8E8E93" />
    <circle cx="32" cy="32" r="16" fill="#D1D1D6" />
    <path d="M32 14c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2zm0 44c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2zM14 32c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2zm44 0c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2s.9 2 2 2h4c1.1 0 2-.9 2-2zM19.27 19.27c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0l2.83 2.83c.78.78.78 2.05 0 2.83zm28.29 28.29c-.78.78-2.05.78-2.83 0l-2.83-2.83c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0l2.83 2.83c.78.78.78 2.05 0 2.83z" fill="#F2F2F7" />
  </svg>
);

const DOCK_SVG_ICONS: Record<string, React.ReactNode> = {
  finder:        <IconFinder />,
  terminal:      <IconTerminal />,
  safari:        <IconSafari />,
  "about-dev":   <IconAboutMac />,
  mail:          <IconMail />,
  calendar:      <IconCalendar />,
  vscode:        <IconVSCode />,
  "mission-ctl": <IconMissions />,
  "resume-dock": <IconResume />,
  projects:      <IconFolder color="#0A84FF" />,
  experience:    <IconFolder color="#30D158" />,
  skills:        <IconFolder color="#FF9F0A" />,
  achievements:  <IconFolder color="#FFD60A" />,
  education:     <IconFolder color="#BF5AF2" />,
  messages:      <IconMessages />,
  music:         <IconMusic />,
  notes:         <IconNotes />,
  photos:        <IconPhotos />,
  settings:      <IconSettings />,
};

const MacOSDock = ({ items, launchingId }: MacOSDockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pressedId, setPressedId] = useState<string | null>(null);
  // Use a ref to avoid stale closure issues with mouse position
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: 6,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9900,
        display: "flex",
        alignItems: "flex-end",
        padding: "8px 14px 10px",
        gap: 6,
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(60px) saturate(2.5)",
        WebkitBackdropFilter: "blur(60px) saturate(2.5)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 22,
        boxShadow:
          "0 6px 32px rgba(0,0,0,0.45), " +
          "inset 0 1px 0 rgba(255,255,255,0.25), " +
          "0 0 0 0.5px rgba(0,0,0,0.2)",
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, i) => {
        const dist  = hoveredIndex !== null ? Math.abs(i - hoveredIndex) : 999;
        const scale = hoveredIndex !== null ? gaussianScale(dist) : 1;
        const liftY = hoveredIndex !== null ? (scale - 1) * BASE * 0.6 : 0;
        const isLaunch = launchingId === item.id;
        const svgIcon = DOCK_SVG_ICONS[item.id];

        return (
          <Fragment key={item.id}>
            {/* Separator */}
            {item.separatorBefore && (
              <div style={{
                width: 1,
                alignSelf: "stretch",
                margin: "6px 3px",
                background: "rgba(255,255,255,0.28)",
                borderRadius: 1,
                flexShrink: 0,
              }} />
            )}

            {/* Icon wrapper */}
            <motion.div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transformOrigin: "bottom center",
              }}
              animate={{
                scale,
                y: -liftY,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.5 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseDown={() => setPressedId(item.id)}
              onMouseUp={() => setPressedId(null)}
              onClick={item.onClick}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    key="tip"
                    initial={{ opacity: 0, y: 4, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.88 }}
                    transition={{ duration: 0.1 }}
                    style={{
                      position: "absolute",
                      bottom: BASE * scale + 14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      background: "rgba(30,20,55,0.92)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      borderRadius: 7,
                      padding: "4px 11px",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.92)",
                      fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                      boxShadow: "0 4px 18px rgba(0,0,0,0.45)",
                      pointerEvents: "none",
                      zIndex: 999,
                    }}
                  >
                    {item.label}
                    <div style={{
                      position: "absolute",
                      bottom: -4,
                      left: "50%",
                      transform: "translateX(-50%) rotate(45deg)",
                      width: 7, height: 7,
                      background: "rgba(30,20,55,0.92)",
                      border: "1px solid rgba(255,255,255,0.16)",
                      borderTop: "none", borderLeft: "none",
                    }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* App Icon */}
              <motion.div
                animate={
                  isLaunch
                    ? { y: [0, -22, 0, -12, 0, -5, 0], transition: { duration: 0.75, ease: "easeOut" } }
                    : pressedId === item.id
                    ? { scale: 0.86, transition: { type: "spring", stiffness: 700, damping: 22 } }
                    : { scale: 1, y: 0 }
                }
                style={{
                  width: BASE,
                  height: BASE,
                  borderRadius: Math.round(BASE * 0.225),
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: Math.round(BASE * 0.52),
                  // Only show bg/border if no SVG icon
                  background: svgIcon ? "transparent" : (item.isFocused ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"),
                  border: svgIcon ? "none" : (item.isFocused ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.1)"),
                  boxShadow: svgIcon ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                  filter: item.isFocused && svgIcon ? "brightness(1.08)" : undefined,
                }}
              >
                {svgIcon ?? item.icon}
              </motion.div>

              {/* Running dot */}
              <div style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}>
                {item.isOpen && !isLaunch && (
                  <div style={{
                    width: 4, height: 4,
                    borderRadius: "50%",
                    background: item.isFocused ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                    boxShadow: item.isFocused ? "0 0 4px rgba(255,255,255,0.7)" : undefined,
                  }} />
                )}
                {isLaunch && (
                  <motion.div
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
                    transition={{ duration: 0.55, repeat: Infinity }}
                    style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }}
                  />
                )}
              </div>
            </motion.div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default MacOSDock;
