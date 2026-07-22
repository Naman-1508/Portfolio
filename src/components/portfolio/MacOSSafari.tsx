/**
 * MacOSSafari — Portfolio's built-in browser
 *
 * Features:
 * - Real browser chrome (back, forward, refresh, address bar)
 * - Tab bar (multiple tabs)
 * - Loading progress animation
 * - iframe embed + beautiful "link preview" for blocked sites (GitHub, LinkedIn etc.)
 * - Session history (back/forward)
 * - Bookmark animation
 */
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SafariTab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
}

interface MacOSSafariProps {
  initialUrl?: string;
  initialTitle?: string;
}

function cleanUrl(url: string): string {
  if (!url || url === "about:newtab") return url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return "https://" + url;
  return url;
}

function getDisplayUrl(url: string): string {
  if (!url || url === "about:newtab") return "";
  try {
    const u = new URL(url);
    return u.hostname + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return url;
  }
}

function getFavicon(url: string): string {
  try { return `https://www.google.com/s2/favicons?sz=32&domain=${new URL(url).hostname}`; }
  catch { return ""; }
}

// Sites that block iframes — show link preview card instead
const PREVIEW_SITES: Record<string, { name: string; description: string; color: string; icon: string; bg: string }> = {
  "github.com": {
    name: "GitHub",
    description: "Naman-1508 · Software Engineer · Cyber Security · 300+ LeetCode · IEEE Research",
    color: "#ffffff",
    icon: "🐙",
    bg: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
  },
  "linkedin.com": {
    name: "LinkedIn",
    description: "Naman Jain · SWE Intern @ HPE · B.Tech CSE (Cyber Security) · Amazon ML Summer School 2026",
    color: "#ffffff",
    icon: "💼",
    bg: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
  },
  "leetcode.com": {
    name: "LeetCode",
    description: "Naman Jain · 350+ Problems Solved · Top 10% Contests · Dynamic Programming Enthusiast",
    color: "#ffffff",
    icon: "💪",
    bg: "linear-gradient(135deg, #ffa116 0%, #cc8111 100%)",
  },
  "twitter.com": {
    name: "X / Twitter",
    description: "Follow Naman on X for tech updates and insights",
    color: "#ffffff",
    icon: "𝕏",
    bg: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
  },
  "instagram.com": {
    name: "Instagram",
    description: "Connect on Instagram",
    color: "#ffffff",
    icon: "📸",
    bg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
  },
  "ieeexplore.ieee.org": {
    name: "IEEE Xplore",
    description: "RoadIntel: AI Traffic Intelligence — ICCECE 2026",
    color: "#ffffff",
    icon: "🔬",
    bg: "linear-gradient(135deg, #00629B 0%, #003366 100%)",
  },
};

function getPreviewSite(url: string) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return PREVIEW_SITES[hostname] ?? null;
  } catch { return null; }
}

