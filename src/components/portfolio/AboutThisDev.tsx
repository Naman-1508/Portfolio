/**
 * AboutThisDev — "About This Mac" replacement
 * Styled exactly like macOS system info dialog
 */
import { useState } from "react";
import { motion } from "framer-motion";

const TABS = ["Overview", "Hardware", "Software", "Fun Facts"] as const;
type Tab = typeof TABS[number];

const AboutThisDev = () => {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}
    >
      {/* Header */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "32px 24px 20px",
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          overflow: "hidden", marginBottom: 14,
          border: "3px solid rgba(255,255,255,0.2)",
          boxShadow: "0 0 0 2px rgba(140,80,255,0.4), 0 8px 32px rgba(0,0,0,0.4)",
        }}>
          <img src="/profile.jpg" alt="Naman Jain" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.92)", marginBottom: 4 }}>
          Naman Jain
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
          Software Engineer · Cyber Security Researcher
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 0,
        padding: "12px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <div style={{
          display: "flex",
          background: "rgba(255,255,255,0.07)",
          borderRadius: 8, padding: 2,
        }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "5px 16px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 12, fontWeight: 500,
                background: tab === t ? "rgba(255,255,255,0.15)" : "transparent",
                color: tab === t ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                transition: "all 0.15s",
                fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="custom-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
        {tab === "Overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <InfoRow icon="🎓" label="University" value="M.S. Ramaiah Institute of Technology, Bangalore" />
            <InfoRow icon="📚" label="Degree" value="B.Tech — CSE (Cyber Security) · 2023–2027" />
            <InfoRow icon="⭐" label="CGPA" value="9.07 / 10" />
            <InfoRow icon="💼" label="Current Role" value="SWE Intern @ HPE | ML & Security Researcher" />
            <InfoRow icon="🏆" label="Amazon ML" value="Summer School 2026 Selectee (Top ~3%)" />
            <InfoRow icon="📄" label="Research" value="IEEE Published — RoadIntel: AI Traffic Intelligence" />
            <InfoRow icon="🌏" label="Location" value="Bangalore, India" />
            <InfoRow icon="📧" label="Email" value="namanjain01508@gmail.com" />
          </div>
        )}

        {tab === "Hardware" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SectionHeader>Core Specs</SectionHeader>
            <SpecRow label="Processor" value="Brain @ 9.07 GHz (Turbo mode on coffee)" />
            <SpecRow label="Memory"    value="300+ LeetCode solutions solved" />
            <SpecRow label="Storage"   value="5+ Production projects shipped" />
            <SpecRow label="GPU"       value="React/TypeScript Renderer, 60fps" />
            <SpecRow label="Network"   value="Always online, low-latency responses" />
            <SectionHeader>Security Chip</SectionHeader>
            <SpecRow label="Secure Enclave" value="Kali Linux · Burp Suite · Wireshark" />
            <SpecRow label="Firewall"       value="Cybersecurity fundamentals layer" />
            <SpecRow label="Encryption"     value="AES-256 (CTF Champion certified)" />
            <SectionHeader>Battery</SectionHeader>
            <SpecRow label="Power Source"  value="☕ Coffee-powered (4+ cups/day)" />
            <SpecRow label="Condition"     value="Maximum — fueled by curiosity" />
          </div>
        )}

        {tab === "Software" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <SectionHeader>Operating Stack</SectionHeader>
            <SpecRow label="OS Version"   value="Developer 2026.07 (Sequoia)" />
            <SpecRow label="Frontend"     value="React 18 · TypeScript · Tailwind · Framer" />
            <SpecRow label="Backend"      value="Node.js · Express · FastAPI · Flask" />
            <SpecRow label="AI / ML"      value="TensorFlow · PyTorch · Scikit · YOLO v11" />
            <SpecRow label="Security"     value="Kali · Wireshark · Burp Suite · IDS" />
            <SpecRow label="Cloud"        value="AWS · Firebase · Docker · Git" />
            <SpecRow label="Languages"    value="Python · C/C++ · JavaScript · SQL" />
            <SectionHeader>Certifications</SectionHeader>
            <SpecRow label="Cisco"       value="Cybersecurity Essentials" />
            <SpecRow label="IEEE"        value="Research Publication ICCECE 2026" />
            <SpecRow label="Amazon ML"   value="Summer School 2026" />
          </div>
        )}

        {tab === "Fun Facts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FunFact icon="♟️" text="Chess player — loves strategic thinking (like clean architecture)" />
            <FunFact icon="🏴‍☠️" text="CTF competitor — hacking challenges are just puzzles with better prizes" />
            <FunFact icon="☕" text="Coffee:Lines-of-Code ratio = 1:500 (optimal efficiency)" />
            <FunFact icon="🎵" text="Codes better with lofi hip-hop playing at 74% volume exactly" />
            <FunFact icon="🌙" text="Peak productivity: 11 PM – 3 AM (confirmed by git commit timestamps)" />
            <FunFact icon="🐛" text="Personally responsible for killing 847 bugs (and spawning 12 new ones)" />
            <FunFact icon="📱" text="Built this entire portfolio OS while being a full-time CS student" />
            <FunFact icon="🤖" text="Believes AI will augment developers, not replace those who master it" />
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div style={{
        padding: "14px 24px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        display: "flex", gap: 10, justifyContent: "flex-end",
        flexShrink: 0,
      }}>
        <FooterBtn onClick={() => window.open("https://github.com/Naman-1508", "_blank")}>GitHub Profile</FooterBtn>
        <FooterBtn onClick={() => window.open("/Naman_Resume.pdf", "_blank")} primary>Download Resume</FooterBtn>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <div style={{
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "10px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
  }}>
    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
    <div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 2, letterSpacing: "0.03em" }}>{label}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>{value}</div>
    </div>
  </div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 8, marginBottom: 2 }}>
    {children}
  </div>
);

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div style={{
    display: "grid", gridTemplateColumns: "140px 1fr",
    padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
  }}>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{label}</span>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>{value}</span>
  </div>
);

const FunFact = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{
    display: "flex", alignItems: "flex-start", gap: 12,
    padding: "12px 16px", borderRadius: 10,
    background: "rgba(140,100,255,0.07)",
    border: "1px solid rgba(140,100,255,0.15)",
  }}>
    <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>{text}</span>
  </div>
);

const FooterBtn = ({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) => (
  <button onClick={onClick} style={{
    padding: "7px 18px",
    borderRadius: 8,
    border: primary ? "none" : "1px solid rgba(255,255,255,0.15)",
    background: primary ? "rgba(120,90,255,0.7)" : "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer", fontSize: 12, fontWeight: 500,
    fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
    transition: "background 0.15s",
  }}>
    {children}
  </button>
);

export default AboutThisDev;
