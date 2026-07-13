import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const bootLogs = [
  "Initialize core systems...",
  "Loading encryption modules...",
  "Establishing secure connection...",
  "Bypassing mainframe protocols...",
  "Access granted. Welcome, Admin."
];

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const finalName = "NAMAN JAIN";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const [scrambledName, setScrambledName] = useState("##########");
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    // Hacker Scramble Effect
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambledName(
        finalName
          .split("")
          .map((letter, index) => {
            if (index < iteration) return finalName[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= finalName.length) clearInterval(interval);
      iteration += 1 / 4; 
    }, 40);

    // Boot sequence logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setVisibleLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
      <div className="absolute inset-0 bg-aurora opacity-30 mix-blend-screen" />

      {/* Terminal Boot Sequence (Left Side) */}
      <div className="absolute left-8 top-8 hidden lg:flex flex-col gap-2 font-mono text-[10px] text-cyan-500/70 opacity-80 z-20">
        {visibleLogs.map((log, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <span className="text-white/30">{`[${(new Date()).toISOString().substring(11,19)}]`}</span>
            <span>{log}</span>
          </motion.div>
        ))}
        {visibleLogs.length === bootLogs.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { repeat: Infinity, duration: 1 } }} className="w-2 h-3 bg-cyan-500 mt-1" />
        )}
      </div>

      {/* Abstract Rotating Geometry (Right Side) */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-10vw] top-[10vh] w-[40vw] h-[40vw] rounded-full border border-white/5 border-dashed opacity-30 hidden lg:block"
      />
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-5vw] top-[20vh] w-[20vw] h-[20vw] rounded-full border border-cyan-500/10 opacity-30 hidden lg:block"
      />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-mono text-purple-400 mb-6 tracking-[0.4em] uppercase opacity-80">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            System Initialization
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-white mb-2 font-mono drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {scrambledName}
          </h1>
          
          <div className="h-px w-0 bg-gradient-to-r from-transparent via-cyan-500/80 to-transparent mx-auto mt-8 mb-6 animate-[expandLine_1.5s_ease-out_forwards_0.5s] shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-white/50 font-light tracking-[0.3em] uppercase text-sm md:text-base flex items-center justify-center gap-4"
          >
            <span>Cyber Security</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
            <span>Full-Stack</span>
          </motion.p>
        </motion.div>

        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="group relative px-10 py-4 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl rounded-full overflow-hidden transition-all duration-500 border border-white/10 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 flex items-center gap-3 text-white/70 group-hover:text-white font-mono text-sm uppercase tracking-wider transition-colors">
            Decrypt & Enter
            <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.button>
      </div>

      <style>{`
        @keyframes expandLine {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </motion.div>
  );
};

export default WelcomeScreen;
