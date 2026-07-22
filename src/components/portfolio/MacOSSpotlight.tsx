/**
 * MacOSSpotlight — System-wide search (⌘ + Space)
 *
 * Features:
 * - Frosted glass centered overlay
 * - Instant fuzzy search across all portfolio content
 * - Keyboard navigation (↑↓ arrows, Enter, Escape)
 * - Category grouping (Apps, Projects, Skills, People)
 * - Smooth spring animations
 * - Click result → opens related window
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SpotlightResult {
  id: string;
  label: string;
  subtitle?: string;
  category: string;
  icon: string;
  action: () => void;
}

interface MacOSSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  results: SpotlightResult[];
  onSearch: (q: string) => SpotlightResult[];
}

const MacOSSpotlight = ({ isOpen, onClose, onSearch }: MacOSSpotlightProps) => {
  const [query, setQuery]         = useState("");
  const [results, setResults]     = useState<SpotlightResult[]>([]);
  const [selected, setSelected]   = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length === 0) { setResults([]); return; }
    setResults(onSearch(query));
    setSelected(0);
  }, [query, onSearch]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape")    { onClose(); return; }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && results[selected]) {
      results[selected].action();
      onClose();
    }
  }, [results, selected, onClose]);

  // Group results by category
  const grouped = results.reduce<Record<string, SpotlightResult[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  let flatIndex = 0; // for tracking selected index across groups

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              zIndex: 99990,
            }}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={{   opacity: 0, scale: 0.94, y: -20  }}
            transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.7 }}
            style={{
              position: "fixed",
              top:      results.length > 0 ? "22%" : "32%",
              left:     "50%",
              transform: "translateX(-50%)",
              width:    "min(640px, calc(100vw - 40px))",
              zIndex:   99991,
              borderRadius: results.length > 0 ? 16 : 16,
              overflow: "hidden",
              background: "rgba(36, 24, 60, 0.82)",
              backdropFilter: "blur(60px) saturate(2.2)",
              WebkitBackdropFilter: "blur(60px) saturate(2.2)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 0 0.5px rgba(255,255,255,0.06)",
              transition: "top 0.3s cubic-bezier(0.2,0.8,0.2,1)",
            }}
          >
            {/* Search input row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              height: 56,
              gap: 12,
              borderBottom: results.length > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              {/* Search icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.2"
                style={{ width: 20, height: 20, flexShrink: 0 }}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>

              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Spotlight Search"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 20,
                  fontWeight: 300,
                  fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              />

              {query && (
                <button
                  onClick={() => setQuery("")}
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    borderRadius: "50%",
                    width: 20, height: 20,
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 11,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >✕</button>
              )}
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div style={{
                maxHeight: 420,
                overflowY: "auto",
                padding: "6px 0 8px",
              }}
              className="custom-scrollbar"
              >
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    {/* Category header */}
                    <div style={{
                      padding: "6px 18px 3px",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                    }}>
                      {category}
                    </div>
                    {items.map((r) => {
                      const idx = flatIndex++;
                      const isSelected = idx === selected;
                      return (
                        <div
                          key={r.id}
                          onClick={() => { r.action(); onClose(); }}
                          onMouseEnter={() => setSelected(idx)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            padding: "7px 18px",
                            cursor: "default",
                            borderRadius: 8,
                            margin: "1px 6px",
                            background: isSelected ? "rgba(120,90,255,0.32)" : "transparent",
                            transition: "background 0.1s",
                          }}
                        >
                          <div style={{
                            width: 32, height: 32,
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.08)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 18, flexShrink: 0,
                          }}>
                            {r.icon}
                          </div>
                          <div>
                            <div style={{
                              fontSize: 13, fontWeight: 500,
                              color: "rgba(255,255,255,0.9)",
                              fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                            }}>
                              {r.label}
                            </div>
                            {r.subtitle && (
                              <div style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.4)",
                                fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                                marginTop: 1,
                              }}>
                                {r.subtitle}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <div style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                              ↩ Open
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {query.trim().length > 0 && results.length === 0 && (
              <div style={{
                padding: "28px 18px",
                textAlign: "center",
                color: "rgba(255,255,255,0.3)",
                fontSize: 14,
                fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
              }}>
                No results for "<span style={{ color: "rgba(255,255,255,0.5)" }}>{query}</span>"
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MacOSSpotlight;
