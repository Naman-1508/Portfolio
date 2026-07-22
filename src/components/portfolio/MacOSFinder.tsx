/**
 * MacOSFinder — Primary navigation system
 *
 * Layout:
 * - macOS Finder sidebar (Favorites + Locations)
 * - Toolbar: back/forward, view toggle (grid/list), search
 * - Content area: grid or list view of folder contents
 * - Breadcrumb path bar at bottom
 * - Double-click to open app or navigate into folder
 * - Single-click selects
 * - Search filters items inline
 */
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FinderApp =
  | "projects" | "experience" | "skills" | "achievements"
  | "about"    | "education"  | "contact" | "resume"
  | "terminal" | "safari"     | "vscode"  | "mail"
  | "calendar" | "preview"    | "about-dev";

export interface FinderItem {
  id: FinderApp | string;
  name: string;
  icon: string;
  kind: "folder" | "app" | "pdf" | "txt";
  modified?: string;
  size?: string;
  action: () => void;
}

interface MacOSFinderProps {
  items: FinderItem[];
  onOpenApp: (id: FinderApp) => void;
}

type ViewMode = "grid" | "list";

const SIDEBAR_SECTIONS = [
  {
    heading: "FAVORITES",
    items: [
      { id: "all",          label: "All Files",   icon: "🗂️" },
      { id: "projects",     label: "Projects",    icon: "💻" },
      { id: "experience",   label: "Experience",  icon: "💼" },
      { id: "skills",       label: "Skills",      icon: "⚙️" },
      { id: "achievements", label: "Achievements",icon: "🏆" },
      { id: "education",    label: "Education",   icon: "🎓" },
      { id: "about",        label: "About Me",    icon: "📄" },
      { id: "contact",      label: "Contact",     icon: "📞" },
    ],
  },
  {
    heading: "LOCATIONS",
    items: [
      { id: "resume",   label: "Resume.pdf",   icon: "📑" },
      { id: "terminal", label: "Terminal",     icon: "⌨️" },
      { id: "mail",     label: "Mail",         icon: "✉️" },
      { id: "calendar", label: "Calendar",     icon: "📅" },
    ],
  },
];

