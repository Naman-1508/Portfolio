import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

type Project = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  status: "active" | "done";
  accent: string;
  number: string;
};

const projects: Project[] = [
  {
    title: "RoadIntel",
    subtitle: "Smart Traffic & Accident Platform",
    description:
      "A full-stack traffic intelligence system allowing users to register, report accidents with live details, and track real-time incidents. Built with a secure JWT-authenticated backend and responsive React frontend — ensuring safety awareness at scale.",
    tags: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/Naman-1508/RoadIntel",
    status: "active",
    accent: "hsl(180,100%,50%)",
    number: "01",
  },
  {
    title: "GuardianQuest",
    subtitle: "AI-Powered Platform for Children",
    description:
      "An emotionally intelligent platform using Generative AI to help children in hospitals and orphanages create personalized stories and games — delivering joy, creative expression, and emotional support during challenging times.",
    tags: ["React", "TypeScript", "TailwindCSS", "Node.js", "Express.js", "MongoDB", "JWT", "Gen AI"],
    github: "https://github.com/Naman-1508/GuardianQuest",
    status: "active",
    accent: "hsl(270,100%,65%)",
    number: "02",
  },
  {
    title: "Jarvis",
    subtitle: "AI Virtual Assistant",
    description:
      "A fully customizable AI virtual assistant built in Python, automating everyday tasks through speech recognition and text-to-speech synthesis — your personal Tony Stark experience, fully open-source.",
    tags: ["Python", "Speech Recognition", "TTS", "APIs", "Automation"],
    github: "https://github.com/Naman-1508/Jarvis",
    status: "active",
    accent: "hsl(320,100%,60%)",
    number: "03",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`reveal delay-${index * 150}`}
      style={{
        transition: "transform 0.15s ease, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full rounded-2xl overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? project.accent + "44" : "rgba(255,255,255,0.06)"}`,
          transition: "border-color 0.3s ease",
          boxShadow: hovered ? `0 0 30px ${project.accent}12, 0 20px 60px rgba(0,0,0,0.4)` : "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Top accent bar */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Glow overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${project.accent}08 0%, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        <div className="p-7 flex flex-col h-full relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div
                className="font-mono text-xs mb-1"
                style={{ color: `${project.accent}99`, letterSpacing: "0.15em" }}
              >
                PROJECT_{project.number}
              </div>
              <h3
                className="font-display font-black text-xl mb-0.5"
                style={{
                  color: hovered ? project.accent : "rgba(255,255,255,0.9)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.title}
              </h3>
              <p className="text-white/40 text-xs font-mono">{project.subtitle}</p>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
              style={{
                background: project.status === "active" ? "rgba(0,255,100,0.08)" : "rgba(0,255,255,0.08)",
                border: `1px solid ${project.status === "active" ? "rgba(0,255,100,0.2)" : "rgba(0,255,255,0.2)"}`,
                color: project.status === "active" ? "hsl(150,100%,60%)" : "hsl(180,100%,65%)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: project.status === "active" ? "hsl(150,100%,60%)" : "hsl(180,100%,65%)",
                  boxShadow: `0 0 4px ${project.status === "active" ? "hsl(150,100%,60%)" : "hsl(180,100%,65%)"}`,
                  animation: "pulse-glow 2s ease infinite",
                }}
              />
              {project.status === "active" ? "In Dev" : "Live"}
            </div>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded text-xs font-mono"
                style={{
                  background: `${project.accent}09`,
                  border: `1px solid ${project.accent}22`,
                  color: `${project.accent}cc`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all duration-200"
              style={{
                border: `1px solid ${project.accent}30`,
                color: project.accent,
                background: `${project.accent}07`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${project.accent}15`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${project.accent}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${project.accent}07`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Github className="w-3.5 h-3.5" />
              Source Code
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
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
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* BG decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(128,0,255,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-4 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(128,0,255,0.8)",
              border: "1px solid rgba(128,0,255,0.15)",
              borderRadius: "3px",
              background: "rgba(128,0,255,0.04)",
            }}
          >
            03 / PROJECTS
          </div>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2
                className="font-display font-black"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.4))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Featured Work
              </h2>
              <div
                className="mt-3 h-px w-24"
                style={{ background: "linear-gradient(90deg, hsl(270,100%,65%), transparent)" }}
              />
            </div>
            <a
              href="https://github.com/Naman-1508"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-white/30 hover:text-white/60 transition-colors pb-1"
            >
              <Github className="w-3.5 h-3.5" />
              github.com/Naman-1508
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center reveal">
          <a
            href="https://github.com/Naman-1508"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-mono text-white/50 hover:text-white/80 transition-all duration-300"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <Github className="w-4 h-4" />
            View all repositories on GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
