import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background Aurora just for the welcome screen */}
      <div className="absolute inset-0 bg-aurora opacity-50 mix-blend-screen" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="text-xs font-mono text-purple-400 mb-6 tracking-[0.3em] uppercase">
            Interactive Experience
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tighter text-white mb-2">
            Naman Jain
          </h1>
          <div className="h-px w-0 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mt-6 mb-4 animate-[expandLine_1.5s_ease-out_forwards]" />
          <p className="text-white/40 font-light tracking-widest uppercase text-sm md:text-base">
            Cyber Security & Full-Stack
          </p>
        </motion.div>

        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/30"
        >
          {/* Button Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          
          <span className="relative z-10 flex items-center gap-3 text-white/80 group-hover:text-white font-mono text-sm uppercase tracking-wider transition-colors">
            Enter Portfolio
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
