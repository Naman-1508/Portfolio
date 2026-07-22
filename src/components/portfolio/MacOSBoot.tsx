import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface MacOSBootProps {
  onBootComplete: () => void;
}

/* ── Pixel-perfect Apple Logo (Font Awesome fa-apple path, viewBox 0 0 384 512) ── */
const AppleLogo = () => (
  <svg
    viewBox="0 0 384 512"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 56, height: 68, display: "block" }}
  >
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const MacOSBoot = ({ onBootComplete }: MacOSBootProps) => {
  const [showBar, setShowBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    // Phase 1: Show logo, then reveal bar after 1.2s
    const t1 = setTimeout(() => setShowBar(true), 1200);

    // Phase 2: Animate progress bar in steps that mimic real macOS pacing
    const segments = [
      { to: 20, ms: 400 },
      { to: 45, ms: 700 },
      { to: 60, ms: 400 },
      { to: 78, ms: 600 },
      { to: 90, ms: 350 },
      { to: 96, ms: 280 },
      { to: 100, ms: 200 },
    ];

    let elapsed = 1200; // starts after logo delay
    const ids: ReturnType<typeof setTimeout>[] = [t1];

    segments.forEach(({ to, ms }) => {
      const startAt = elapsed;
      const steps = 30;
      const stepMs = ms / steps;
      for (let i = 1; i <= steps; i++) {
        const id = setTimeout(() => {
          const from = progressRef.current;
          const next = from + (to - from) * (i / steps);
          progressRef.current = next;
          setProgress(next);
        }, startAt + stepMs * i);
        ids.push(id);
      }
      elapsed += ms;
    });

    // Phase 3: Complete and transition out
    const done = setTimeout(() => {
      onBootComplete();
    }, elapsed + 300);
    ids.push(done);

    return () => ids.forEach(clearTimeout);
  }, [onBootComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200]"
      style={{ backgroundColor: "#000000" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      {/* Perfect center of screen */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Apple Logo — fades in */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <AppleLogo />
        </motion.div>

        {/* Loading bar — appears below logo with spacing */}
        <AnimatePresence>
          {showBar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{ marginTop: 48, width: 200 }}
            >
              {/* macOS thin progress track */}
              <div
                style={{
                  width: "100%",
                  height: 4,
                  borderRadius: 9999,
                  backgroundColor: "rgba(255,255,255,0.18)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progress}%`,
                    borderRadius: 9999,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    transition: "width 0.04s linear",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MacOSBoot;