const MacOSSafari = ({ initialUrl = "https://github.com/Naman-1508", initialTitle = "GitHub" }: MacOSSafariProps) => {
  const [tabs, setTabs] = useState<SafariTab[]>([
    { id: "tab-1", url: cleanUrl(initialUrl), title: initialTitle, favicon: getFavicon(cleanUrl(initialUrl)) },
  ]);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [addressInput, setAddressInput] = useState(cleanUrl(initialUrl));
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<string[]>([cleanUrl(initialUrl)]);
  const [histIdx, setHistIdx] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTab = tabs.find(t => t.id === activeTab);
  const currentUrl = currentTab?.url ?? "";
  const previewSite = getPreviewSite(currentUrl);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(18);
    let p = 18;
    progressRef.current = setInterval(() => {
      p = Math.min(p + Math.random() * 14, 88);
      setProgress(p);
    }, 180);
  }, []);

  const stopLoading = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
    setTimeout(() => { setLoading(false); setProgress(0); }, 280);
  }, []);

  const navigate = useCallback((url: string) => {
    const full = cleanUrl(url);
    if (!full) return;
    const newHist = [...history.slice(0, histIdx + 1), full];
    setHistory(newHist);
    setHistIdx(newHist.length - 1);
    const title = getDisplayUrl(full) || "New Tab";
    setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, url: full, title, favicon: getFavicon(full) } : t));
    setAddressInput(full);
    setBookmarked(false);
    startLoading();
    setTimeout(stopLoading, getPreviewSite(full) ? 350 : 1600);
  }, [history, histIdx, activeTab, startLoading, stopLoading]);

  const goBack = () => {
    if (histIdx > 0) {
      const ni = histIdx - 1;
      setHistIdx(ni);
      const url = history[ni];
      setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, url } : t));
      setAddressInput(url);
    }
  };
  const goForward = () => {
    if (histIdx < history.length - 1) {
      const ni = histIdx + 1;
      setHistIdx(ni);
      const url = history[ni];
      setTabs(ts => ts.map(t => t.id === activeTab ? { ...t, url } : t));
      setAddressInput(url);
    }
  };
  const refresh = () => { startLoading(); setTimeout(stopLoading, 1000); };

  const addTab = () => {
    const id = `tab-${Date.now()}`;
    setTabs(ts => [...ts, { id, url: "about:newtab", title: "New Tab" }]);
    setActiveTab(id);
    setAddressInput("");
  };
  const closeTab = (id: string) => {
    if (tabs.length === 1) return;
    const remaining = tabs.filter(t => t.id !== id);
    setTabs(remaining);
    if (activeTab === id) setActiveTab(remaining[0].id);
  };

  useEffect(() => {
    setAddressInput(currentUrl === "about:newtab" ? "" : currentUrl);
  }, [currentUrl]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>

      {/* ── Tab bar ── */}
      <div style={{
        display: "flex", alignItems: "center",
        padding: "0 8px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0, height: 36, overflowX: "auto",
        gap: 2,
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "0 10px", height: 30,
              minWidth: 100, maxWidth: 200,
              borderRadius: "6px 6px 0 0",
              background: tab.id === activeTab ? "rgba(255,255,255,0.1)" : "transparent",
              border: tab.id === activeTab ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
              borderBottom: "none", cursor: "default", flexShrink: 0,
              transition: "background 0.1s",
            }}
          >
            {tab.favicon ? (
              <img src={tab.favicon} alt="" style={{ width: 13, height: 13, borderRadius: 2 }}
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            ) : <span style={{ fontSize: 11 }}>🌐</span>}
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
              {tab.title}
            </span>
            {tabs.length > 1 && (
              <button onClick={e => { e.stopPropagation(); closeTab(tab.id); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: 10, padding: 0, lineHeight: 1 }}>
                ✕
              </button>
            )}
          </div>
        ))}
        <button onClick={addTab} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 16, padding: "0 8px", lineHeight: 1 }}>+</button>
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 12px",
        background: "rgba(255,255,255,0.02)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <NavBtn onClick={goBack} disabled={histIdx === 0} title="Back">
          <path d="M13 8H4M8 3L3 8l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </NavBtn>
        <NavBtn onClick={goForward} disabled={histIdx >= history.length - 1} title="Forward">
          <path d="M5 8h9M10 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </NavBtn>
        <NavBtn onClick={refresh} title="Refresh">
          <path d="M13.5 4A8 8 0 1 0 15 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          <path d="M13.5 1v3h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </NavBtn>

        {/* Address bar */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.08)",
          border: addressFocused ? "1.5px solid rgba(10,132,255,0.7)" : "1.5px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "0 12px", height: 31,
          transition: "border-color 0.15s",
        }}>
          {!addressFocused && previewSite && <span style={{ fontSize: 12 }}>🔒</span>}
          {!addressFocused && !previewSite && (
            <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, height: 11, flexShrink: 0 }}>
              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" />
              <path d="M8 2c-1.5 2-2 4-2 6s.5 4 2 6M8 2c1.5 2 2 4 2 6s-.5 4-2 6M2 8h12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" />
            </svg>
          )}
          <input
            value={addressFocused ? addressInput : getDisplayUrl(addressInput)}
            onChange={e => setAddressInput(e.target.value)}
            onFocus={() => setAddressFocused(true)}
            onBlur={() => setAddressFocused(false)}
            onKeyDown={e => { if (e.key === "Enter") { navigate(addressInput); (e.target as HTMLInputElement).blur(); } }}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "rgba(255,255,255,0.88)", fontSize: 13,
              fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
              textAlign: addressFocused ? "left" : "center",
            }}
          />
        </div>

        {/* Bookmark */}
        <button onClick={() => setBookmarked(b => !b)} style={{
          background: "none", border: "none", cursor: "pointer", padding: 2,
          color: bookmarked ? "#febc2e" : "rgba(255,255,255,0.3)", fontSize: 15,
          transition: "color 0.2s, transform 0.15s",
          transform: bookmarked ? "scale(1.25)" : "scale(1)",
        }}>
          {bookmarked ? "★" : "☆"}
        </button>

        <button onClick={() => window.open(currentUrl, "_blank")} title="Open in real browser" style={{
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 6, padding: "4px 10px", cursor: "pointer",
          color: "rgba(255,255,255,0.6)", fontSize: 11,
        }}>↗</button>
      </div>

      {/* ── Loading bar ── */}
      <div style={{ height: 2, background: "transparent", flexShrink: 0 }}>
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              exit={{ opacity: 0 }}
              transition={{ ease: "linear", duration: 0.18 }}
              style={{ height: "100%", background: "linear-gradient(90deg, #0A84FF, #64D2FF)", borderRadius: "0 2px 2px 0" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {currentUrl === "about:newtab" || !currentUrl ? (
          <NewTabPage onNavigate={navigate} />
        ) : previewSite ? (
          <SiteLinkPage url={currentUrl} site={previewSite} />
        ) : (
          <iframe
            src={currentUrl}
            onLoad={stopLoading}
            onError={stopLoading}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Safari Browser"
          />
        )}
      </div>
    </div>
  );
};

