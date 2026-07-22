/**
 * MacOSQuickLook — Quick Look modal (Spacebar preview)
 */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MacOSQuickLookProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  kind: "pdf" | "image" | "text" | "folder";
}

const MacOSQuickLook = ({ isOpen, onClose, fileUrl, fileName, kind }: MacOSQuickLookProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isOpen && (e.key === "Escape" || e.key === " ")) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            width: "80%", height: "80%", maxWidth: 1000, maxHeight: 800,
            zIndex: 99999,
            backgroundColor: "rgba(30,30,30,0.85)",
            backdropFilter: "blur(20px)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column", overflow: "hidden"
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f57", cursor: "pointer" }} onClick={onClose} />
            </div>
            <div style={{ color: "white", fontSize: 14, fontWeight: 500, fontFamily: "-apple-system, sans-serif" }}>{fileName}</div>
            <div style={{ width: 14 }} /> {/* Spacer */}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {kind === "pdf" && (
              <iframe src={fileUrl} style={{ width: "100%", height: "100%", border: "none", borderRadius: 8, backgroundColor: "white" }} />
            )}
            {kind === "image" && (
              <img src={fileUrl} alt={fileName} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8 }} />
            )}
            {kind === "text" && (
              <div style={{ width: "100%", height: "100%", backgroundColor: "white", borderRadius: 8, padding: 20, color: "#333", whiteSpace: "pre-wrap", overflowY: "auto", fontFamily: "monospace" }}>
                {fileUrl} {/* Here fileUrl could just be text content for simplicity */}
              </div>
            )}
            {kind === "folder" && (
              <div style={{ color: "white", fontSize: 100 }}>📁</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MacOSQuickLook;
