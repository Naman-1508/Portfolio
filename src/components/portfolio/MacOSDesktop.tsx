/**
 * MacOSDesktop — The complete macOS desktop experience
 *
 * Orchestrates:
 * - All application windows
 * - Finder (primary nav)
 * - Terminal, Safari, Mail, Calendar, About This Dev
 * - Spotlight (⌘+Space)
 * - Context Menu (right-click)
 * - Notifications (auto-triggered on mount)
 * - Mission Control (Dock button)
 * - Quick Look (Space bar on selected icon)
 * - Parallax wallpaper (mouse parallax)
 * - Profile card + View Counter
 * - Keyboard shortcuts
 */
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import MacOSMenuBar from "./MacOSMenuBar";
import MacOSDock, { DockItem } from "./MacOSDock";
import MacOSWindow, { WindowState } from "./MacOSWindow";
import MacOSFinder, { FinderItem } from "./MacOSFinder";
import MacOSTerminal from "./MacOSTerminal";
import MacOSSafari from "./MacOSSafari";
import MacOSSpotlight, { SpotlightResult } from "./MacOSSpotlight";
import { MacOSContextMenu, ContextMenuState, defaultContextMenuState, ContextMenuItem } from "./MacOSContextMenu";
import MacOSNotifications, { useNotifications } from "./MacOSNotifications";
import MacOSMissionControl from "./MacOSMissionControl";
import MacOSVSCode from "./MacOSVSCode";
import MacOSPreview from "./MacOSPreview";
import MacOSGenericApp from "./MacOSGenericApp";
import MacOSQuickLook from "./MacOSQuickLook";
import MacOSMusicPlayer from "./MacOSMusicPlayer";
import ViewCounter from "./ViewCounter";
import AboutThisDev from "./AboutThisDev";
import MacOSMail from "./MacOSMail";
import MacOSCalendar from "./MacOSCalendar";
import MacOSLaunchpad from "./MacOSLaunchpad";
import { MacOSMusicApp, MacOSNotesApp, MacOSMessagesApp, MacOSPhotosApp, MacOSSettingsApp } from "./MacOSApps";

// Original portfolio sections
import Projects from "./Projects";
import Experience from "./Experience";
import Skills from "./Skills";
import Certifications from "./Certifications";
import About from "./About";
import Education from "./Education";
import Contact from "./Contact";

// ── Types ─────────────────────────────────────────────────────────────────────
type AppId =
  | "finder" | "terminal" | "safari"
  | "projects" | "experience" | "skills" | "achievements"
  | "about" | "education" | "contact" | "resume"
  | "about-dev" | "mail" | "calendar"
  | "mission-control" | "vscode" | "preview" | "launchpad"
  | "messages" | "music" | "notes" | "photos" | "settings";

interface AppDef {
  id: AppId;
  title: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  getContent: (extra?: string) => React.ReactNode;
}

// ── Z-index counter (module-level so it never resets) ──────────────────────
let zTop = 200;
const nextZ = () => ++zTop;

