/**
 * MacOSTerminal — Full macOS Terminal emulator
 *
 * Commands: help, whoami, skills, projects, experience, education,
 *           resume, contact, socials, clear, date, pwd, ls, history,
 *           cat about.txt/skills.txt/experience.txt/education.txt,
 *           open github/linkedin/portfolio,
 *           sudo hire naman, neofetch, coffee, motivation, quote,
 *           rm -rf bugs
 *
 * Features:
 * - Blinking cursor
 * - Command history (↑/↓ arrows)
 * - Tab autocomplete
 * - Typing animation for neofetch/startup
 * - Easter eggs
 * - Colored output (ANSI-style via CSS)
 */
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface Line {
  type: "input" | "output" | "error" | "success" | "info" | "blank" | "ascii";
  content: string;
}

const PROMPT = "naman@portfolio";
const CWD    = "~/portfolio";

const COMMANDS = [
  "help","whoami","skills","projects","experience","education",
  "resume","contact","socials","clear","date","pwd","ls","history",
  "cat about.txt","cat skills.txt","cat experience.txt","cat education.txt",
  "open github","open linkedin","open portfolio",
  "sudo hire naman","neofetch","coffee","motivation","quote","rm -rf bugs",
];

const NEOFETCH_ASCII = `
          .:!J5PGGGP5J!:.
       :!5B###########BG5!:
     ^YB#################BY^
    ?B#####################B?
   G#########################G
  5############################5
  B##############################B
  B##############################B
  5############################5
   G#########################G
    ?B#####################B?
     ^YB#################BY^
       :!5B###########BG5!:
          .:!J5PGGGP5J!:`;

interface MacOSTerminalProps {
  onOpenApp?: (id: string, url?: string) => void;
}

