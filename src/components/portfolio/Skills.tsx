import { useEffect, useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    ]
  },
  {
    title: "Full Stack",
    skills: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
      { name: "Dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    // Add mouse tracking for the cards
    const cards = document.querySelectorAll(".premium-card");
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      cards.forEach(card => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-8 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <p className="text-white/50 text-lg">Languages, frameworks, and core tools.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <div key={category.title} className="premium-card p-6 reveal">
              <h3 className="font-semibold text-white/90 mb-6 text-lg">{category.title}</h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:scale-105 transition-all duration-300 group cursor-default"
                  >
                    <div className="w-8 h-8 flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl transition-all">
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-white/40 group-hover:text-white/80 transition-colors text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Non-logo skills (Core CS & Security) */}
        <div className="mt-8 premium-card p-6 reveal flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex-1">
             <h3 className="font-semibold text-white/90 mb-3">Core CS & Security</h3>
             <p className="text-sm text-white/50 leading-relaxed">
               Deep understanding of Data Structures & Algorithms, Operating Systems, Computer Networks, DBMS, and Cryptography. Experienced with packet analysis tools like Scapy and NFStream.
             </p>
           </div>
           <div className="flex flex-wrap gap-2 md:max-w-sm justify-end">
             {["Data Structures", "Algorithms", "OS", "Networks", "DBMS", "Cryptography", "Scapy", "NFStream"].map((t) => (
               <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.1] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors cursor-default">
                 {t}
               </span>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