// ── App registry ──────────────────────────────────────────────────────────────
const makeApps = (openApp: (id: AppId, extra?: string) => void): AppDef[] => [
  {
    id: "finder",
    title: "Finder",
    icon: "🗂️",
    defaultWidth: 860, defaultHeight: 580,
    getContent: () => {
      const items: FinderItem[] = [
        { id: "about-dev", name: "About This Developer", icon: "🖥️", kind: "app",    size: "—",     modified: "Today", action: () => openApp("about-dev") },
        { id: "projects",  name: "Projects",             icon: "💼", kind: "folder", size: "—",     modified: "2025", action: () => openApp("projects") },
        { id: "experience",name: "Experience",           icon: "🏢", kind: "folder", size: "—",     modified: "2026", action: () => openApp("experience") },
        { id: "skills",    name: "Tech Stack",           icon: "⚙️", kind: "folder", size: "—",     modified: "2026", action: () => openApp("skills") },
        { id: "achievements",name:"Achievements",        icon: "🏆", kind: "folder", size: "—",     modified: "2026", action: () => openApp("achievements") },
        { id: "education", name: "Education",            icon: "🎓", kind: "folder", size: "—",     modified: "2023", action: () => openApp("education") },
        { id: "about",     name: "About Me.txt",         icon: "📄", kind: "txt",    size: "2 KB",  modified: "Today", action: () => openApp("about") },
        { id: "contact",   name: "Contact",              icon: "📬", kind: "folder", size: "—",     modified: "Today", action: () => openApp("contact") },
        { id: "resume",    name: "Naman_Resume.pdf",     icon: "📑", kind: "pdf",    size: "156 KB",modified: "2026", action: () => openApp("resume") },
        { id: "terminal",  name: "Terminal",             icon: "⌨️", kind: "app",    size: "—",     modified: "Today", action: () => openApp("terminal") },
        { id: "vscode",    name: "Visual Studio Code",   icon: "💻", kind: "app",    size: "—",     modified: "Today", action: () => openApp("vscode") },
        { id: "mail",      name: "Mail",                 icon: "✉️", kind: "app",    size: "—",     modified: "Today", action: () => openApp("mail") },
        { id: "calendar",  name: "Calendar",             icon: "📅", kind: "app",    size: "—",     modified: "Today", action: () => openApp("calendar") },
        { id: "safari",    name: "Safari",               icon: "🌐", kind: "app",    size: "—",     modified: "Today", action: () => openApp("safari") },
      ];
      return <MacOSFinder items={items} onOpenApp={(id) => openApp(id as AppId)} />;
    },
  },
  {
    id: "terminal",
    title: "Terminal — naman@portfolio",
    icon: "⌨️",
    defaultWidth: 720, defaultHeight: 480,
    getContent: () => <MacOSTerminal onOpenApp={(id, url) => openApp(id as AppId, url)} />,
  },
  {
    id: "safari",
    title: "Safari",
    icon: "🌐",
    defaultWidth: 900, defaultHeight: 620,
    getContent: (url?: string) => <MacOSSafari initialUrl={url ?? "https://github.com/Naman-1508"} initialTitle={url ? url.replace("https://","").replace("www.","") : "GitHub"} />,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "💻",
    defaultWidth: 880, defaultHeight: 620,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Projects /></div>,
  },
  {
    id: "experience",
    title: "Experience",
    icon: "💼",
    defaultWidth: 780, defaultHeight: 580,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Experience /></div>,
  },
  {
    id: "skills",
    title: "Tech Stack",
    icon: "⚙️",
    defaultWidth: 820, defaultHeight: 580,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Skills /></div>,
  },
  {
    id: "achievements",
    title: "Achievements & Awards",
    icon: "🏆",
    defaultWidth: 780, defaultHeight: 560,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Certifications /></div>,
  },
  {
    id: "about",
    title: "About Me.txt",
    icon: "📄",
    defaultWidth: 720, defaultHeight: 540,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><About /></div>,
  },
  {
    id: "education",
    title: "Education",
    icon: "🎓",
    defaultWidth: 820, defaultHeight: 560,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Education /></div>,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "📞",
    defaultWidth: 700, defaultHeight: 520,
    getContent: () => <div className="p-6 custom-scrollbar" style={{ height: "100%", overflowY: "auto" }}><Contact /></div>,
  },
  {
    id: "about-dev",
    title: "About This Developer",
    icon: "🖥️",
    defaultWidth: 700, defaultHeight: 560,
    getContent: () => <AboutThisDev />,
  },
  {
    id: "mail",
    title: "New Message",
    icon: "✉️",
    defaultWidth: 640, defaultHeight: 500,
    getContent: () => <MacOSMail />,
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: "📅",
    defaultWidth: 820, defaultHeight: 580,
    getContent: () => <MacOSCalendar />,
  },
  {
    id: "vscode",
    title: "VS Code",
    icon: "💻",
    defaultWidth: 900, defaultHeight: 600,
    getContent: () => <MacOSVSCode />,
  },
  {
    id: "preview",
    title: "Preview",
    icon: "👁️",
    defaultWidth: 860, defaultHeight: 700,
    getContent: (url?: string) => <MacOSPreview fileUrl={url || "/Naman_Resume.pdf"} fileName="Naman_Resume.pdf" />,
  },
  {
    id: "messages",
    title: "Messages",
    icon: "💬",
    defaultWidth: 800, defaultHeight: 600,
    getContent: () => <MacOSMessagesApp />,
  },
  {
    id: "music",
    title: "Music",
    icon: "🎵",
    defaultWidth: 900, defaultHeight: 600,
    getContent: () => <MacOSMusicApp />,
  },
  {
    id: "notes",
    title: "Notes",
    icon: "📝",
    defaultWidth: 800, defaultHeight: 600,
    getContent: () => <MacOSNotesApp />,
  },
  {
    id: "photos",
    title: "Photos",
    icon: "🖼️",
    defaultWidth: 900, defaultHeight: 600,
    getContent: () => <MacOSPhotosApp />,
  },
  {
    id: "settings",
    title: "System Settings",
    icon: "⚙️",
    defaultWidth: 800, defaultHeight: 600,
    getContent: () => <MacOSSettingsApp />,
  },
];

