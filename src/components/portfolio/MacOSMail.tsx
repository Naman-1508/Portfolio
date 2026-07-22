/**
 * MacOSMail — Compose mail styled like macOS Mail.app
 */
import { useState } from "react";
import { motion } from "framer-motion";

const MacOSMail = () => {
  const [to]      = useState("namanjain01508@gmail.com");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSend = () => {
    if (!subject.trim() && !body.trim()) return;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailto, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 14px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)", flexShrink: 0,
      }}>
        <button onClick={handleSend} style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 16px", borderRadius: 8,
          background: "rgba(120,90,255,0.65)",
          border: "1px solid rgba(140,100,255,0.4)",
          color: "rgba(255,255,255,0.9)", cursor: "pointer",
          fontSize: 13, fontWeight: 600,
          fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
          transition: "background 0.15s",
        }}>
          <span>✈</span> Send
        </button>
        <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
          New Message
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Draft saved</div>
      </div>

      {/* Fields */}
      <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 0, flexShrink: 0 }}>
        <MailField label="To:">
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(120,90,255,0.2)",
              border: "1px solid rgba(120,90,255,0.35)",
              borderRadius: 20, padding: "2px 10px 2px 4px",
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "rgba(140,100,255,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "white",
              }}>NJ</div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.85)" }}>namanjain01508@gmail.com</span>
            </div>
          </div>
        </MailField>
        <MailField label="Subject:">
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "rgba(255,255,255,0.9)", fontSize: 13,
              fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
              fontWeight: 500,
            }}
          />
        </MailField>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column" }}>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder={`Hi Naman,\n\nI came across your portfolio and wanted to reach out...`}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.65,
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
            resize: "none",
          }}
        />
      </div>

      {/* Sent confirmation */}
      {sent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
            background: "rgba(40,200,64,0.25)",
            border: "1px solid rgba(40,200,64,0.4)",
            borderRadius: 10, padding: "10px 20px",
            color: "#4ade80", fontSize: 13, fontWeight: 600,
          }}
        >
          ✅ Message sent to your default mail app
        </motion.div>
      )}
    </div>
  );
};

const MailField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", width: 60, textAlign: "right", flexShrink: 0 }}>{label}</span>
    {children}
  </div>
);

export default MacOSMail;
