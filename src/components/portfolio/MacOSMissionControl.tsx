/**
 * MacOSMissionControl — Bird's-eye view of all open windows
 * Triggered by: Dock button, or ⌃↑ (Control + Up)
 */
import { motion, AnimatePresence } from "framer-motion";
import { WindowState } from "./MacOSWindow";

interface MacOSMissionControlProps {
  isOpen: boolean;
  windows: WindowState[];
  focusedId: string | null;
  onClose: () => void;
  onFocusWindow: (id: string) => void;
}

const MacOSMissionControl = ({
  isOpen, windows, focusedId, onClose, onFocusWindow,
}: MacOSMissionControlProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed", inset: 0,
            zIndex: 99950,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(30px) saturate(1.4)",
            WebkitBackdropFilter: "blur(30px) saturate(1.4)",
          }}
          onClick={onClose}
        >
          {/* Label */}
          <div style={{
            position: "absolute", top: 40, left: "50%", transform: "translateX(-50%)",
            fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.35)",
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
            letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            Mission Control
          </div>

          {/* Windows grid */}
          {windows.length === 0 ? (
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🖥️</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
                No open windows
              </div>
            </div>
          ) : (
            <div style={{
              position: "absolute",
              top: 80, left: 40, right: 40, bottom: 100,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignContent: "center",
              justifyContent: "center",
            }}>
              {windows.filter(w => !w.isMinimized).map((win, i) => {
                // Compute scaled size that fits within a card
                const scale = 0.32;
                const cardW = Math.min(win.width  * scale, 320);
                const cardH = Math.min(win.height * scale, 220);

                return (
                  <motion.div
                    key={win.id}
                    initial={{ scale: 0.7, opacity: 0, y: 40 }}
                    animate={{ scale: 1,   opacity: 1, y: 0  }}
                    exit={{   scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24, delay: i * 0.04 }}
                    onClick={(e) => { e.stopPropagation(); onFocusWindow(win.id); onClose(); }}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{
                      width: cardW,
                      height: cardH,
                      borderRadius: 12,
                      overflow: "hidden",
                      border: focusedId === win.id
                        ? "2px solid rgba(140,100,255,0.8)"
                        : "1px solid rgba(255,255,255,0.12)",
                      boxShadow: focusedId === win.id
                        ? "0 0 0 3px rgba(140,100,255,0.3), 0 20px 60px rgba(0,0,0,0.5)"
                        : "0 12px 40px rgba(0,0,0,0.4)",
                      background: "rgba(20,14,36,0.9)",
                      transition: "border 0.2s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1.04)";
                      (e.currentTarget as HTMLDivElement).style.transition = "transform 0.15s ease";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                    }}
                    >
                      {/* Mini title bar */}
                      <div style={{
                        height: 20, background: "rgba(36,24,60,0.95)",
                        display: "flex", alignItems: "center", padding: "0 8px", gap: 4,
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        flexShrink: 0,
                      }}>
                        <div style={{ display: "flex", gap: 3 }}>
                          {["#ff5f57","#febc2e","#28c840"].map(c => (
                            <div key={c} style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                          ))}
                        </div>
                        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", marginLeft: 4, fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
                          {win.icon} {win.title}
                        </span>
                      </div>
                      {/* Content placeholder */}
                      <div style={{ flex: 1, background: "rgba(14,10,28,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 28, opacity: 0.5 }}>{win.icon}</span>
                      </div>
                    </div>

                    {/* Window label below */}
                    <div style={{
                      marginTop: 8, textAlign: "center",
                      fontSize: 11, color: "rgba(255,255,255,0.5)",
                      fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                    }}>
                      {win.title}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Dock indicator */}
          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            fontSize: 12, color: "rgba(255,255,255,0.25)",
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
          }}>
            Click any window to focus · Press Escape to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MacOSMissionControl;