// ── Desktop icon definitions ──────────────────────────────────────────────────
const DESKTOP_ICONS: { id: AppId; label: string; icon: string }[] = [
  { id: "finder",       label: "Finder",         icon: "🗂️" },
  { id: "projects",     label: "Projects",       icon: "💻" },
  { id: "experience",   label: "Experience",     icon: "💼" },
  { id: "skills",       label: "Tech Stack",     icon: "⚙️" },
  { id: "achievements", label: "Awards",         icon: "🏆" },
  { id: "education",    label: "Education",      icon: "🎓" },
  { id: "about",        label: "About Me",       icon: "📄" },
  { id: "contact",      label: "Contact",        icon: "📞" },
  { id: "resume",       label: "Resume.pdf",     icon: "📑" },
];

// ── Spotlight search data ─────────────────────────────────────────────────────
function buildSpotlightResults(openApp: (id: AppId, extra?: string) => void): SpotlightResult[] {
  return [
    { id: "sp-finder",     label: "Finder",         subtitle: "Browse portfolio folders",  category: "Apps",    icon: "🗂️", action: () => openApp("finder") },
    { id: "sp-terminal",   label: "Terminal",       subtitle: "Run portfolio commands",    category: "Apps",    icon: "⌨️", action: () => openApp("terminal") },
    { id: "sp-safari",     label: "Safari",         subtitle: "Open browser",              category: "Apps",    icon: "🌐", action: () => openApp("safari") },
    { id: "sp-about-dev",  label: "About This Developer", subtitle: "System info",        category: "Apps",    icon: "🖥️", action: () => openApp("about-dev") },
    { id: "sp-mail",       label: "Mail",           subtitle: "Send a message",            category: "Apps",    icon: "✉️", action: () => openApp("mail") },
    { id: "sp-calendar",   label: "Calendar",       subtitle: "Timeline of milestones",    category: "Apps",    icon: "📅", action: () => openApp("calendar") },
    { id: "sp-vscode",     label: "VS Code",        subtitle: "View Architecture",         category: "Apps",    icon: "💻", action: () => openApp("vscode") },
    { id: "sp-projects",   label: "Projects",       subtitle: "SIGNAL, CricNation, VulnFusion", category: "Portfolio", icon: "💻", action: () => openApp("projects") },
    { id: "sp-experience", label: "Experience",     subtitle: "HPE · MSRIT",               category: "Portfolio", icon: "💼", action: () => openApp("experience") },
    { id: "sp-skills",     label: "Tech Stack",     subtitle: "Python, React, AI, Security",category: "Portfolio", icon: "⚙️", action: () => openApp("skills") },
    { id: "sp-education",  label: "Education",      subtitle: "MSRIT · CGPA 9.07",         category: "Portfolio", icon: "🎓", action: () => openApp("education") },
    { id: "sp-achievements",label:"Achievements",   subtitle: "Amazon ML, IEEE, Hackathons",category: "Portfolio", icon: "🏆", action: () => openApp("achievements") },
    { id: "sp-about",      label: "About Me",       subtitle: "Personal bio",              category: "Portfolio", icon: "📄", action: () => openApp("about") },
    { id: "sp-contact",    label: "Contact",        subtitle: "Get in touch",              category: "Portfolio", icon: "📞", action: () => openApp("contact") },
    { id: "sp-resume",     label: "Resume.pdf",     subtitle: "Download resume",           category: "Files",   icon: "📑", action: () => openApp("resume") },
    { id: "sp-github",   label: "GitHub",  subtitle: "github.com/Naman-1508",                   category: "Links", icon: "🐙", action: () => openApp("safari", "https://github.com/Naman-1508") },
    { id: "sp-linkedin", label: "LinkedIn", subtitle: "linkedin.com/in/naman-jain-123681317",    category: "Links", icon: "💼", action: () => openApp("safari", "https://www.linkedin.com/in/naman-jain-123681317/") },
    { id: "sp-leetcode", label: "LeetCode", subtitle: "leetcode.com/u/ZWCMA2Saw6",              category: "Links", icon: "💪", action: () => openApp("safari", "https://leetcode.com/u/ZWCMA2Saw6/") },
  ];
}

