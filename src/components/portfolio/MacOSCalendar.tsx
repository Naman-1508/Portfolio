/**
 * MacOSCalendar — Milestone calendar
 * Shows real milestones on actual dates
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Milestone {
  date: string; // YYYY-MM-DD
  title: string;
  category: "education" | "work" | "achievement" | "publication" | "project";
  detail?: string;
}

const MILESTONES: Milestone[] = [
  { date: "2020-03-01", title: "Class X — 94%", category: "education", detail: "Scored 94% in CBSE Class X board examinations" },
  { date: "2022-04-01", title: "Class XII — 87%", category: "education", detail: "Scored 87% in CBSE Class XII board examinations" },
  { date: "2023-09-01", title: "Joined MSRIT", category: "education", detail: "Started B.Tech CSE (Cyber Security) at M.S. Ramaiah Institute of Technology" },
  { date: "2024-08-01", title: "Flutter Intern @ MSRIT", category: "work", detail: "Research lab internship — built cross-platform mobile features" },
  { date: "2025-02-01", title: "WHACKIEST'25 - Top 12", category: "achievement", detail: "Hackathon finalist out of 300+ teams. Built HealTrip" },
  { date: "2025-06-01", title: "CricNation Launched", category: "project", detail: "Digital scoring platform - live deployed" },
  { date: "2025-08-01", title: "CodeArena Launched", category: "project", detail: "Real-time coding & interview platform" },
  { date: "2025-09-01", title: "Joined HPE as SWE Intern", category: "work", detail: "PUMA-Boot secure provisioning" },
  { date: "2025-10-11", title: "RoadIntel Launched", category: "project", detail: "AI-powered pothole detection using YOLO v11" },
  { date: "2025-12-12", title: "HealTrip Launched", category: "project", detail: "Medical tourism platform with 50+ features" },
  { date: "2026-03-01", title: "IEEE Publication", category: "publication", detail: "RoadIntel: AI-powered Traffic Intelligence published at ICCECE 2026" },
  { date: "2026-07-01", title: "Amazon ML School", category: "achievement", detail: "Selected for Amazon ML Summer School 2026 (Top ~3% applicants)" },
];

const CATEGORY_COLORS: Record<Milestone["category"], string> = {
  education:   "#60a5fa",
  work:        "#34d399",
  achievement: "#fbbf24",
  publication: "#a78bfa",
  project:     "#f472b6",
};

const CATEGORY_ICONS: Record<Milestone["category"], string> = {
  education:   "🎓",
  work:        "💼",
  achievement: "🏆",
  publication: "📄",
  project:     "💻",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const MacOSCalendar = () => {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(2026);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected,  setSelected]  = useState<Milestone | null>(null);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();

  const milestonesInMonth = MILESTONES.filter(m => {
    const d = new Date(m.date);
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
  });

  const getMilestoneForDay = (day: number): Milestone | undefined =>
    MILESTONES.find(m => {
      const d = new Date(m.date);
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day;
    });

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else setViewMonth(m => m + 1); };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}>
        <button onClick={prevMonth} style={navBtnStyle}>‹</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
            {MONTHS[viewMonth]} {viewYear}
          </div>
          {milestonesInMonth.length > 0 && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
              {milestonesInMonth.length} milestone{milestonesInMonth.length > 1 ? "s" : ""} this month
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); }} style={{ ...navBtnStyle, fontSize: 11, padding: "4px 10px", width: "auto" }}>Today</button>
          <button onClick={nextMonth} style={navBtnStyle}>›</button>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Calendar grid */}
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}>
          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, flex: 1 }}>
            {/* Empty cells for first day offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const milestone = getMilestoneForDay(day);
              const todayFlag = isToday(day);

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => milestone && setSelected(selected?.date === milestone.date ? null : milestone)}
                  style={{
                    borderRadius: 8,
                    padding: "6px 4px",
                    background: todayFlag
                      ? "rgba(120,90,255,0.4)"
                      : milestone
                      ? "rgba(255,255,255,0.05)"
                      : "transparent",
                    border: todayFlag
                      ? "2px solid rgba(140,100,255,0.7)"
                      : milestone
                      ? `1px solid ${CATEGORY_COLORS[milestone.category]}30`
                      : "1px solid transparent",
                    cursor: milestone ? "pointer" : "default",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    minHeight: 48,
                    transition: "background 0.1s",
                  }}
                >
                  <span style={{
                    fontSize: 13,
                    fontWeight: todayFlag ? 700 : 400,
                    color: todayFlag ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
                  }}>
                    {day}
                  </span>
                  {milestone && (
                    <div style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: CATEGORY_COLORS[milestone.category],
                      boxShadow: `0 0 6px ${CATEGORY_COLORS[milestone.category]}80`,
                    }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Upcoming sidebar */}
        <div style={{
          width: 200, flexShrink: 0,
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          padding: "16px 12px",
          overflowY: "auto",
        }}
        className="custom-scrollbar"
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            All Milestones
          </div>
          {MILESTONES.map(m => (
            <div
              key={m.date}
              onClick={() => setSelected(selected?.date === m.date ? null : m)}
              style={{
                padding: "8px 10px", borderRadius: 8, marginBottom: 6,
                background: selected?.date === m.date ? "rgba(120,90,255,0.2)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${CATEGORY_COLORS[m.category]}30`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 12 }}>{CATEGORY_ICONS[m.category]}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  {new Date(m.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 500, lineHeight: 1.3 }}>{m.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected milestone detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "14px 20px",
              background: "rgba(0,0,0,0.2)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{CATEGORY_ICONS[selected.category]}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{selected.title}</span>
              <span style={{
                marginLeft: "auto", fontSize: 11,
                color: CATEGORY_COLORS[selected.category],
                background: `${CATEGORY_COLORS[selected.category]}18`,
                border: `1px solid ${CATEGORY_COLORS[selected.category]}40`,
                borderRadius: 20, padding: "2px 8px",
                textTransform: "capitalize",
              }}>
                {selected.category}
              </span>
            </div>
            {selected.detail && (
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{selected.detail}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div style={{
        display: "flex", gap: 12, padding: "8px 20px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        flexShrink: 0, flexWrap: "wrap",
      }}>
        {(Object.entries(CATEGORY_COLORS) as [Milestone["category"], string][]).map(([cat, color]) => (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "capitalize" }}>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const navBtnStyle: React.CSSProperties = {
  width: 30, height: 30, borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.07)",
  color: "rgba(255,255,255,0.7)",
  cursor: "pointer", fontSize: 16,
  display: "flex", alignItems: "center", justifyContent: "center",
};

export default MacOSCalendar;
