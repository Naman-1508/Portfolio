/**
 * MacOSVSCode — VS Code-style project architecture viewer
 */
import { useState } from "react";

const FILES = [
  { id: "readme", name: "README.md", icon: "ℹ️", lang: "markdown" },
  { id: "arch", name: "Architecture.ts", icon: "🔷", lang: "typescript" },
  { id: "app", name: "App.tsx", icon: "⚛️", lang: "react" },
  { id: "styles", name: "globals.css", icon: "🎨", lang: "css" },
];

const CONTENT: Record<string, string> = {
  readme: `# Portfolio OS

A premium, highly polished macOS-inspired personal portfolio.

## Features
- Fully functional Window Manager (drag, snap, resize)
- Finder, Terminal, Safari, Spotlight
- Physics-based animations (Framer Motion)
- 60fps performance optimizations`,

  arch: `// System Architecture
interface SystemCore {
  windowManager: WindowManager;
  eventBus: EventBus;
  processTable: ProcessTable;
}

class WindowManager {
  windows: WindowState[] = [];
  
  focusWindow(id: string) {
    this.windows = this.windows.map(w => 
      w.id === id ? { ...w, zIndex: getNextZ() } : w
    );
  }
}`,

  app: `import MacOSDesktop from "./components/portfolio/MacOSDesktop";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MacOSDesktop />
    </ThemeProvider>
  );
}

export default App;`,

  styles: `@tailwind base;
@tailwind components;
@tailwind utilities;

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}`,
};

const MacOSVSCode = () => {
  const [activeFile, setActiveFile] = useState("readme");

  return (
    <div style={{ display: "flex", height: "100%", backgroundColor: "#1e1e1e", color: "#d4d4d4", fontFamily: "'SF Pro Display', sans-serif" }}>
      {/* Activity Bar */}
      <div style={{ width: 48, backgroundColor: "#333333", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
        <div style={{ opacity: 1, fontSize: 22, cursor: "pointer", marginBottom: 20 }}>📁</div>
        <div style={{ opacity: 0.4, fontSize: 22, cursor: "pointer", marginBottom: 20 }}>🔍</div>
        <div style={{ opacity: 0.4, fontSize: 22, cursor: "pointer", marginBottom: 20 }}>🔀</div>
        <div style={{ opacity: 0.4, fontSize: 22, cursor: "pointer", marginBottom: 20 }}>🐛</div>
      </div>

      {/* Sidebar */}
      <div style={{ width: 220, backgroundColor: "#252526", borderRight: "1px solid #333333", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "10px 20px", fontSize: 11, fontWeight: "bold", letterSpacing: 1, color: "#858585" }}>EXPLORER</div>
        <div style={{ padding: "5px 10px", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10 }}>▼</span> PORTFOLIO-OS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {FILES.map(f => (
            <div
              key={f.id}
              onClick={() => setActiveFile(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "4px 10px 4px 24px",
                backgroundColor: activeFile === f.id ? "#37373d" : "transparent",
                cursor: "pointer", fontSize: 13,
              }}
            >
              <span>{f.icon}</span>
              <span style={{ color: activeFile === f.id ? "#ffffff" : "#cccccc" }}>{f.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#1e1e1e" }}>
        {/* Tabs */}
        <div style={{ display: "flex", backgroundColor: "#2d2d2d", overflowX: "auto" }} className="custom-scrollbar">
          {FILES.map(f => (
            <div
              key={f.id}
              onClick={() => setActiveFile(f.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 16px",
                backgroundColor: activeFile === f.id ? "#1e1e1e" : "#2d2d2d",
                borderTop: activeFile === f.id ? "2px solid #007acc" : "2px solid transparent",
                cursor: "pointer", fontSize: 13, borderRight: "1px solid #252526",
              }}
            >
              <span>{f.icon}</span>
              <span style={{ color: activeFile === f.id ? "#ffffff" : "#969696" }}>{f.name}</span>
              <span style={{ opacity: activeFile === f.id ? 1 : 0, marginLeft: 10 }}>✕</span>
            </div>
          ))}
        </div>

        {/* Breadcrumbs */}
        <div style={{ padding: "4px 16px", fontSize: 12, color: "#858585", display: "flex", gap: 6, borderBottom: "1px solid #2d2d2d" }}>
          <span>PORTFOLIO-OS</span> <span>›</span> <span>{FILES.find(f => f.id === activeFile)?.name}</span>
        </div>

        {/* Code Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", fontFamily: "'JetBrains Mono', 'Fira Code', monospace", fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" }} className="custom-scrollbar">
          {CONTENT[activeFile]}
        </div>

        {/* Status Bar */}
        <div style={{ height: 22, backgroundColor: "#007acc", color: "white", display: "flex", alignItems: "center", padding: "0 10px", fontSize: 12, gap: 16 }}>
          <span>{"><_"}</span>
          <span>main*</span>
          <span style={{ marginLeft: "auto" }}>Ln 12, Col 42</span>
          <span>UTF-8</span>
          <span>{FILES.find(f => f.id === activeFile)?.lang === "react" ? "TypeScript React" : "TypeScript"}</span>
        </div>
      </div>
    </div>
  );
};

export default MacOSVSCode;