// ── Wallpapers ─────────────────────────────────────────────────────────────────
const WALLPAPERS = [
  // 0 — Custom (uses wallpaper.png from public/)
  { name: "Custom",          bg: null,      image: "/wallpaper.png" },
  // 1 — macOS Sonoma Night
  { name: "Sonoma Night",    image: null,   bg: "radial-gradient(ellipse at 30% 70%, #0d1b5e 0%, #1a0537 40%, #000008 100%)" },
  // 2 — Monterey Ocean
  { name: "Monterey",        image: null,   bg: "radial-gradient(ellipse at 70% 30%, #0a3d62 0%, #1a1a2e 50%, #000005 100%)" },
  // 3 — Big Sur Sunset
  { name: "Big Sur",         image: null,   bg: "radial-gradient(ellipse at 50% 80%, #7b2d8b 0%, #2c003e 40%, #0a000a 100%)" },
  // 4 — Forest
  { name: "Forest",          image: null,   bg: "radial-gradient(ellipse at 20% 30%, #0e4d4d 0%, #0a1628 50%, #000000 100%)" },
  // 5 — Aurora
  { name: "Aurora",          image: null,   bg: "radial-gradient(ellipse at 80% 70%, #5c1d5c 0%, #1a0040 40%, #000010 100%)" },
  // 6 — Deep Space
  { name: "Deep Space",      image: null,   bg: "radial-gradient(ellipse at 40% 40%, #003366 0%, #1b003b 45%, #000010 100%)" },
];

type WallpaperDef = typeof WALLPAPERS[0];