const MacOSFinder = ({ items, onOpenApp }: MacOSFinderProps) => {
  const [view,      setView]      = useState<ViewMode>("grid");
  const [selected,  setSelected]  = useState<string | null>(null);
  const [search,    setSearch]    = useState("");
  const [activeSidebar, setActiveSidebar] = useState<string>("all");
  const [history,   setHistory]   = useState<string[]>(["all"]);
  const [histIdx,   setHistIdx]   = useState(0);

  const navigate = useCallback((id: string) => {
    setActiveSidebar(id);
    setSelected(null);
    setSearch("");
    const newHist = [...history.slice(0, histIdx + 1), id];
    setHistory(newHist);
    setHistIdx(newHist.length - 1);
  }, [history, histIdx]);

  const goBack = () => {
    if (histIdx > 0) { const ni = histIdx - 1; setHistIdx(ni); setActiveSidebar(history[ni]); }
  };
  const goForward = () => {
    if (histIdx < history.length - 1) { const ni = histIdx + 1; setHistIdx(ni); setActiveSidebar(history[ni]); }
  };

  const visibleItems = useMemo(() => {
    let filtered = items;
    if (activeSidebar !== "all") {
      // show only items matching sidebar or a "folder" for that section
      filtered = items.filter(it =>
        it.id === activeSidebar ||
        it.id.toString().startsWith(activeSidebar)
      );
      if (filtered.length === 0) filtered = items; // fallback
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(it => it.name.toLowerCase().includes(q));
    }
    return filtered;
  }, [items, activeSidebar, search]);

  const currentLabel = SIDEBAR_SECTIONS.flatMap(s => s.items).find(i => i.id === activeSidebar)?.label ?? "Finder";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
      background: "rgba(14, 10, 28, 0.0)", // transparent — parent window handles bg
    }}>
      {/* ── Toolbar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
        flexShrink: 0,
      }}>
        {/* Back/Forward */}
        <div style={{ display: "flex", gap: 2 }}>
          <ToolbarBtn disabled={histIdx === 0} onClick={goBack} title="Back">
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
          <ToolbarBtn disabled={histIdx >= history.length - 1} onClick={goForward} title="Forward">
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ToolbarBtn>
        </div>

        {/* Current folder name */}
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.75)", flex: 1, textAlign: "center" }}>
          {currentLabel}
        </span>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,0.08)", borderRadius: 6, padding: 2 }}>
          {(["grid", "list"] as ViewMode[]).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "3px 8px",
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              background: view === v ? "rgba(255,255,255,0.15)" : "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: 11,
              transition: "background 0.15s",
            }}>
              {v === "grid" ? "⊞" : "☰"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 7,
          padding: "3px 10px",
          width: 160,
        }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
            <circle cx="7" cy="7" r="4.5" /><path d="M13 13l-2.5-2.5" strokeLinecap="round" />
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "rgba(255,255,255,0.85)", fontSize: 12,
              fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
            }}
          />
        </div>
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 170,
          flexShrink: 0,
          padding: "10px 0",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          overflowY: "auto",
          background: "rgba(0,0,0,0.15)",
        }}
        className="custom-scrollbar"
        >
          {SIDEBAR_SECTIONS.map(section => (
            <div key={section.heading}>
              <div style={{
                padding: "4px 14px 2px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
              }}>
                {section.heading}
              </div>
              {section.items.map(item => (
                <SidebarItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={activeSidebar === item.id}
                  onClick={() => navigate(item.id)}
                />
              ))}
              <div style={{ height: 8 }} />
            </div>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div
            style={{ flex: 1, overflowY: "auto", padding: view === "grid" ? 16 : 0 }}
            className="custom-scrollbar"
            onClick={() => setSelected(null)}
          >
            {visibleItems.length === 0 ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", height: "100%",
                color: "rgba(255,255,255,0.25)", gap: 10,
              }}>
                <div style={{ fontSize: 40 }}>🔍</div>
                <div style={{ fontSize: 14 }}>No results</div>
              </div>
            ) : view === "grid" ? (
              <motion.div
                layout
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                  gap: 8,
                }}
              >
                <AnimatePresence>
                  {visibleItems.map((item) => (
                    <FinderGridItem
                      key={item.id}
                      item={item}
                      isSelected={selected === item.id}
                      onSelect={(e) => { e.stopPropagation(); setSelected(item.id as string); }}
                      onOpen={() => { item.action(); }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div>
                {/* List header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 70px 70px",
                  padding: "6px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: 11, fontWeight: 600,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.03em",
                }}>
                  <span>Name</span><span>Kind</span><span>Size</span><span>Modified</span>
                </div>
                {visibleItems.map((item) => (
                  <FinderListItem
                    key={item.id}
                    item={item}
                    isSelected={selected === item.id}
                    onSelect={(e) => { e.stopPropagation(); setSelected(item.id as string); }}
                    onOpen={() => { item.action(); }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status / breadcrumb bar */}
          <div style={{
            height: 24,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            gap: 4,
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            flexShrink: 0,
            background: "rgba(0,0,0,0.1)",
          }}>
            <span>🗂️</span>
            <span>Naman Jain</span>
            <span>›</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>{currentLabel}</span>
            <span style={{ marginLeft: "auto" }}>
              {visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const SidebarItem = ({ icon, label, isActive, onClick }: {
  icon: string; label: string; isActive: boolean; onClick: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "5px 14px",
      borderRadius: 6,
      margin: "1px 6px",
      cursor: "default",
      background: isActive ? "rgba(120,90,255,0.3)" : "transparent",
      transition: "background 0.1s",
    }}
    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"; }}
    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
  >
    <span style={{ fontSize: 14, opacity: 0.85 }}>{icon}</span>
    <span style={{
      fontSize: 12, fontWeight: 500,
      color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
    }}>
      {label}
    </span>
  </div>
);

const ToolbarBtn = ({ children, disabled, onClick, title }: {
  children: React.ReactNode; disabled?: boolean; onClick: () => void; title: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      width: 28, height: 28,
      borderRadius: 6,
      border: "none",
      background: "rgba(255,255,255,0.07)",
      color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.65)",
      cursor: disabled ? "not-allowed" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.1s, color 0.1s",
    }}
    onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
  >
    {children}
  </button>
);

const FinderGridItem = ({ item, isSelected, onSelect, onOpen }: {
  item: FinderItem; isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void; onOpen: () => void;
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.15 }}
    onClick={onSelect}
    onDoubleClick={onOpen}
    style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 6, padding: "10px 6px",
      borderRadius: 8,
      cursor: "default",
      background: isSelected ? "rgba(120,90,255,0.28)" : "transparent",
      border: isSelected ? "1px solid rgba(130,100,255,0.4)" : "1px solid transparent",
      transition: "background 0.1s",
      userSelect: "none",
    }}
    onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"; }}
    onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
  >
    <div style={{
      width: 56, height: 56,
      borderRadius: 14,
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 30,
      boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
    }}>
      {item.icon}
    </div>
    <span style={{
      fontSize: 11,
      color: "rgba(255,255,255,0.85)",
      textAlign: "center",
      maxWidth: 88,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      lineHeight: 1.2,
      padding: isSelected ? "1px 4px" : "1px 4px",
      background: isSelected ? "rgba(90,60,200,0.5)" : "rgba(0,0,0,0.4)",
      borderRadius: 3,
    }}>
      {item.name}
    </span>
  </motion.div>
);

const FinderListItem = ({ item, isSelected, onSelect, onOpen }: {
  item: FinderItem; isSelected: boolean;
  onSelect: (e: React.MouseEvent) => void; onOpen: () => void;
}) => (
  <div
    onClick={onSelect}
    onDoubleClick={onOpen}
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 80px 70px 70px",
      padding: "5px 16px",
      alignItems: "center",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      background: isSelected ? "rgba(120,90,255,0.25)" : "transparent",
      cursor: "default",
      userSelect: "none",
      transition: "background 0.1s",
    }}
    onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)"; }}
    onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 18 }}>{item.icon}</span>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{item.name}</span>
    </div>
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
      {item.kind === "folder" ? "Folder" : item.kind === "pdf" ? "PDF" : item.kind === "app" ? "Application" : "Plain Text"}
    </span>
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.size ?? "—"}</span>
    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.modified ?? "Today"}</span>
  </div>
);

export default MacOSFinder;
