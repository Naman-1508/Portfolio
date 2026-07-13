import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const experiences = [
  {
    role: "Software Development Intern",
    company: "MS Ramaiah Institute of Technology",
    location: "Bangalore, India",
    period: "August 2024",
    type: "On-site",
    accent: "hsl(180,100%,50%)",
    responsibilities: [
      "Built a Flutter-based Travel Booking App UI with clean and responsive layouts",
      "Designed intuitive interfaces for browsing destinations, selecting dates, and viewing trip details",
      "Focused on frontend development with emphasis on user experience and modern design patterns",
      "Collaborated with team members to deliver high-quality mobile application designs",
    ],
    tech: ["Flutter", "Dart", "UI/UX", "Mobile Dev"],
  },
];

const Experience = () => {
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
    <section id="experience" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 100% 50%, rgba(0,255,255,0.025) 0%, transparent 70%)",
        }}
      />

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
            04 / EXPERIENCE
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
            Experience
          </h2>
          <div
            className="mt-3 h-px w-24"
            style={{ background: "linear-gradient(90deg, hsl(180,100%,50%), transparent)" }}
          />
        </div>

        {/* Timeline */}
        <div className="relative pl-12">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(180deg, hsl(180,100%,50%), hsl(270,100%,65%), transparent)",
              opacity: 0.4,
            }}
          />

          {experiences.map((exp, i) => (
            <div key={i} className="relative mb-8 reveal">
              {/* Timeline dot */}
              <div
                className="absolute -left-7 top-8 w-4 h-4 rounded-full z-10"
                style={{
                  background: "hsl(240,10%,3.9%)",
                  border: `2px solid ${exp.accent}`,
                  boxShadow: `0 0 10px ${exp.accent}66`,
                }}
              />

              <div
                className="rounded-2xl p-8 relative overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${exp.accent}33`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${exp.accent}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Gradient top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${exp.accent}, ${exp.accent}00)`,
                    opacity: 0.6,
                  }}
                />

                {/* Corner glow */}
                <div
                  className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${exp.accent}06 0%, transparent 70%)`,
                  }}
                />

                {/* Header row */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className="font-display font-bold text-xl mb-1"
                      style={{ color: exp.accent }}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-white/80 font-semibold text-base mb-1">{exp.company}</p>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <div
                      className="px-3 py-1 rounded-full font-mono text-xs"
                      style={{
                        background: `${exp.accent}10`,
                        border: `1px solid ${exp.accent}30`,
                        color: exp.accent,
                      }}
                    >
                      {exp.period}
                    </div>
                    <div
                      className="px-3 py-1 rounded-full font-mono text-xs"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {exp.type}
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, ri) => (
                    <div key={ri} className="flex items-start gap-3 group/item">
                      <div
                        className="w-1 h-1 rounded-full mt-2 shrink-0"
                        style={{
                          background: exp.accent,
                          boxShadow: `0 0 4px ${exp.accent}`,
                        }}
                      />
                      <p className="text-white/50 text-sm leading-relaxed group-hover/item:text-white/70 transition-colors">
                        {resp}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs font-mono"
                      style={{
                        background: `${exp.accent}08`,
                        border: `1px solid ${exp.accent}20`,
                        color: `${exp.accent}cc`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Looking for more */}
          <div className="relative reveal delay-300">
            <div
              className="absolute -left-7 top-6 w-4 h-4 rounded-full z-10 flex items-center justify-center"
              style={{
                background: "rgba(128,0,255,0.15)",
                border: "2px solid rgba(128,0,255,0.4)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "hsl(270,100%,65%)", animation: "pulse-glow-purple 2s ease infinite" }}
              />
            </div>

            <div
              className="rounded-2xl p-6 flex items-center gap-4"
              style={{
                background: "rgba(128,0,255,0.03)",
                border: "1px dashed rgba(128,0,255,0.2)",
              }}
            >
              <div className="text-white/30 font-mono text-sm">
                🚀 Currently open to internship & full-time opportunities. Let's build something amazing!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