// ── Sub-components ────────────────────────────────────────────────────────────

const NavBtn = ({ children, onClick, disabled, title }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; title: string;
}) => (
  <button onClick={onClick} disabled={disabled} title={title} style={{
    width: 30, height: 30, borderRadius: 7, border: "none",
    background: "rgba(255,255,255,0.07)",
    color: disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.65)",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.1s, color 0.1s",
    flexShrink: 0,
  }}
  onMouseEnter={e => { if (!disabled) (e.currentTarget).style.background = "rgba(255,255,255,0.13)"; }}
  onMouseLeave={e => { (e.currentTarget).style.background = "rgba(255,255,255,0.07)"; }}
  >
    <svg viewBox="0 0 18 18" fill="none" style={{ width: 15, height: 15 }}>{children}</svg>
  </button>
);

// Site link preview page (for GitHub, LinkedIn etc. that block iframes)
const SiteLinkPage = ({ url, site }: { url: string; site: { name: string; description: string; color: string; icon: string; bg: string } }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", height: "100%",
    background: site.bg, padding: 40,
  }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        padding: "40px 50px",
        borderRadius: 20,
        background: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        maxWidth: 460, textAlign: "center",
      }}
    >
      <div style={{ fontSize: 52 }}>{site.icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: site.color, marginBottom: 8 }}>{site.name}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{site.description}</div>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => window.open(url, "_blank")}
          style={{
            padding: "11px 28px", borderRadius: 12,
            border: "none",
            background: "rgba(255,255,255,0.95)",
            color: "#111", cursor: "pointer", fontSize: 14, fontWeight: 600,
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
          }}
        >
          Open {site.name} ↗
        </motion.button>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
        <strong style={{ color: "rgba(255,255,255,0.5)" }}>{new URL(url).hostname}</strong> uses X-Frame-Options
        to prevent embedding. Click the button above to visit in a new tab.
      </div>
    </motion.div>
  </div>
);

const QUICK_LINKS = [
  { label: "GitHub",   url: "https://github.com/Naman-1508",                        icon: "🐙", color: "#161b22" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/naman-jain-123681317/",    icon: "💼", color: "#0a66c2" },
  { label: "Resume",   url: "/Naman_Resume.pdf",                                    icon: "📑", color: "#FF3B30" },
  { label: "LeetCode", url: "https://leetcode.com/u/ZWCMA2Saw6/",                   icon: "💪", color: "#FFA500" },
  { label: "IEEE",     url: "https://ieeexplore.ieee.org/",                         icon: "🔬", color: "#00629B" },
];

const NewTabPage = ({ onNavigate }: { onNavigate: (url: string) => void }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", height: "100%", gap: 28,
    background: "linear-gradient(135deg, rgba(14,10,28,0.7) 0%, rgba(20,14,40,0.7) 100%)",
  }}>
    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Favorites</div>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
      {QUICK_LINKS.map(l => (
        <motion.div
          key={l.label}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate(l.url)}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            padding: "18px 22px", borderRadius: 16,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer", width: 96,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontSize: 28 }}>{l.icon}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{l.label}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default MacOSSafari;
