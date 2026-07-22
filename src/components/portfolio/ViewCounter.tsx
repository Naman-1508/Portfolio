import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ViewCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // counterapi.dev — free serverless hit counter (replacement for countapi.xyz)
    // No database or signup required — increments on every page load
    fetch("https://api.counterapi.dev/v1/naman-jain-portfolio/views/up")
      .then((r) => r.json())
      .then((data) => {
        // counterapi.dev returns { count: N }
        const val = data?.count ?? data?.value ?? null;
        setCount(typeof val === "number" ? val : null);
        setLoading(false);
      })
      .catch(() => {
        // Fallback: track locally via localStorage so at least something shows
        try {
          const stored = parseInt(localStorage.getItem("pf_views") ?? "0", 10);
          const next = stored + 1;
          localStorage.setItem("pf_views", String(next));
          setCount(next);
        } catch {
          setCount(null);
        }
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      style={{
        position: "absolute",
        top: 16,
        right: 240, // left of the icon grid
        width: 160,
        borderRadius: 16,
        overflow: "hidden",
        userSelect: "none",
        background: "rgba(255, 214, 100, 0.12)",
        border: "1px solid rgba(255, 214, 100, 0.25)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      {/* Sticky note top stripe */}
      <div
        className="h-5 w-full flex items-center px-3 gap-1.5"
        style={{ background: "rgba(255, 200, 50, 0.2)" }}
      >
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-1 text-[9px] text-yellow-200/60 font-mono tracking-wider">STATS</span>
      </div>

      <div className="p-3">
        <p className="text-[10px] text-yellow-200/60 font-mono uppercase tracking-widest mb-1">
          👁  Portfolio Views
        </p>
        {loading ? (
          <div className="flex gap-1 mt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-yellow-300/40 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : count !== null ? (
          <div>
            <motion.p
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-yellow-200 leading-none"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {count.toLocaleString()}
            </motion.p>
            <p className="text-[9px] text-yellow-200/40 font-mono mt-1">total visits</p>
          </div>
        ) : (
          <p className="text-xs text-yellow-200/50 font-mono mt-1">offline</p>
        )}

        <div className="mt-3 pt-2 border-t border-yellow-200/10">
          <p className="text-[9px] text-yellow-200/30 font-mono leading-relaxed">
            You are visitor #{count ?? "—"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ViewCounter;
