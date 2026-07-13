import { useEffect, useRef } from "react";
import { MapPin, Zap, Coffee, Target } from "lucide-react";

const stats = [
  { value: "100+", label: "LeetCode Solved", suffix: "" },
  { value: "9.02", label: "CGPA / 10.0", suffix: "" },
  { value: "3+", label: "Projects Built", suffix: "" },
  { value: "15+", label: "Technologies", suffix: "" },
];

const traits = [
  { icon: Zap, label: "Fast Learner", desc: "Adapts to new tech rapidly" },
  { icon: Target, label: "Problem Solver", desc: "100+ DSA problems on LeetCode" },
  { icon: Coffee, label: "Builder Mindset", desc: "Turns ideas into working code" },
  { icon: MapPin, label: "Bangalore, IN", desc: "Open to remote & on-site" },
];

const About = () => {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 100% 50%, rgba(128,0,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
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
            01 / ABOUT
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
            Who Am I?
          </h2>
          <div
            className="mt-3 h-px w-24"
            style={{ background: "linear-gradient(90deg, hsl(180,100%,50%), transparent)" }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div className="space-y-6">
            <p
              className="reveal text-white/70 leading-relaxed"
              style={{ fontSize: "1.05rem" }}
            >
              I'm{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(180,100%,50%), hsl(270,100%,65%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 600,
                }}
              >
                Naman Jain
              </span>
              , an aspiring software developer and Computer Science{" "}
              <span className="text-white font-medium">(Cyber Security)</span> undergraduate at{" "}
              <span className="text-white font-medium">MS Ramaiah Institute of Technology</span>,
              Bangalore — maintaining a stellar{" "}
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  color: "hsl(180,100%,60%)",
                }}
              >
                9.02 CGPA
              </span>
              .
            </p>
            <p className="reveal text-white/60 leading-relaxed delay-100">
              I'm passionate about building things that matter — from full-stack web apps with
              React & Node.js to mobile experiences with Flutter. I dive deep into Generative AI
              through the Google Cloud Beginner Program, and keep my DSA sharp with weekly
              LeetCode contests.
            </p>
            <p className="reveal text-white/60 leading-relaxed delay-200">
              My approach: clean code, scalable architecture, and user-first design. Whether
              it's a traffic intelligence system or an AI-powered storytelling platform — I ship
              products that solve real problems.
            </p>

            {/* Trait cards */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {traits.map(({ icon: Icon, label, desc }, i) => (
                <div
                  key={label}
                  className={`reveal glass p-4 rounded-xl group hover:scale-105 transition-all duration-300 delay-${(i+1)*100}`}
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  <Icon className="w-4 h-4 mb-2 text-cyan-400" />
                  <div className="text-white/80 text-sm font-semibold mb-0.5">{label}</div>
                  <div className="text-white/40 text-xs">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="reveal-right space-y-4 delay-300">
            {/* Big stat grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`relative overflow-hidden rounded-xl p-6 group hover:scale-105 transition-all duration-300`}
                  style={{
                    background: i % 2 === 0
                      ? "rgba(0,255,255,0.03)"
                      : "rgba(128,0,255,0.04)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(0,255,255,0.1)" : "rgba(128,0,255,0.12)"}`,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = i % 2 === 0
                      ? "0 0 20px rgba(0,255,255,0.1)"
                      : "0 0 20px rgba(128,0,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="stat-number text-4xl font-black mb-1"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      background: i % 2 === 0
                        ? "linear-gradient(135deg, hsl(180,100%,50%), hsl(270,100%,65%))"
                        : "linear-gradient(135deg, hsl(270,100%,65%), hsl(320,100%,60%))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </div>
                  <div className="text-white/40 text-xs font-mono tracking-wider uppercase">
                    {label}
                  </div>
                  <div
                    className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: i % 2 === 0 ? "hsl(180,100%,50%)" : "hsl(270,100%,65%)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Info block */}
            <div
              className="rounded-xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="font-mono text-xs text-white/30 mb-4 pb-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {"// naman.config.json"}
              </div>
              {[
                { key: "location", val: "Bangalore, Karnataka" },
                { key: "education", val: "MSRIT · B.E. CS" },
                { key: "specialization", val: "Cyber Security" },
                { key: "status", val: "🟢 Open to Opportunities" },
                { key: "cgpa", val: "9.02 / 10.0" },
              ].map(({ key, val }) => (
                <div key={key} className="flex gap-2 mb-1.5 text-sm">
                  <span className="text-purple-400 font-mono">"{key}"</span>
                  <span className="text-white/30">:</span>
                  <span className="text-cyan-400/80 font-mono">"{val}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
