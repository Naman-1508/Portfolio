import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  const finalName = "NAMAN JAIN";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const [scrambledName, setScrambledName] = useState("##########");

  useEffect(() => {
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

      if (iteration >= finalName.length) {
        clearInterval(interval);
      }
      iteration += 1 / 4; // Controls speed of unscrambling
    }, 40);

    return () => clearInterval(interval);
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
      
      {/* Background Aurora just for the welcome screen */}
      <div className="absolute inset-0 bg-aurora opacity-30 mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-xs md:text-sm font-mono text-purple-400 mb-6 tracking-[0.4em] uppercase opacity-80">
            System Initialization
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter text-white mb-2 font-mono">
            {scrambledName}
          </h1>
          
          <div className="h-px w-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mt-8 mb-6 animate-[expandLine_1.5s_ease-out_forwards_0.5s]" />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-white/40 font-light tracking-[0.2em] uppercase text-sm md:text-base flex items-center justify-center gap-4"
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
          transition={{ delay: 2, duration: 0.6 }}
          className="group relative px-10 py-4 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl rounded-full overflow-hidden transition-all duration-500 border border-white/10 hover:border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0)] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
          {/* Button Hover Glow */}
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