function processCommand(cmd: string, history: string[], onOpenApp?: (id: string, url?: string) => void): { lines: Line[]; action?: () => void } {
  const trimmed = cmd.trim().toLowerCase();
  const raw = cmd.trim();

  if (trimmed === "help") {
    return { lines: [
      { type: "info",    content: "═══════════════════════════════════════════════" },
      { type: "success", content: "  AVAILABLE COMMANDS — Naman's Portfolio Terminal" },
      { type: "info",    content: "═══════════════════════════════════════════════" },
      { type: "output",  content: "  whoami          · About the developer" },
      { type: "output",  content: "  skills          · Tech stack & expertise" },
      { type: "output",  content: "  projects        · All projects" },
      { type: "output",  content: "  experience      · Work experience" },
      { type: "output",  content: "  education       · Academic background" },
      { type: "output",  content: "  resume          · Download resume" },
      { type: "output",  content: "  contact         · Get in touch" },
      { type: "output",  content: "  socials         · Social links" },
      { type: "output",  content: "  ls              · List files" },
      { type: "output",  content: "  cat <file>      · Read a file" },
      { type: "output",  content: "  open <app>      · Open github/linkedin/portfolio" },
      { type: "output",  content: "  neofetch        · System info" },
      { type: "output",  content: "  coffee          · Need energy?" },
      { type: "output",  content: "  motivation      · Need a push?" },
      { type: "output",  content: "  quote           · Random quote" },
      { type: "output",  content: "  clear           · Clear terminal" },
      { type: "info",    content: "═══════════════════════════════════════════════" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "whoami") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  Naman Jain" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "output",  content: "  🎓 B.Tech CSE (Cyber Security) @ MSRIT" },
      { type: "output",  content: "  💼 SWE Intern @ HPE | ML & Security Researcher" },
      { type: "output",  content: "  🏆 Amazon ML Summer School 2026 Selectee" },
      { type: "output",  content: "  📄 IEEE Researcher — RoadIntel Published" },
      { type: "output",  content: "  🔭 300+ LeetCode Problems" },
      { type: "output",  content: "  🌏 Bangalore, India" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  Currently open to full-time opportunities." },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "skills") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  ⚡ TECH STACK" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  Languages  ›  Python · C/C++ · JavaScript · TypeScript · SQL" },
      { type: "info",    content: "  Frontend   ›  React · TypeScript · Tailwind · Framer Motion" },
      { type: "info",    content: "  Backend    ›  Node.js · Express · FastAPI · Flask" },
      { type: "info",    content: "  AI / ML    ›  TensorFlow · PyTorch · Scikit-learn · YOLO" },
      { type: "info",    content: "  Security   ›  Kali Linux · Wireshark · Burp Suite · IDS" },
      { type: "info",    content: "  Cloud      ›  AWS · Firebase · Vercel · Git · Docker" },
      { type: "info",    content: "  Databases  ›  PostgreSQL · MongoDB · MySQL · Redis" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "projects") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  💻 PROJECTS" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  01  SIGNAL         → AI-Powered Notification Intelligence" },
      { type: "info",    content: "  02  RoadIntel      → AI-powered Road Incident Detection System" },
      { type: "info",    content: "  03  CricNation     → Digital Scoring Platform (Next.js)" },
      { type: "info",    content: "  04  RoadIntel      → AI pothole detection system (YOLO)" },
      { type: "info",    content: "  05  HealTrip       → Medical tourism platform (React + Node)" },
      { type: "info",    content: "  06  VulnFusion     → Automated Web Security Scanner" },
      { type: "info",    content: "  07  Portfolio OS   · This macOS portfolio you're using!" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "output",  content: "  → Double-click Projects folder to explore" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "experience") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  💼 WORK EXPERIENCE" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  HPE (Hewlett Packard Enterprise)" },
      { type: "output",  content: "  SWE Intern · 2026" },
      { type: "output",  content: "  Working on enterprise software engineering" },
      { type: "blank",   content: "" },
      { type: "info",    content: "  MSRIT Research Lab" },
      { type: "output",  content: "  Flutter Dev Intern · Aug 2024" },
      { type: "output",  content: "  Built cross-platform mobile features" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "education") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  🎓 EDUCATION" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  B.Tech — CSE (Cyber Security)" },
      { type: "output",  content: "  M.S. Ramaiah Institute of Technology, Bangalore" },
      { type: "output",  content: "  2023 – 2027 · CGPA: 9.19 / 10" },
      { type: "blank",   content: "" },
      { type: "info",    content: "  Class XII · 87%  |  Class X · 94%" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "resume") {
    return {
      lines: [
        { type: "blank",   content: "" },
        { type: "success", content: "  📄 Opening Resume.pdf..." },
        { type: "output",  content: "  Launching Preview.app" },
        { type: "blank",   content: "" },
      ],
      action: () => {
        if (onOpenApp) onOpenApp("safari", "/Naman_Resume.pdf");
        else window.open("/Naman_Resume.pdf", "_blank");
      },
    };
  }

  if (trimmed === "contact") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  📞 CONTACT" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  Email    ›  namanjain01508@gmail.com" },
      { type: "info",    content: "  LinkedIn ›  linkedin.com/in/naman-jain-123681317" },
      { type: "info",    content: "  GitHub   ›  github.com/Naman-1508" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "output",  content: "  → Type 'open linkedin' or 'open github'" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "socials") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  🌐 SOCIAL LINKS" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "info",    content: "  GitHub    ›  github.com/Naman-1508" },
      { type: "info",    content: "  LinkedIn  ›  linkedin.com/in/naman-jain-123681317" },
      { type: "info",    content: "  LeetCode  ›  leetcode.com/u/ZWCMA2Saw6" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "pwd") {
    return { lines: [{ type: "output", content: `  ${CWD}` }, { type: "blank", content: "" }]};
  }

  if (trimmed === "date") {
    return { lines: [
      { type: "output", content: `  ${new Date().toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}` },
      { type: "blank",  content: "" },
    ]};
  }

  if (trimmed === "ls") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "output",  content: "  📁 projects      📁 experience    📁 education" },
      { type: "output",  content: "  📁 skills         📁 achievements  📁 contact" },
      { type: "output",  content: "  📄 about.txt      📄 skills.txt    📄 experience.txt" },
      { type: "output",  content: "  📑 resume.pdf     🔒 secrets.txt   ☕ coffee.sh" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "history") {
    return { lines: [
      { type: "blank", content: "" },
      ...history.slice(-10).map((h, i) => ({
        type: "output" as const,
        content: `  ${String(history.length - 10 + i + 1).padStart(4, " ")}  ${h}`,
      })),
      { type: "blank", content: "" },
    ]};
  }

  if (trimmed === "cat about.txt") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  ─── about.txt ───────────────────────────" },
      { type: "output",  content: "  Hi! I'm Naman Jain, a Computer Science student" },
      { type: "output",  content: "  specializing in Cyber Security at MSRIT." },
      { type: "blank",   content: "" },
      { type: "output",  content: "  I build things at the intersection of AI," },
      { type: "output",  content: "  security, and full-stack development." },
      { type: "blank",   content: "" },
      { type: "output",  content: "  When not coding: cricket 🏏 · solo biking in mountains 🏍️ · coffee ☕" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "cat skills.txt") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: "  ─── skills.txt (Tech Stack) ─────────────" },
      { type: "output",  content: "  • Languages: Java, Python, JavaScript, C++, Kotlin" },
      { type: "output",  content: "  • Frontend: React, Next.js, HTML5, CSS3, Jetpack Compose" },
      { type: "output",  content: "  • Backend: Node.js, Express, MongoDB, FastAPI" },
      { type: "output",  content: "  • AI/ML: Scikit-learn, XGBoost, YOLO, Gemini API" },
      { type: "output",  content: "  • Security: Packet capture, Subfinder, Nuclei, sqlmap" },
      { type: "output",  content: "  ─────────────────────────────────────────" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "cat experience.txt" || trimmed === "cat education.txt") {
    const isExp = trimmed.includes("experience");
    return { lines: [
      { type: "blank", content: "" },
      { type: "info", content: `  Opening ${isExp ? "experience" : "education"} window...` },
      { type: "blank", content: "" },
    ]};
  }

  if (trimmed === "open github") {
    return {
      lines: [
        { type: "blank",   content: "" },
        { type: "success", content: "  → Opening GitHub in Safari..." },
        { type: "blank",   content: "" },
      ],
      action: () => {
        if (onOpenApp) onOpenApp("safari", "https://github.com/Naman-1508");
        else window.open("https://github.com/Naman-1508", "_blank");
      },
    };
  }

  if (trimmed === "open linkedin") {
    return {
      lines: [
        { type: "blank",   content: "" },
        { type: "success", content: "  → Opening LinkedIn in Safari..." },
        { type: "blank",   content: "" },
      ],
      action: () => {
        if (onOpenApp) onOpenApp("safari", "https://www.linkedin.com/in/naman-jain-123681317/");
        else window.open("https://www.linkedin.com/in/naman-jain-123681317/", "_blank");
      },
    };
  }

  if (trimmed === "open portfolio") {
    return { lines: [
      { type: "blank", content: "" },
      { type: "info",  content: "  You're already here 😄" },
      { type: "blank", content: "" },
    ]};
  }

  // ── EASTER EGGS ────────────────────────────────────────────────────────────
  if (trimmed === "sudo hire naman") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "info",    content: "  [sudo] password for recruiter: ••••••••" },
      { type: "blank",   content: "" },
      { type: "success", content: "  ╔══════════════════════════════════════════╗" },
      { type: "success", content: "  ║   ✅  ACCESS GRANTED                     ║" },
      { type: "success", content: "  ╚══════════════════════════════════════════╝" },
      { type: "blank",   content: "" },
      { type: "output",  content: "  Great choice! Forwarding resume..." },
      { type: "output",  content: "  namanjain01508@gmail.com · +91 XXXXXXXXXX" },
      { type: "output",  content: "  Preparing onboarding paperwork... ✓" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "rm -rf bugs") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "error",   content: "  rm: bugs: permission denied (too many to count)" },
      { type: "blank",   content: "" },
      { type: "output",  content: "  Just kidding." },
      { type: "success", content: "  rm -rf complete. All bugs destroyed. ✓" },
      { type: "output",  content: "  (Note: new ones spawned during deletion)" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "coffee") {
    return { lines: [
      { type: "blank",   content: "" },
      { type: "ascii",   content: "       ( (" },
      { type: "ascii",   content: "        ) )" },
      { type: "ascii",   content: "      .______." },
      { type: "ascii",   content: "      |      |]" },
      { type: "ascii",   content: "      \\      /" },
      { type: "ascii",   content: "       `----'" },
      { type: "blank",   content: "" },
      { type: "success", content: "  ☕  Developer energy restored. +100 HP" },
      { type: "output",  content: "  Caffeine level: Maximum" },
      { type: "output",  content: "  Focus mode: ACTIVATED" },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "motivation") {
    const quotes = [
      "  Ship it. Perfect is the enemy of done.",
      "  Code is read more than it is written.",
      "  First make it work. Then make it right. Then make it fast.",
      "  Every expert was once a beginner.",
      "  Build something people want.",
    ];
    return { lines: [
      { type: "blank",   content: "" },
      { type: "success", content: quotes[Math.floor(Math.random() * quotes.length)] },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "quote") {
    const quotes = [
      { q: "The best way to predict the future is to invent it.", a: "Alan Kay" },
      { q: "Make it work, make it right, make it fast.", a: "Kent Beck" },
      { q: "Talk is cheap. Show me the code.", a: "Linus Torvalds" },
      { q: "Programs must be written for people to read.", a: "SICP" },
      { q: "Simplicity is the soul of efficiency.", a: "Austin Freeman" },
    ];
    const pick = quotes[Math.floor(Math.random() * quotes.length)];
    return { lines: [
      { type: "blank",   content: "" },
      { type: "info",    content: `  "${pick.q}"` },
      { type: "output",  content: `      — ${pick.a}` },
      { type: "blank",   content: "" },
    ]};
  }

  if (trimmed === "neofetch") {
    return { lines: [
      { type: "blank",  content: "" },
      ...NEOFETCH_ASCII.split("\n").map(l => ({ type: "ascii" as const, content: l })),
      { type: "blank",  content: "" },
      { type: "success",content: "  naman@portfolio" },
      { type: "output", content: "  ────────────────" },
      { type: "info",   content: "  OS:          macOS Portfolio 2026" },
      { type: "info",   content: "  Host:        React 18 + TypeScript + Vite 5" },
      { type: "info",   content: "  Kernel:      Framer Motion 12.x" },
      { type: "info",   content: "  Uptime:      Always Online ∞" },
      { type: "info",   content: "  Packages:    2080 npm modules" },
      { type: "info",   content: "  Shell:       tsx 4.0" },
      { type: "info",   content: "  Resolution:  2560x1440" },
      { type: "info",   content: "  DE:          macOS Sequoia Inspired" },
      { type: "info",   content: "  WM:          MacOSWindow Manager" },
      { type: "info",   content: "  Terminal:    MacOSTerminal.tsx" },
      { type: "info",   content: "  CPU:         Brain @ 9.07 GHz" },
      { type: "info",   content: "  Memory:      300+ LeetCode Problems" },
      { type: "info",   content: "  GPU:         React/TS Renderer" },
      { type: "info",   content: "  Battery:     ☕ Powered" },
      { type: "blank",  content: "" },
    ]};
  }

  if (trimmed === "clear") {
    return { lines: [] }; // Special case handled in component
  }

  // Unknown command
  return { lines: [
    { type: "error", content: `  zsh: command not found: ${raw}` },
    { type: "output", content: "  Type 'help' for available commands." },
    { type: "blank",  content: "" },
  ]};
}

// ── Component ─────────────────────────────────────────────────────────────────
const MacOSTerminal = ({ onOpenApp }: MacOSTerminalProps) => {
  const [lines, setLines]     = useState<Line[]>(() => [
    { type: "info",    content: "Last login: " + new Date().toLocaleString() },
    { type: "blank",   content: "" },
    { type: "success", content: "  Welcome to Naman's Portfolio Terminal" },
    { type: "output",  content: "  Type 'help' to see available commands." },
    { type: "output",  content: "  Type 'neofetch' for system info." },
    { type: "blank",   content: "" },
  ]);
  const [input, setInput]       = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histPos, setHistPos]   = useState(-1);
  const [blink, setBlink]       = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setCmdHistory(h => [...h, trimmed]);
    setHistPos(-1);

    // Show the input line
    const inputLine: Line = { type: "input", content: trimmed };

    if (trimmed.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const result = processCommand(trimmed, cmdHistory, onOpenApp);
    result.action?.();

    setLines(prev => [...prev, inputLine, ...result.lines]);
  }, [cmdHistory]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newPos = Math.min(histPos + 1, cmdHistory.length - 1);
      setHistPos(newPos);
      setInput(cmdHistory[cmdHistory.length - 1 - newPos] ?? "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newPos = Math.max(histPos - 1, -1);
      setHistPos(newPos);
      setInput(newPos === -1 ? "" : cmdHistory[cmdHistory.length - 1 - newPos] ?? "");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.toLowerCase();
      const match = COMMANDS.find(c => c.startsWith(partial) && c !== partial);
      if (match) setInput(match);
      return;
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
      return;
    }
  }, [input, histPos, cmdHistory, runCommand]);

  const getLineStyle = (type: Line["type"]): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      fontSize: 13,
      lineHeight: 1.7,
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    };
    switch (type) {
      case "input":   return { ...base, color: "rgba(255,255,255,0.92)" };
      case "success": return { ...base, color: "#4ade80" };
      case "error":   return { ...base, color: "#f87171" };
      case "info":    return { ...base, color: "#60a5fa" };
      case "ascii":   return { ...base, color: "#a78bfa", letterSpacing: "0.05em" };
      case "blank":   return { ...base };
      default:        return { ...base, color: "rgba(255,255,255,0.7)" };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "rgba(12, 8, 22, 0.97)",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div
        className="custom-scrollbar"
        style={{ flex: 1, overflowY: "auto", padding: "16px 20px 8px" }}
      >
        {lines.map((line, i) => (
          <div key={i} style={getLineStyle(line.type)}>
            {line.type === "input" ? (
              <span>
                <span style={{ color: "#a78bfa" }}>{PROMPT}</span>
                <span style={{ color: "#60a5fa" }}>:{CWD}</span>
                <span style={{ color: "#4ade80" }}>$</span>
                <span style={{ color: "rgba(255,255,255,0.9)" }}> {line.content}</span>
              </span>
            ) : (
              line.content
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 20px 16px",
        gap: 0,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <span style={{ color: "#a78bfa", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
          {PROMPT}
        </span>
        <span style={{ color: "#60a5fa", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
          :{CWD}
        </span>
        <span style={{ color: "#4ade80", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>
          $
        </span>
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
          <span style={{
            color: "rgba(255,255,255,0.92)",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            whiteSpace: "pre",
          }}>
            {input}
          </span>
          {/* Blinking block cursor */}
          <div style={{
            width: 8, height: 16,
            background: blink ? "rgba(167,139,250,0.9)" : "transparent",
            borderRadius: 1,
            transition: "background 0.05s",
            marginLeft: 1,
          }} />
          
          <input
            ref={inputRef}
            value={input}
            onChange={e => { setInput(e.target.value); setHistPos(-1); }}
            onKeyDown={handleKeyDown}
            autoFocus
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0, // hide native input, we render text and cursor manually
              cursor: "text",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MacOSTerminal;