// ── Component ──────────────────────────────────────────────────────────────────
const MacOSDesktop = ({ onShutdown, onRestart }: { onShutdown?: () => void; onRestart?: () => void }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [missionControlOpen, setMissionControlOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>(defaultContextMenuState);
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [quickLookOpen, setQuickLookOpen] = useState(false);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const [wallpaperIdx, setWallpaperIdx] = useState(1); // Default to Sonoma Night (Dynamic)

  const cycleWallpaper = useCallback(() => {
    setWallpaperIdx(i => (i + 1) % WALLPAPERS.length);
  }, []);

  const { notifications, push: pushNotif, dismiss: dismissNotif } = useNotifications();

  // ── Open app ────────────────────────────────────────────────────────────────
  const openApp = useCallback((appId: AppId, extra?: string) => {
    if (appId === "resume") {
      appId = "preview";
      extra = "/Naman_Resume.pdf";
    }
    if (appId === "launchpad") {
      setLaunchpadOpen(true);
      return;
    }
    if (appId === "mission-control") {
      setMissionControlOpen(true);
      return;
    }

    const apps = makeApps(openApp);
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    // Already open? Bring to front
    const existing = windows.find(w => w.id === (extra ? `${appId}-${extra}` : appId));
    if (existing) {
      const z = nextZ();
      setWindows(ws => ws.map(w => w.id === existing.id ? { ...w, isMinimized: false, zIndex: z } : w));
      setFocusedId(existing.id);
      return;
    }

    // Launch bounce animation
    const winId = extra ? `${appId}-${extra}` : appId;
    setLaunchingId(appId);
    setTimeout(() => setLaunchingId(null), 800);

    // Stagger position for cascade
    const offset = (windows.length % 8) * 24;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(app.defaultWidth,  vw - 60);
    const h = Math.min(app.defaultHeight, vh - 160);
    const x = Math.max(40, Math.min((vw - w) / 2 + offset - 100, vw - w - 20));
    const y = Math.max(36, Math.min((vh - h) / 2 + offset - 60,  vh - h - 90));

    const newWin: WindowState = {
      id: winId, title: app.title, icon: app.icon,
      isMinimized: false, isMaximized: false,
      x, y, width: w, height: h,
      zIndex: nextZ(),
      children: app.getContent(extra),
    };

    setWindows(ws => [...ws, newWin]);
    setFocusedId(winId);
  }, [windows]);

  const closeWindow    = useCallback((id: string) => { setWindows(ws => ws.filter(w => w.id !== id)); if (focusedId === id) setFocusedId(null); }, [focusedId]);
  const minimizeWindow = useCallback((id: string) => { setWindows(ws => ws.map(w => w.id === id ? { ...w, isMinimized: true } : w)); }, []);
  const maximizeWindow = useCallback((id: string) => { setWindows(ws => ws.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)); }, []);
  const focusWindow    = useCallback((id: string) => {
    const z = nextZ();
    setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: z } : w));
    setFocusedId(id);
  }, []);

  // ── Spotlight search ─────────────────────────────────────────────────────────
  const allResults = useMemo(() => buildSpotlightResults(openApp), [openApp]);
  const handleSearch = useCallback((q: string): SpotlightResult[] => {
    const ql = q.toLowerCase();
    return allResults.filter(r =>
      r.label.toLowerCase().includes(ql) ||
      (r.subtitle ?? "").toLowerCase().includes(ql) ||
      r.category.toLowerCase().includes(ql)
    );
  }, [allResults]);

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // ⌘+Space → Spotlight
      if ((e.metaKey || e.ctrlKey) && e.key === " ") {
        e.preventDefault();
        setSpotlightOpen(s => !s);
        return;
      }
      // Escape → close spotlight / context menu / quick look
      if (e.key === "Escape") {
        setSpotlightOpen(false);
        setContextMenu(defaultContextMenuState);
        setMissionControlOpen(false);
        setQuickLookOpen(false);
      }
      // ⌃↑ → Mission Control
      if (e.ctrlKey && e.key === "ArrowUp") {
        e.preventDefault();
        setMissionControlOpen(s => !s);
      }
      // Space → Quick Look
      if (e.key === " ") {
        if (!spotlightOpen && !e.metaKey && !e.ctrlKey) {
          if (selectedIcon && !quickLookOpen) {
            e.preventDefault();
            setQuickLookOpen(true);
          } else if (quickLookOpen) {
            e.preventDefault();
            setQuickLookOpen(false);
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ── Parallax wallpaper ────────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const px = ((e.clientX - cx) / cx) * -6; // max 6px drift
      const py = ((e.clientY - cy) / cy) * -6;
      setParallax({ x: px, y: py });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ── Startup notifications ─────────────────────────────────────────────────
  useEffect(() => {
    const schedule = [
      { delay: 4000,  n: { appName: "Portfolio", appIcon: "👋", title: "Welcome!", subtitle: "Explore my work — it's an actual macOS desktop" } },
      { delay: 12000, n: { appName: "Amazon ML", appIcon: "🏆", title: "Amazon ML Summer School", subtitle: "Selected — Top ~3% of all applicants worldwide" } },
      { delay: 22000, n: { appName: "IEEE", appIcon: "📄", title: "Research Published", subtitle: "RoadIntel: AI Traffic Intelligence — ICCECE 2026", onClick: () => openApp("achievements") } },
      { delay: 35000, n: { appName: "Tips", appIcon: "💡", title: "Try Terminal.app", subtitle: "Type 'sudo hire naman' for a surprise 😄", onClick: () => openApp("terminal") } },
    ];
    const ids = schedule.map(({ delay, n }) => setTimeout(() => pushNotif(n), delay));
    return () => ids.forEach(clearTimeout);
  }, [pushNotif, openApp]);

  // ── Right-click context menu ──────────────────────────────────────────────
  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const items: ContextMenuItem[] = [
      { id: "finder",    label: "Open Finder",           icon: "🗂️", onClick: () => openApp("finder") },
      { id: "terminal",  label: "Open Terminal",         icon: "⌨️", onClick: () => openApp("terminal") },
      { id: "sep1",      label: "", separator: true },
      { id: "mc",        label: "Mission Control",       icon: "🖥️", shortcut: "⌃↑", onClick: () => setMissionControlOpen(true) },
      { id: "spotlight", label: "Spotlight Search",      icon: "🔍", shortcut: "⌘Space", onClick: () => setSpotlightOpen(true) },
      { id: "sep2",      label: "", separator: true },
      { id: "about-dev", label: "About This Developer",  icon: "ℹ️", onClick: () => openApp("about-dev") },
      { id: "wallpaper", label: "Change Wallpaper",      icon: "🖼️", onClick: cycleWallpaper },
    ];
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, items });
  }, [openApp]);

  const handleIconContextMenu = useCallback((e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const items: ContextMenuItem[] = [
      { id: "open",   label: "Open",         icon: "↩️",  onClick: () => openApp(iconId as AppId) },
      { id: "info",   label: "Get Info",     icon: "ℹ️",  shortcut: "⌘I" },
      { id: "sep",    label: "", separator: true },
      { id: "ql",     label: "Quick Look",   icon: "👁️",  shortcut: "Space", onClick: () => setQuickLookOpen(true) },
      { id: "dup",    label: "Duplicate",    icon: "📋",  shortcut: "⌘D" },
    ];
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, items });
  }, [openApp]);

  // ── Focused app title for menu bar ───────────────────────────────────────
  const focusedTitle = focusedId
    ? (windows.find(w => w.id === focusedId)?.title ?? "Finder")
    : "Finder";

  // ── Dock items ──────────────────────────────────────────────────────────────
  const dockItems: DockItem[] = [
    { id: "finder",       icon: "🗂️", label: "Finder",      onClick: () => openApp("finder"),       isOpen: windows.some(w => w.id === "finder"), isFocused: focusedId === "finder" },
    { id: "launchpad",    icon: "🚀", label: "Launchpad",   onClick: () => openApp("launchpad"),    isOpen: launchpadOpen,                        isFocused: false },
    { id: "messages",     icon: "💬", label: "Messages",    onClick: () => openApp("messages"),     isOpen: windows.some(w => w.id === "messages"), isFocused: focusedId === "messages" },
    { id: "mail",         icon: "✉️", label: "Mail",        onClick: () => openApp("mail"),         isOpen: windows.some(w => w.id === "mail"),        isFocused: focusedId === "mail" },
    { id: "safari",       icon: "🌐", label: "Safari",      onClick: () => openApp("safari"),       isOpen: windows.some(w => w.id.startsWith("safari")), isFocused: focusedId?.startsWith("safari") },
    { id: "photos",       icon: "🖼️", label: "Photos",      onClick: () => openApp("photos"),       isOpen: windows.some(w => w.id === "photos"), isFocused: focusedId === "photos" },
    { id: "notes",        icon: "📝", label: "Notes",       onClick: () => openApp("notes"),        isOpen: windows.some(w => w.id === "notes"), isFocused: focusedId === "notes" },
    { id: "calendar",     icon: "📅", label: "Calendar",    onClick: () => openApp("calendar"),     isOpen: windows.some(w => w.id === "calendar"),    isFocused: focusedId === "calendar" },
    { id: "music",        icon: "🎵", label: "Music",       onClick: () => openApp("music"),        isOpen: windows.some(w => w.id === "music"), isFocused: focusedId === "music" },
    { id: "terminal",     icon: "⌨️", label: "Terminal",    onClick: () => openApp("terminal"),     isOpen: windows.some(w => w.id === "terminal"), isFocused: focusedId === "terminal", separatorBefore: true },
    { id: "vscode",       icon: "💻", label: "VS Code",     onClick: () => openApp("vscode"),       isOpen: windows.some(w => w.id === "vscode"),      isFocused: focusedId === "vscode" },
    { id: "settings",     icon: "⚙️", label: "System Settings", onClick: () => openApp("settings"), isOpen: windows.some(w => w.id === "settings"), isFocused: focusedId === "settings" },
    { id: "sep-1", icon: "", label: "", onClick: () => {}, separatorBefore: false }, // visual spacer handled differently
    { id: "projects",     icon: "💻", label: "Projects",    onClick: () => openApp("projects"),     isOpen: windows.some(w => w.id === "projects"),    isFocused: focusedId === "projects",    separatorBefore: true },
    { id: "experience",   icon: "💼", label: "Experience",  onClick: () => openApp("experience"),   isOpen: windows.some(w => w.id === "experience"),  isFocused: focusedId === "experience" },
    { id: "skills",       icon: "⚙️", label: "Tech Stack",  onClick: () => openApp("skills"),       isOpen: windows.some(w => w.id === "skills"),      isFocused: focusedId === "skills" },
    { id: "achievements", icon: "🏆", label: "Awards",      onClick: () => openApp("achievements"), isOpen: windows.some(w => w.id === "achievements"), isFocused: focusedId === "achievements" },
    { id: "education",    icon: "🎓", label: "Education",   onClick: () => openApp("education"),    isOpen: windows.some(w => w.id === "education"),   isFocused: focusedId === "education" },
    { id: "mission-ctl",  icon: "🗃️", label: "Mission Control", onClick: () => setMissionControlOpen(true), isFocused: missionControlOpen, separatorBefore: true },
    { id: "resume-dock",  icon: "📑", label: "Resume.pdf",  onClick: () => openApp("resume"),      isOpen: windows.some(w => w.id === "preview"), separatorBefore: false },
  ].filter(d => d.id !== "sep-1"); // remove spacer placeholder

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ position: "fixed", inset: 0, overflow: "hidden", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}
      onContextMenu={handleDesktopContextMenu}
      onClick={() => {
        setSelectedIcon(null);
        setContextMenu(defaultContextMenuState);
      }}
    >
      {/* ── Dynamic Wallpaper ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`wp-${wallpaperIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            ...(WALLPAPERS[wallpaperIdx].image
              ? {
                  backgroundImage: `url('${WALLPAPERS[wallpaperIdx].image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  background: WALLPAPERS[wallpaperIdx].bg!,
                }),
          }}
        />
      </AnimatePresence>
      {/* Parallax layer */}
      <motion.div
        animate={{ x: parallax.x, y: parallax.y }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        style={{ position: "absolute", inset: "-20px", zIndex: 0, pointerEvents: "none" }}
      />
      {/* Subtle depth overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.14)", zIndex: 1, pointerEvents: "none" }} />

      {/* ── Wallpaper picker dots ── */}
      <div style={{
        position: "absolute", bottom: 88, right: 16, zIndex: 9700,
        display: "flex", flexDirection: "column", gap: 5, alignItems: "center",
      }}>
        {WALLPAPERS.map((wp, i) => (
          <button
            key={i}
            onClick={() => setWallpaperIdx(i)}
            title={wp.name}
            style={{
              width: i === wallpaperIdx ? 8 : 6,
              height: i === wallpaperIdx ? 8 : 6,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.5)",
              background: i === wallpaperIdx ? "white" : "transparent",
              cursor: "pointer",
              transition: "all 0.2s",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Menu Bar ── */}
      <MacOSMenuBar
        focusedApp={focusedTitle}
        onSpotlightClick={() => setSpotlightOpen(true)}
        onShutdown={onShutdown}
        onRestart={onRestart}
      />

      {/* ── Desktop area ── */}
      <div style={{ position: "absolute", top: 28, left: 0, right: 0, bottom: 90 }}>

        {/* Profile card — top left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            position: "absolute", top: 16, left: 16, width: 215,
            borderRadius: 16, overflow: "hidden",
            background: "rgba(14,10,30,0.65)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1px solid rgba(255,255,255,0.11)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ height: 60, backgroundImage: "url('/wallpaper.png')", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
          </div>
          <div style={{ padding: "0 16px 16px", position: "relative" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", overflow: "hidden",
              border: "3px solid rgba(14,10,30,1)",
              boxShadow: "0 0 0 2px rgba(140,80,255,0.5)",
              marginTop: -26, marginBottom: 8,
            }}>
              <img src="/profile.jpg" alt="Naman" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 2px" }}>Naman Jain</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "0 0 10px", fontFamily: "'JetBrains Mono', monospace" }}>Cyber Security · Full-Stack</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
              <span style={{ color: "#34d399", fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>Open to Opportunities</span>
            </div>
          </div>
        </motion.div>

        {/* View counter — top center-right */}
        <ViewCounter />

        {/* Desktop icons — right side grid */}
        <div
          style={{
            position: "absolute", top: 16, right: 16,
            display: "grid", gridTemplateColumns: "repeat(2, 82px)", gap: 6,
          }}
          onClick={e => e.stopPropagation()}
        >
          {DESKTOP_ICONS.map(ic => (
            <DesktopIcon
              key={ic.id}
              icon={ic.icon}
              label={ic.label}
              isSelected={selectedIcon === ic.id}
              isOpen={windows.some(w => w.id === ic.id && !w.isMinimized)}
              onClick={e => { e.stopPropagation(); setSelectedIcon(ic.id); }}
              onDoubleClick={e => { e.stopPropagation(); openApp(ic.id); }}
              onContextMenu={e => handleIconContextMenu(e, ic.id)}
            />
          ))}
        </div>
      </div>

      {/* ── All open windows ── */}
      <AnimatePresence>
        {windows.map(win => (
          <MacOSWindow
            key={win.id}
            {...win}
            isFocused={focusedId === win.id}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
          />
        ))}
      </AnimatePresence>

      {/* ── Dock ── */}
      <MacOSDock items={dockItems} launchingId={launchingId} />

      {/* ── Spotlight ── */}
      <MacOSSpotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        results={[]}
        onSearch={handleSearch}
      />

      {/* ── Context Menu ── */}
      <AnimatePresence>
        {contextMenu.visible && (
          <MacOSContextMenu
            key="ctx"
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenu.items}
            onClose={() => setContextMenu(defaultContextMenuState)}
          />
        )}
      </AnimatePresence>

      {/* ── Notifications ── */}
      <MacOSNotifications notifications={notifications} onDismiss={dismissNotif} />

      {/* ── Mission Control ── */}
      <MacOSMissionControl
        isOpen={missionControlOpen}
        windows={windows}
        focusedId={focusedId}
        onClose={() => setMissionControlOpen(false)}
        onFocusWindow={id => { focusWindow(id); }}
      />

      {/* ── Quick Look ── */}
      <MacOSQuickLook
        isOpen={quickLookOpen}
        onClose={() => setQuickLookOpen(false)}
        fileUrl={selectedIcon === "resume" ? "/Naman_Resume.pdf" : ""}
        fileName={selectedIcon === "resume" ? "Resume.pdf" : (selectedIcon ? String(selectedIcon) : "Folder")}
        kind={selectedIcon === "resume" ? "pdf" : "folder"}
      />

      {/* ── Launchpad ── */}
      <MacOSLaunchpad
        open={launchpadOpen}
        onClose={() => setLaunchpadOpen(false)}
        apps={makeApps(openApp).map(a => ({ id: a.id, label: a.title, icon: a.icon }))}
        onOpenApp={openApp}
      />

      {/* ── Music Player ── */}
      <MacOSMusicPlayer />
    </motion.div>
  );
};

// ── Desktop Icon ──────────────────────────────────────────────────────────────
const DesktopIcon = ({ icon, label, isSelected, isOpen, onClick, onDoubleClick, onContextMenu }: {
  icon: string; label: string; isSelected: boolean; isOpen: boolean;
  onClick: (e: React.MouseEvent) => void;
  onDoubleClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}) => (
  <motion.div
    whileTap={{ scale: 0.9 }}
    style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      padding: "8px 4px", borderRadius: 8, cursor: "default", userSelect: "none", width: 82,
      background: isSelected ? "rgba(100,80,200,0.38)" : "transparent",
      border: isSelected ? "1px solid rgba(150,120,255,0.45)" : "1px solid transparent",
      backdropFilter: isSelected ? "blur(10px)" : "none",
    }}
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    onContextMenu={onContextMenu}
  >
    <div style={{
      width: 58, height: 58, borderRadius: 14,
      background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255,255,255,0.16)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.14)",
      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30,
    }}>
      {icon}
    </div>
    <span style={{
      fontSize: 11, color: "rgba(255,255,255,0.9)", textAlign: "center",
      maxWidth: 76, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      padding: "2px 5px", borderRadius: 4,
      background: isSelected ? "rgba(50,30,100,0.7)" : "rgba(0,0,0,0.48)",
      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
    }}>
      {label}
    </span>
    {isOpen && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.65)", marginTop: -2 }} />}
  </motion.div>
);

export default MacOSDesktop;
