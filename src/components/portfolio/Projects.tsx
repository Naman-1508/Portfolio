import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "XTI-SOC",
    subtitle: "Explainable AI Security Operations Framework",
    year: "2026",
    description: "Lab-scale SOC framework integrating real-time packet capture, ML-based intrusion detection, and explainable AI trained on 9.7M+ labeled network flows from CICIDS2018. Engineered a dual-pipeline XGBoost classifier achieving 0.83 ROC-AUC and implemented SHAP TreeExplainer for forensic insights.",
    tags: ["Python", "FastAPI", "React (TS)", "XGBoost", "SHAP", "WebSocket"],
    github: "https://github.com/Naman-1508/XTI-SOC",
    live: null,
  },
  {
    title: "RoadIntel",
    subtitle: "AI Traffic Intelligence Platform",
    year: "2025",
    description: "Geolocated traffic incident reporting platform with real-time geospatial heatmap dashboards using Leaflet. Integrated YOLO-based computer vision for vehicle detection from video streams and Google Gemini API for AI-powered incident severity classification.",
    tags: ["React (TS)", "Node.js", "Express", "MongoDB", "YOLO", "Gemini API", "Leaflet"],
    github: "https://github.com/Naman-1508/RoadIntel",
    live: null,
  },
  {
    title: "HealTrip",
    subtitle: "AI Medical Tourism Platform",
    year: "2025",
    description: "Medical tourism platform connecting international patients with verified hospitals. Built an ML microservice using Scikit-learn and FastAPI for hospital ranking and personalized recommendations; integrated Razorpay and Stripe for secure global payments.",
    tags: ["React", "Node.js", "MongoDB", "FastAPI", "Scikit-learn", "Stripe"],
    github: "https://github.com/Naman-1508/HealTrip",
    live: "#",
  },
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set variables for the glow
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    
    // 3D tilt effect (subtle)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Max 4 deg rotation
    const rotateY = ((x - centerX) / centerX) * 4;
    
    // We add !important via inline style for the 3D transform while hovering, 
    // but the CSS class handles the transition back when we remove it on leave.
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`premium-card p-7 reveal delay-${index * 100} flex flex-col h-full group`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex justify-between items-start mb-5 transform-gpu" style={{ transform: "translateZ(30px)" }}>
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.05]">{project.year}</span>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:scale-110 transition-all"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.1] hover:scale-110 transition-all"
              aria-label="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="transform-gpu" style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-2xl font-display font-bold text-white/95 mb-1.5 group-hover:text-purple-400 transition-colors">{project.title}</h3>
        <p className="text-sm font-medium text-white/50 mb-5">{project.subtitle}</p>
        
        <p className="text-sm text-white/60 leading-relaxed mb-8 flex-1">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto transform-gpu" style={{ transform: "translateZ(10px)" }}>
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-white/50 group-hover:border-white/[0.15] transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Featured Work</h2>
            <p className="text-white/50 text-lg max-w-2xl">
              Systems, platforms, and intelligent frameworks I've built.
            </p>
          </div>
          <a
            href="https://github.com/Naman-1508"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-sm text-white/70 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            View GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 perspective-1000">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
