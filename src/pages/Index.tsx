import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MacOSBoot from "@/components/portfolio/MacOSBoot";
import WelcomeScreen from "@/components/portfolio/WelcomeScreen";
import MacOSDesktop from "@/components/portfolio/MacOSDesktop";

type Phase = "boot" | "lock" | "desktop" | "shutdown" | "restart";

// ── Shutdown Screen ──────────────────────────────────────────────────────────
const ShutdownScreen = ({ onDone, mode }: { onDone: () => void; mode: "shutdown" | "restart" }) => {
  // After 2.5 seconds, trigger onDone
  useState(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "#000000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 24,
        fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
      }}
    >
      {mode === "restart" && (
        <>
          {/* Apple logo for restart */}
          <svg viewBox="0 0 384 512" fill="white" style={{ width: 48, height: 60, opacity: 0.7 }}>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, letterSpacing: 1 }}>
            Restarting…
          </div>
          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              width: 24, height: 24,
              border: "2.5px solid rgba(255,255,255,0.15)",
              borderTopColor: "rgba(255,255,255,0.7)",
              borderRadius: "50%",
            }}
          />
        </>
      )}
      {mode === "shutdown" && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.8, 0.5, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}
        >
          {/* Just black — no text on shutdown like real macOS */}
        </motion.div>
      )}
    </motion.div>
  );
};

const Index = () => {
  const [phase, setPhase] = useState<Phase>("boot");

  const handleShutdown = useCallback(() => {
    setPhase("shutdown");
    // After 2.5 seconds just stay black — simulate real shutdown
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("restart");
    // After 2.5s, re-run the boot sequence
    setTimeout(() => setPhase("boot"), 2500);
  }, []);

  return (
    <>
      {/* Fixed aurora background */}
      <div className="bg-aurora" />

      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <MacOSBoot
            key="boot"
            onBootComplete={() => setPhase("lock")}
          />
        )}

        {phase === "lock" && (
          <WelcomeScreen
            key="lock"
            onEnter={() => setPhase("desktop")}
          />
        )}

        {phase === "desktop" && (
          <MacOSDesktop
            key="desktop"
            onShutdown={handleShutdown}
            onRestart={handleRestart}
          />
        )}

        {(phase === "shutdown" || phase === "restart") && (
          <ShutdownScreen
            key="shutdown"
            mode={phase as "shutdown" | "restart"}
            onDone={() => {}} // stays black on shutdown, re-boots on restart
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
