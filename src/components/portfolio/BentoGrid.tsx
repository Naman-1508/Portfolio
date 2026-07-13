import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Github, Linkedin, Code2, Mail, ArrowRight, Terminal, Award, Briefcase, FileCode2 } from "lucide-react";
import Projects from "./Projects";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Certifications";
import Contact from "./Contact";

// Define the widgets we have
type WidgetId = 'profile' | 'map' | 'socials' | 'experience' | 'projects' | 'skills' | 'achievements' | null;

const BentoGrid = () => {
  const [activeWidget, setActiveWidget] = useState<WidgetId>(null);

  // Helper to render the expanded view based on active widget
  const renderExpandedWidget = () => {
    switch (activeWidget) {
      case 'projects': return <div className="p-8 h-full overflow-y-auto custom-scrollbar"><Projects /></div>;
      case 'experience': return <div className="p-8 h-full overflow-y-auto custom-scrollbar"><Experience /></div>;
      case 'skills': return <div className="p-8 h-full overflow-y-auto custom-scrollbar"><Skills /></div>;
      case 'achievements': return <div className="p-8 h-full overflow-y-auto custom-scrollbar"><Achievements /></div>;
      case 'socials': return <div className="p-8 h-full overflow-y-auto custom-scrollbar"><Contact /></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-aurora text-white p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Background handles Aurora via index.css */}

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
          
          {/* 1. Profile Widget (Large) */}
          <motion.div 
            layoutId="profile"
            className="md:col-span-2 md:row-span-2 premium-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/profile.jpg" 
                 alt="Naman Jain" 
                 className="w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay grayscale group-hover:grayscale-0"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent" />
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-white/80 tracking-wide uppercase">Available</span>
              </div>
              <a href="/Naman_Resume.pdf" target="_blank" className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] transition-colors border border-white/[0.1]">
                <FileCode2 className="w-4 h-4 text-white/70" />
              </a>
            </div>

            <div className="relative z-10 mt-auto pt-20">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-2">
                Naman Jain
              </h1>
              <p className="text-white/60 font-medium text-sm md:text-base max-w-sm leading-relaxed mb-4">
                Cyber Security undergrad & Full-Stack Developer building intelligent, secure systems.
              </p>
              <div className="flex gap-2">
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-white/50">9.07 CGPA</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-white/50">300+ LeetCode</span>
              </div>
            </div>
          </motion.div>

          {/* 2. Map/Location Widget */}
          <motion.div 
            layoutId="map"
            className="premium-card rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            {/* Minimal Map SVG Background */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white/90">Bangalore</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest mt-1">India</span>
            </div>
          </motion.div>

          {/* 3. Experience Widget (Clickable) */}
          <motion.div 
            layoutId="experience"
            onClick={() => setActiveWidget('experience')}
            className="md:col-span-1 md:row-span-2 premium-card rounded-3xl p-6 cursor-pointer group flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-4 h-4 text-white/50" />
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-auto">
              <Briefcase className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-display font-bold text-white/90 mb-1">Experience</h3>
              <p className="text-xs text-white/50 mb-4">HPE, MSRIT & more</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <div className="text-xs text-white/70 truncate">HPE Intern</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="text-xs text-white/40 truncate">Flutter Dev Intern</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. Socials Widget (Clickable) */}
          <motion.div 
            layoutId="socials"
            onClick={() => setActiveWidget('socials')}
            className="premium-card rounded-3xl p-6 cursor-pointer group flex items-center justify-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-white/[0.1] transition-colors">
              <Github className="w-4 h-4 text-white/70" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-[#0A66C2]/20 transition-colors">
              <Linkedin className="w-4 h-4 text-white/70 group-hover:text-[#0A66C2]" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-yellow-500/20 transition-colors">
              <Code2 className="w-4 h-4 text-white/70 group-hover:text-yellow-500" />
            </div>
          </motion.div>

          {/* 5. Projects Widget (Clickable) */}
          <motion.div 
            layoutId="projects"
            onClick={() => setActiveWidget('projects')}
            className="md:col-span-2 md:row-span-2 premium-card rounded-3xl p-6 cursor-pointer group relative overflow-hidden flex flex-col"
          >
             <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-white/50" />
            </div>
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-white/90 mb-2">Featured Work</h3>
              <p className="text-sm text-white/50 max-w-sm mb-6">Explore my recent projects spanning Explainable AI, Medical Tourism, and Traffic Intelligence.</p>
            </div>
            
            <div className="flex gap-3 mt-auto">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-white/60">XTI-SOC</div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-white/60">RoadIntel</div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-white/60">HealTrip</div>
            </div>
          </motion.div>

          {/* 6. Skills Widget (Clickable) */}
          <motion.div 
            layoutId="skills"
            onClick={() => setActiveWidget('skills')}
            className="md:col-span-2 md:row-span-1 premium-card rounded-3xl p-6 cursor-pointer group relative overflow-hidden"
          >
            <div className="flex justify-between items-center h-full">
              <div>
                <h3 className="text-xl font-display font-bold text-white/90 mb-1">Tech Stack</h3>
                <p className="text-xs text-white/50">Languages, Frameworks & Tools</p>
              </div>
              <div className="flex -space-x-3">
                {/* Tech icons stack */}
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-30">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-5 h-5" alt="React" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-20">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-5 h-5" alt="Python" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-10">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" className="w-5 h-5" alt="Node" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-0 bg-white/[0.05]">
                  <span className="text-[10px] font-mono text-white/50">+12</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 7. Achievements Widget (Clickable) */}
          <motion.div 
            layoutId="achievements"
            onClick={() => setActiveWidget('achievements')}
            className="md:col-span-2 md:row-span-1 premium-card rounded-3xl p-6 cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white/90">Achievements</h3>
                <p className="text-xs text-white/50">Amazon ML Summer School & IEEE Pub</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white/80 transition-colors group-hover:translate-x-1" />
          </motion.div>

        </div>
      </div>

      {/* Expanded Widget Modal Overlay using AnimatePresence */}
      <AnimatePresence>
        {activeWidget && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveWidget(null)}
          >
            <motion.div 
              layoutId={activeWidget}
              className="w-full max-w-5xl h-[85vh] premium-card rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveWidget(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors backdrop-blur-md border border-white/20"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Render the full component inside */}
              {renderExpandedWidget()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BentoGrid;
