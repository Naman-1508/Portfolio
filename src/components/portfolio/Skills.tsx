import { useEffect, useRef } from "react";

type Skill = { name: string; level: number; icon?: string };
type Category = {
  title: string;
  color: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "Languages",
    color: "hsl(180,100%,50%)",
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "JavaScript", level: 82 },
      { name: "C / C++", level: 75 },
      { name: "Dart", level: 68 },
    ],
  },
  {
    title: "Web Development",
    color: "hsl(270,100%,65%)",
    skills: [
      { name: "React.js", level: 82 },
      { name: "Node.js", level: 75 },
      { name: "HTML / CSS", level: 88 },
      { name: "TypeScript", level: 72 },
      { name: "TailwindCSS", level: 78 },
    ],
  },
  {
    title: "Mobile & AI",
    color: "hsl(320,100%,60%)",
    skills: [
      { name: "Flutter", level: 72 },
      { name: "Android Studio", level: 65 },
      { name: "Generative AI (GCP)", level: 60 },
    ],
  },
  {
    title: "Databases & Tools",
    color: "hsl(150,100%,50%)",
    skills: [
      { name: "MongoDB", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Git / GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "MongoDB Compass", level: 72 },
    ],
  },
];

const techIcons = [
  "React", "Node.js", "Python", "Java", "Flutter", "MongoDB",
  "TypeScript", "Git", "Express.js", "C++", "SQL", "TailwindCSS",
];

const SkillBar = ({ name, level, color }: { name: string; level: number; color: string }) => {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && fillRef.current) {
          setTimeout(() => {
            if (fillRef.current) {
              fillRef.current.style.width = `${level}%`;
            }
          }, 200);
        }
      },
      { threshold: 0.5 }
    );
    if (fillRef.current) observer.observe(fillRef.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
          {name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 6px ${color}66`,
            position: "relative",
          }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
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
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 px-6 relative overflow-hidden"
    >
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 0% 50%, rgba(0,255,255,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Dot bg */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(0,255,255,0.6)",
              border: "1px solid rgba(0,255,255,0.1)",
              borderRadius: "3px",
              background: "rgba(0,255,255,0.03)",
            }}
          >
            02 / SKILLS
          </div>
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
            Tech Stack
          </h2>
          <div
            className="mt-3 h-px w-24"
            style={{ background: "linear-gradient(90deg, hsl(270,100%,65%), transparent)" }}
          />
        </div>

        {/* Scrolling tech names banner */}
        <div className="relative overflow-hidden mb-16 reveal">
          <div
            className="flex gap-6 py-3"
            style={{
              animation: "gradient-x 20s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...techIcons, ...techIcons].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 shrink-0"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.1em",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: i % 3 === 0 ? "hsl(180,100%,50%)" : i % 3 === 1 ? "hsl(270,100%,65%)" : "hsl(320,100%,60%)" }}
                />
                {tech.toUpperCase()}
              </span>
            ))}
          </div>
          <div
            className="absolute inset-y-0 left-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(90deg, var(--dark-bg), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, var(--dark-bg), transparent)" }}
          />
        </div>

        {/* Skill categories with bars */}
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`reveal rounded-2xl p-6 delay-${ci * 100}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${cat.color}18`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}33`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${cat.color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}18`;
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-6 rounded-full"
                  style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}88` }}
                />
                <h3
                  className="font-display text-sm font-bold tracking-widest uppercase"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag cloud */}
        <div className="mt-12 reveal text-center">
          <p className="font-mono text-xs text-white/20 mb-4 tracking-widest">// ADDITIONAL TOOLS & CONCEPTS</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "DSA", "OOP", "REST APIs", "JWT", "Express.js", "Arduino",
              "Cyber Security", "Linux", "Agile", "Problem Solving",
            ].map((tag) => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
