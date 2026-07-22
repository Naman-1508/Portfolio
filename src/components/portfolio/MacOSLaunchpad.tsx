import { motion, AnimatePresence } from "framer-motion";
import { AppId } from "./MacOSDesktop";

interface LaunchpadProps {
  open: boolean;
  onClose: () => void;
  apps: { id: AppId; label: string; icon: string }[];
  onOpenApp: (id: AppId) => void;
}

const MacOSLaunchpad = ({ open, onClose, apps, onOpenApp }: LaunchpadProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999, // Above everything but menubar
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(25px) saturate(1.5)",
            WebkitBackdropFilter: "blur(25px) saturate(1.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Search Bar */}
          <div style={{ position: "absolute", top: 80, width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "4px 12px",
              width: 240,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "white"
            }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <circle cx="7" cy="7" r="4.5" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 13, opacity: 0.6 }}>Search</span>
            </div>
          </div>

          <div 
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "40px 60px",
              maxWidth: 1000,
              padding: 40,
            }}
            onClick={e => e.stopPropagation()}
          >
            {apps.map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 + 0.1, duration: 0.4 }}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
                className="group"
              >
                <div style={{
                  width: 76,
                  height: 76,
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                  transition: "transform 0.2s",
                }}
                className="group-hover:scale-110"
                >
                  {app.icon}
                </div>
                <span style={{
                  color: "white",
                  fontSize: 13,
                  fontWeight: 500,
                  textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                }}>
                  {app.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MacOSLaunchpad;
