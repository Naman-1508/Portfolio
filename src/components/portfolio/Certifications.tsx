import { useEffect, useRef } from "react";
import { Award, Star, Trophy } from "lucide-react";

const certifications = [
  {
    title: "Data Structures & Algorithms",
    issuer: "Infosys Springboard",
    description: "Comprehensive coverage of fundamental and advanced DSA concepts — arrays, trees, graphs, dynamic programming, and more.",
    status: "Completed",
    accent: "hsl(180,100%,50%)",
    icon: Award,
    year: "2024",
  },
  {
    title: "Introduction to MongoDB",
    issuer: "MongoDB University",
    description: "Foundational knowledge in NoSQL database architecture, CRUD operations, aggregation pipelines, and MongoDB Atlas.",
    status: "Completed",
    accent: "hsl(150,100%,50%)",
    icon: Award,
    year: "2024",
  },
  {
    title: "Google Cloud Beginner Gen AI",
    issuer: "Google Cloud Platform",
    description: "Cutting-edge Generative AI technologies, LLMs, prompt engineering, and Google Cloud AI product suite.",
    status: "Ongoing",
    accent: "hsl(270,100%,65%)",
    icon: Star,
    year: "2025",
  },
];

const Certifications = () => {
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
    <section id="certifications" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,255,255,0.025) 0%, transparent 60%)",
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
              color: "rgba(150,100%,50%,0.8)",
              border: "1px solid rgba(0,255,150,0.15)",
              borderRadius: "3px",
              background: "rgba(0,255,150,0.03)",
            }}
          >
            06 / CERTIFICATIONS
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
            Certifications
          </h2>
          <div
            className="mt-3 h-px w-24"
            style={{ background: "linear-gradient(90deg, hsl(150,100%,50%), transparent)" }}
          />
        </div>

        {/* Cert cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <div
                key={i}
                className={`reveal delay-${i * 150} rounded-2xl p-6 relative overflow-hidden group`}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cert.accent}30`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${cert.accent}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* BG glow */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${cert.accent}0a 0%, transparent 70%)`,
                  }}
                />

                {/* Top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}00)` }}
                />

                {/* Icon + Status */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: `${cert.accent}10`,
                      border: `1px solid ${cert.accent}20`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cert.accent }} />
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: cert.status === "Ongoing"
                        ? "rgba(128,0,255,0.1)"
                        : "rgba(0,255,255,0.08)",
                      border: `1px solid ${cert.status === "Ongoing" ? "rgba(128,0,255,0.25)" : "rgba(0,255,255,0.2)"}`,
                      color: cert.status === "Ongoing"
                        ? "hsl(270,100%,75%)"
                        : "hsl(180,100%,65%)",
                    }}
                  >
                    {cert.status === "Ongoing" && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "hsl(270,100%,65%)",
                          animation: "pulse-glow-purple 1.5s ease infinite",
                        }}
                      />
                    )}
                    {cert.status}
                  </div>
                </div>

                <div className="font-mono text-xs text-white/20 mb-2">{cert.year}</div>
                <h3 className="text-white/90 font-bold text-base mb-1.5 leading-snug">{cert.title}</h3>
                <p className="font-mono text-xs mb-3" style={{ color: cert.accent }}>
                  {cert.issuer}
                </p>
                <p className="text-white/40 text-sm leading-relaxed">{cert.description}</p>
              </div>
            );
          })}
        </div>

        {/* Notable Achievement */}
        <div
          className="reveal rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,215,0,0.02)",
            border: "1px solid rgba(255,215,0,0.12)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.4), transparent)" }}
          />
          <div
            className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="flex items-start gap-5">
            <div
              className="p-4 rounded-xl shrink-0"
              style={{
                background: "rgba(255,215,0,0.08)",
                border: "1px solid rgba(255,215,0,0.2)",
              }}
            >
              <Trophy className="w-7 h-7" style={{ color: "hsl(48,100%,60%)" }} />
            </div>

            <div>
              <div
                className="font-mono text-xs text-yellow-400/50 mb-2 tracking-widest uppercase"
              >
                National Achievement
              </div>
              <h3
                className="font-display font-bold text-xl mb-3"
                style={{ color: "hsl(48,100%,70%)" }}
              >
                Smart Elevator Project — NCSC
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-3xl">
                Designed and built an{" "}
                <span className="text-white/70">Arduino-based smart elevator prototype</span>{" "}
                selected for presentation at the{" "}
                <span className="text-yellow-400 font-semibold">
                  National Children Science Congress (NCSC)
                </span>
                . Led the technical presentation, explaining design decisions and engineering
                challenges during the national evaluation.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Arduino", "C++", "Embedded Systems", "National Level", "Team Lead"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-mono"
                    style={{
                      background: "rgba(255,215,0,0.06)",
                      border: "1px solid rgba(255,215,0,0.15)",
                      color: "rgba(255,215,0,0.7)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
