import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Github, Linkedin, Code2, ArrowRight, Terminal, Award, Briefcase, FileCode2, Mail } from "lucide-react";
import Projects from "./Projects";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Certifications";
import Contact from "./Contact";

type WidgetId = 'experience' | 'projects' | 'skills' | 'achievements' | 'socials' | null;

// SpotlightCard — the layoutId is on a thin background shard INSIDE, not the whole card.
// This means the morph animation is done on a simple empty shape (cheap), not the full card DOM tree.
const SpotlightCard = ({ children, className, widgetId, onClick, delay, isImage = false }: {
  children: React.ReactNode;
  className: string;
  widgetId?: WidgetId;
  onClick?: () => void;
  delay: number;
  isImage?: boolean;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
      className={`relative overflow-hidden premium-card-glass group cursor-pointer border border-white/[0.08] hover:border-white/20 transition-colors shadow-2xl ${className}`}
    >
      {/* The morph shard — layoutId lives here, on an empty box. Zero lag on exit. */}
      {widgetId && (
        <motion.div
          layoutId={`shard-${widgetId}`}
          className="absolute inset-0 rounded-[inherit] bg-transparent"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.08), transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className={`relative z-20 w-full h-full ${!isImage ? 'group-hover:scale-[1.02]' : ''} transition-transform duration-500 ease-out`}>
        {children}
      </div>
    </motion.div>
  );
};

const BentoGrid = () => {
  const [activeWidget, setActiveWidget] = useState<WidgetId>(null);

  const renderExpandedWidget = () => {
    switch (activeWidget) {
      case 'projects':     return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Projects /></div>;
      case 'experience':   return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Experience /></div>;
      case 'skills':       return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Skills /></div>;
      case 'achievements': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Achievements /></div>;
      case 'socials':      return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Contact /></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-[130px] lg:auto-rows-[140px]">

          {/* --- IMAGE PILL (row 1-2, col 1) --- */}
          <SpotlightCard delay={0.1} isImage className="hidden md:block md:col-span-1 md:row-span-2 rounded-[100px] !border-none !p-0">
            <img src="/profile.jpg" alt="Naman Jain" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 rounded-[100px] ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all pointer-events-none" />
          </SpotlightCard>

          {/* Mobile Image */}
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="md:hidden w-32 h-32 mx-auto rounded-full overflow-hidden border border-white/20 mb-4">
            <img src="/profile.jpg" alt="Naman" className="w-full h-full object-cover" />
          </motion.div>

          {/* --- INTRO TEXT (row 1-2, col 2-3) --- */}
          <SpotlightCard delay={0.2} className="md:col-span-2 md:row-span-2 rounded-[2.5rem] p-6 flex flex-col justify-between">
            <div className="relative z-10 flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[10px] font-medium text-white/80 tracking-wide uppercase">Open to Opportunities</span>
              </div>
              <a href="/Naman_Resume.pdf" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.1] transition-all border border-white/[0.05] hover:scale-110">
                <FileCode2 className="w-4 h-4 text-white/70" />
              </a>
            </div>
            <div className="relative z-10 mt-auto">
              <h1 className="text-3xl lg:text-4xl font-display font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">Naman Jain</h1>
              <p className="text-white/60 font-medium text-xs lg:text-sm max-w-sm leading-relaxed mb-4">Cyber Security undergrad & Full-Stack Developer building intelligent systems.</p>
              <div className="flex gap-2">
                <span className="text-[10px] lg:text-xs font-mono px-2 py-1 lg:px-3 lg:py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 shadow-inner">9.07 CGPA</span>
                <span className="text-[10px] lg:text-xs font-mono px-2 py-1 lg:px-3 lg:py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 shadow-inner">300+ LeetCode</span>
              </div>
            </div>
          </SpotlightCard>

          {/* --- MAP (row 1, col 4) --- */}
          <SpotlightCard delay={0.3} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] p-5 flex flex-col items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px]" />
            <div className="relative z-10 flex flex-col items-center group-hover:-translate-y-1 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <MapPin className="w-4 h-4 text-blue-400 animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
              <span className="text-xs font-medium text-white/90">Bangalore</span>
            </div>
          </SpotlightCard>

          {/* --- EXPERIENCE (row 1, col 5) --- */}
          <SpotlightCard widgetId="experience" onClick={() => setActiveWidget('experience')} delay={0.4} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] p-5 flex flex-col justify-center hover:border-purple-500/30">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"><ArrowRight className="w-3 h-3 text-purple-400" /></div>
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-2 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.15)]"><Briefcase className="w-3.5 h-3.5 text-purple-400" /></div>
            <h3 className="text-sm font-display font-bold text-white/90">Experience</h3>
            <p className="text-[10px] text-white/50 mt-1">HPE, MSRIT...</p>
          </SpotlightCard>

          {/* --- ACHIEVEMENTS (row 2, col 4) --- */}
          <SpotlightCard widgetId="achievements" onClick={() => setActiveWidget('achievements')} delay={0.5} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] p-5 flex flex-col justify-center hover:border-yellow-500/30">
            <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 mb-2 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(234,179,8,0.15)]"><Award className="w-3.5 h-3.5 text-yellow-400" /></div>
            <h3 className="text-sm font-display font-bold text-white/90">Awards</h3>
            <p className="text-[10px] text-white/50 mt-1">Amazon ML, IEEE</p>
          </SpotlightCard>

          {/* --- CONNECT / SOCIALS (row 2, col 5) --- */}
          <SpotlightCard widgetId="socials" onClick={() => setActiveWidget('socials')} delay={0.6} className="md:col-span-1 md:row-span-1 rounded-[2.5rem] p-5 flex flex-col items-center justify-center hover:border-white/30">
            <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-3">Connect</span>
            <div className="flex gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors group-hover:-translate-y-1"><Github className="w-3.5 h-3.5 text-white/70" /></div>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors group-hover:-translate-y-1 delay-75"><Linkedin className="w-3.5 h-3.5 text-white/70" /></div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-yellow-500/20 transition-colors"><Code2 className="w-3.5 h-3.5 text-white/70" /></div>
              <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-red-500/20 transition-colors"><Mail className="w-3.5 h-3.5 text-white/70" /></div>
            </div>
          </SpotlightCard>

          {/* --- PROJECTS (row 3-4, col 1-3) --- */}
          <SpotlightCard widgetId="projects" onClick={() => setActiveWidget('projects')} delay={0.7} className="md:col-span-3 md:row-span-2 rounded-[2.5rem] p-6 lg:p-8 flex flex-col hover:border-cyan-500/30">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"><ArrowRight className="w-5 h-5 text-cyan-400" /></div>
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-4 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.15)]"><Terminal className="w-5 h-5 text-cyan-400" /></div>
            <div className="group-hover:-translate-y-1 transition-transform">
              <h3 className="text-2xl lg:text-3xl font-display font-bold text-white/90 mb-2 group-hover:text-cyan-300 transition-colors">Featured Work</h3>
              <p className="text-xs lg:text-sm text-white/50 max-w-md leading-relaxed">Explore recent projects spanning Explainable AI, Medical Tourism, and Traffic Intelligence.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['XTI-SOC', 'RoadIntel', 'HealTrip'].map((tag, i) => (
                <div key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[10px] lg:text-xs font-mono text-white/70 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-colors" style={{ transitionDelay: `${i * 60}ms` }}>{tag}</div>
              ))}
            </div>
          </SpotlightCard>

          {/* --- SKILLS (row 3-4, col 4-5) --- */}
          <SpotlightCard widgetId="skills" onClick={() => setActiveWidget('skills')} delay={0.8} className="md:col-span-2 md:row-span-2 rounded-[2.5rem] p-6 lg:p-8 hover:border-emerald-500/30 flex flex-col justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-display font-bold text-white/90 mb-1 group-hover:text-emerald-300 transition-colors">Tech Stack</h3>
              <p className="text-xs text-white/50">Languages, Frameworks & Tools</p>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-auto">
              {['react/react-original.svg', 'python/python-original.svg', 'nodejs/nodejs-original.svg', 'typescript/typescript-original.svg'].map(icon => (
                <div key={icon} className="aspect-square rounded-2xl bg-[#1e1e1e] border border-white/5 flex items-center justify-center shadow-lg group-hover:-translate-y-1 transition-transform">
                  <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} className="w-6 h-6 lg:w-8 lg:h-8" alt="tech" />
                </div>
              ))}
            </div>
          </SpotlightCard>

        </div>
      </div>

      {/* Modal Overlay — layoutId lives here on the panel itself, matched with shard-{id} in the card */}
      <AnimatePresence>
        {activeWidget && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#030712]/80 backdrop-blur-xl"
            onClick={() => setActiveWidget(null)}
          >
            <motion.div
              layoutId={`shard-${activeWidget}`}
              className="w-full max-w-5xl max-h-[90vh] h-full border border-white/20 rounded-[2rem] overflow-hidden flex flex-col relative bg-[#0a0f1c]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
              // Tune the spring for snappier close
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              <button
                onClick={() => setActiveWidget(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 hover:scale-110 hover:rotate-90"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="flex-1 overflow-hidden relative">
                {renderExpandedWidget()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BentoGrid;
