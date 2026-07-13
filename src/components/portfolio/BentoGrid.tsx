import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Github, Linkedin, Code2, ArrowRight, Terminal, Award, Briefcase, FileCode2 } from "lucide-react";
import Projects from "./Projects";
import Experience from "./Experience";
import Skills from "./Skills";
import Achievements from "./Certifications";
import Contact from "./Contact";

type WidgetId = 'profile' | 'map' | 'socials' | 'experience' | 'projects' | 'skills' | 'achievements' | null;

const BentoGrid = () => {
  const [activeWidget, setActiveWidget] = useState<WidgetId>(null);

  const renderExpandedWidget = () => {
    switch (activeWidget) {
      case 'projects': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Projects /></div>;
      case 'experience': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Experience /></div>;
      case 'skills': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Skills /></div>;
      case 'achievements': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Achievements /></div>;
      case 'socials': return <div className="p-4 md:p-8 h-full overflow-y-auto custom-scrollbar"><Contact /></div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8 flex items-center justify-center relative overflow-hidden pt-24 md:pt-8">
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
          
          {/* 1. Image Pill (Dedicated Vertical Portrait) */}
          <motion.div 
            layoutId="profile-img"
            className="hidden md:block md:col-span-1 md:row-span-2 rounded-[100px] overflow-hidden relative group premium-card-glass shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10"
          >
             <img 
               src="/profile.jpg" 
               alt="Naman Jain" 
               className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60" />
          </motion.div>

          {/* Mobile version of Image (Circle) */}
          <motion.div className="md:hidden w-32 h-32 mx-auto rounded-full overflow-hidden border border-white/20 mb-4">
             <img src="/profile.jpg" alt="Naman" className="w-full h-full object-cover" />
          </motion.div>

          {/* 2. Intro Text Widget */}
          <motion.div 
            layoutId="profile-text"
            className="md:col-span-2 md:row-span-2 premium-card-glass rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-between group relative border border-white/[0.08]"
          >
            <div className="relative z-10 flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-white/80 tracking-wide uppercase">Open to Opportunities</span>
              </div>
              <a href="/Naman_Resume.pdf" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-white/[0.03] hover:bg-white/[0.1] transition-all border border-white/[0.05] group-hover:border-white/[0.2]">
                <FileCode2 className="w-4 h-4 text-white/70" />
              </a>
            </div>

            <div className="relative z-10 mt-auto pt-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-3">
                Naman Jain
              </h1>
              <p className="text-white/60 font-medium text-sm md:text-base max-w-sm leading-relaxed mb-5">
                Cyber Security undergrad & Full-Stack Developer building intelligent, secure systems.
              </p>
              <div className="flex gap-2">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70">9.07 CGPA</span>
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70">300+ LeetCode</span>
              </div>
            </div>
          </motion.div>

          {/* 3. Map Widget (Circular aesthetic) */}
          <motion.div 
            layoutId="map"
            className="md:col-span-1 md:row-span-1 premium-card-glass rounded-full md:rounded-[3rem] p-6 flex flex-col items-center justify-center relative overflow-hidden group border border-white/[0.08]"
          >
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-3 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white/90">Bangalore</span>
            </div>
          </motion.div>

          {/* 4. Experience Widget */}
          <motion.div 
            layoutId="experience"
            onClick={() => setActiveWidget('experience')}
            className="md:col-span-1 md:row-span-1 premium-card-glass rounded-[2rem] p-6 cursor-pointer group flex flex-col justify-center relative border border-white/[0.08] hover:border-purple-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Briefcase className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-display font-bold text-white/90">Experience</h3>
            </div>
            <p className="text-xs text-white/50 pl-14">HPE, MSRIT & more...</p>
          </motion.div>

          {/* 5. Projects Widget */}
          <motion.div 
            layoutId="projects"
            onClick={() => setActiveWidget('projects')}
            className="md:col-span-2 md:row-span-2 premium-card-glass rounded-[2.5rem] p-8 cursor-pointer group relative overflow-hidden flex flex-col border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
          >
             <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
              <Terminal className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-3xl font-display font-bold text-white/90 mb-3 group-hover:text-cyan-300 transition-colors">Featured Work</h3>
              <p className="text-sm text-white/50 max-w-sm mb-6 leading-relaxed">Explore my recent projects spanning Explainable AI, Medical Tourism, and Traffic Intelligence.</p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/70 shadow-inner">XTI-SOC</div>
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/70 shadow-inner">RoadIntel</div>
              <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/70 shadow-inner">HealTrip</div>
            </div>
          </motion.div>

          {/* 6. Skills Widget (Horizontal Pill aesthetic) */}
          <motion.div 
            layoutId="skills"
            onClick={() => setActiveWidget('skills')}
            className="md:col-span-2 md:row-span-1 premium-card-glass rounded-[3rem] p-6 cursor-pointer group relative overflow-hidden border border-white/[0.08] hover:border-white/20 transition-colors"
          >
            <div className="flex justify-between items-center h-full px-2">
              <div>
                <h3 className="text-xl font-display font-bold text-white/90 mb-1">Tech Stack</h3>
                <p className="text-xs text-white/50">Languages, Frameworks & Tools</p>
              </div>
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-30 shadow-lg">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" className="w-6 h-6" alt="React" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-20 shadow-lg">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-6 h-6" alt="Python" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-10 shadow-lg">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" className="w-6 h-6" alt="Node" />
                </div>
                <div className="w-12 h-12 rounded-full bg-[#1e1e1e] border-2 border-[#030712] flex items-center justify-center z-0 bg-white/[0.05] shadow-lg">
                  <span className="text-xs font-mono text-white/50">+12</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 7. Achievements & Socials (Split in one row) */}
          <motion.div 
            layoutId="achievements"
            onClick={() => setActiveWidget('achievements')}
            className="md:col-span-1 md:row-span-1 premium-card-glass rounded-[2rem] p-6 cursor-pointer group flex flex-col justify-center border border-white/[0.08] hover:border-yellow-500/30 transition-colors"
          >
             <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <Award className="w-4 h-4 text-yellow-400" />
              </div>
              <h3 className="text-base font-display font-bold text-white/90">Awards</h3>
            </div>
            <p className="text-xs text-white/50">Amazon ML, IEEE...</p>
          </motion.div>

          <motion.div 
            layoutId="socials"
            onClick={() => setActiveWidget('socials')}
            className="md:col-span-1 md:row-span-1 premium-card-glass rounded-[3rem] p-6 cursor-pointer group flex items-center justify-center gap-3 border border-white/[0.08] hover:border-white/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-white/[0.1]">
              <Github className="w-4 h-4 text-white/70" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-[#0A66C2]/20">
              <Linkedin className="w-4 h-4 text-white/70 group-hover:text-[#0A66C2]" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:bg-green-500/20">
              <Code2 className="w-4 h-4 text-white/70 group-hover:text-green-500" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Expanded Widget Modal Overlay */}
      <AnimatePresence>
        {activeWidget && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#030712]/80"
            onClick={() => setActiveWidget(null)}
          >
            <motion.div 
              layoutId={activeWidget}
              className="w-full max-w-5xl max-h-[90vh] h-full premium-card-glass border border-white/20 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl relative bg-[#0a0f1c]/90"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveWidget(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all backdrop-blur-xl border border-white/20 hover:scale-110"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
