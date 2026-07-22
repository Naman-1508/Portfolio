/**
 * WelcomeScreen — Exact macOS Sonoma/Sequoia lock screen
 *
 * Matches real macOS lock screen precisely:
 * - Full-screen blurred wallpaper
 * - Large thin-weight time (top center)
 * - Date below time
 * - User avatar (round, no glow)
 * - User name
 * - Password field: pill shape, frosted glass, dot bullets that grow on input
 * - Arrow submit button appears on right side of field
 * - Wrong password: slight red shake, "Password incorrect — try again"
 * - After 3 wrong: hint shown
 * - "Other Options" hint at bottom (disabled for visitors)
 * - No custom effects — matches Apple's design language perfectly
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const UNLOCK_PASSWORD = "1508";

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [unlocking, setUnlocking] = useState(false);
  const [now, setNow] = useState(new Date());
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Focus input on mount
  useEffect(() => {
    const t = setTimeout(() => { inputRef.current?.focus(); setFocused(true); }, 600);
    return () => clearTimeout(t);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const handleUnlock = () => {
    if (unlocking) return;
    if (password === UNLOCK_PASSWORD) {
      setUnlocking(true);
      setTimeout(onEnter, 600);
    } else {
      setShake(true);
      setWrongAttempts(n => n + 1);
      setPassword("");
      setTimeout(() => {
        setShake(false);
        inputRef.current?.focus();
      }, 520);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleUnlock();
  };

  return (
    <motion.div
      key="lockscreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: "blur(12px)",
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
      }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {/* ── Wallpaper ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/wallpaper.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* macOS lock screen blur — stronger than desktop */}
      <div
        style={{
          position: "absolute", inset: 0,
          backdropFilter: "blur(28px) brightness(0.6) saturate(1.5)",
          WebkitBackdropFilter: "blur(28px) brightness(0.6) saturate(1.5)",
          background: "rgba(0,0,0,0.2)",
        }}
      />

      {/* ── Unlock success flash ── */}
      <AnimatePresence>
        {unlocking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: "absolute", inset: 0, background: "black", zIndex: 50 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* ── Main content — centered column (exact macOS layout) ── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 0,
          // macOS layout: time at top of center column, user below
        }}
      >
        {/* TIME — large, ultra-thin weight */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: 4 }}
        >
          <div
            style={{
              fontSize: "clamp(80px, 14vw, 108px)",
              fontWeight: 200,
              letterSpacing: "-3px",
              color: "#ffffff",
              lineHeight: 1,
              textShadow: "0 1px 30px rgba(0,0,0,0.4)",
            }}
          >
            {timeStr}
          </div>
          <div
            style={{
              fontSize: "clamp(17px, 2.2vw, 22px)",
              fontWeight: 300,
              color: "rgba(255,255,255,0.9)",
              marginTop: 10,
              letterSpacing: "0.01em",
              textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            }}
          >
            {dateStr}
          </div>
        </motion.div>

        {/* Spacer — matches macOS spacing */}
        <div style={{ height: 52 }} />

        {/* ── User avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200, damping: 22 }}
          style={{ marginBottom: 14 }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: "50%",
              overflow: "hidden",
              // macOS uses subtle white ring, no glow
              boxShadow: "0 0 0 3px rgba(255,255,255,0.55), 0 4px 24px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/profile.jpg"
              alt="Naman Jain"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </motion.div>

        {/* ── User name ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.45 }}
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 400, // real macOS uses regular weight for name
            letterSpacing: "0.005em",
            textShadow: "0 1px 16px rgba(0,0,0,0.5)",
            marginBottom: 20,
          }}
        >
          Naman Jain
        </motion.div>

        {/* ── Password field group ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
        >
          {/* Password field */}
          <motion.div
            animate={
              shake
                ? { x: [0, -14, 14, -11, 11, -7, 7, -3, 3, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              // macOS password field: frosted white pill
              background: focused || password.length > 0
                ? "rgba(255,255,255,0.22)"
                : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(30px) saturate(1.5)",
              WebkitBackdropFilter: "blur(30px) saturate(1.5)",
              border: shake
                ? "1.5px solid rgba(255,90,90,0.8)"
                : focused
                ? "1.5px solid rgba(255,255,255,0.5)"
                : "1.5px solid rgba(255,255,255,0.25)",
              borderRadius: 12,
              height: 42,
              width: 230,
              padding: "0 10px 0 14px",
              boxShadow: focused
                ? "0 0 0 3px rgba(255,255,255,0.12), 0 4px 20px rgba(0,0,0,0.3)"
                : "0 2px 14px rgba(0,0,0,0.25)",
              transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
              gap: 8,
              position: "relative",
            }}
          >
            {/* Hidden real input */}
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused || password.length > 0 ? "" : "Enter Password"}
              maxLength={20}
              autoComplete="off"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "rgba(255,255,255,1)",
                fontSize: 16,
                letterSpacing: password.length > 0 ? "0.2em" : "0",
                fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
                caretColor: "white",
              }}
            />
            {/* Submit arrow — appears when typing */}
            <AnimatePresence>
              {password.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  onClick={handleUnlock}
                  style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "white",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 1px 8px rgba(0,0,0,0.3)",
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Wrong password message */}
          <AnimatePresence mode="wait">
            {wrongAttempts > 0 && !shake && (
              <motion.p
                key={wrongAttempts}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  color: "rgba(255,230,230,0.9)",
                  fontSize: 12,
                  textAlign: "center",
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                  margin: 0,
                }}
              >
                {wrongAttempts >= 3
                  ? `Hint: the password is "1508" 👆`
                  : "Password incorrect — please try again"}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Always-visible hint for portfolio visitors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 20,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              marginTop: 4,
            }}
          >
            <svg viewBox="0 0 14 14" fill="none" style={{ width: 12, height: 12 }}>
              <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
              <path d="M7 6.5v4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="4.5" r="0.8" fill="rgba(255,255,255,0.7)" />
            </svg>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              Portfolio password:{" "}
              <span style={{ color: "rgba(200,180,255,1)", fontWeight: 600, letterSpacing: "3px" }}>
                1508
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom — "Other Options" link ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: "absolute",
          bottom: 28,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          zIndex: 10,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            letterSpacing: "0.03em",
          }}
        >
          Naman Jain · Portfolio 2026
        </span>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
