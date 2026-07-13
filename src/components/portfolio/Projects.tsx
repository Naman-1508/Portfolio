import { useEffect, useRef } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "XTI-SOC",
    subtitle: "Explainable AI Security Operations Framework",
    year: "2026",
    description: "Lab-scale SOC framework integrating real-time packet capture, ML-based intrusion detection, and explainable AI trained on 9.7M+ labeled network flows from CICIDS2018. Engineered a dual-pipeline XGBoost classifier achieving 0.83 ROC-AUC and implemented SHAP TreeExplainer to generate per-alert feature importance for forensic insights.",
    tags: ["Python", "FastAPI", "Next.js", "React (TS)", "XGBoost", "SHAP", "Scapy", "SQLite", "WebSocket"],
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
    tags: ["React", "Node.js", "MongoDB", "FastAPI", "Scikit-learn", "Razorpay", "Stripe"],
    github: "https://github.com/Naman-1508/HealTrip",
    live: "#", // Assuming there is a live demo as per resume, keeping placeholder
  },
];

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
    <section id="projects" ref={sectionRef} className="py-24 px-6 relative border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Work</h2>
            <p className="text-white/50 text-lg max-w-2xl">
              Systems, platforms, and intelligent frameworks I've built.
            </p>
          </div>
          <a
            href="https://github.com/Naman-1508"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            View all on GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="premium-card p-6 reveal flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs text-white/30">{project.year}</span>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-white transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white/90 mb-1">{project.title}</h3>
              <p className="text-sm font-medium text-white/50 mb-4">{project.subtitle}</p>
              
              <p className="text-sm text-white/60 leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="premium-tag text-[11px] px-2 py-1 bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
