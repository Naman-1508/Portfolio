import { useEffect, useRef } from "react";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    major: "Cyber Security",
    institution: "MS Ramaiah Institute of Technology",
    location: "Bangalore, India",
    score: "9.19 / 10.0",
    scoreLabel: "CGPA",
    status: "Current",
    year: "2023 – 2027",
    accent: "hsl(180,100%,50%)",
    details: [
      "Specialization in Cyber Security",
      "Active participant in LeetCode weekly contests",
    ],
  },
  {
    degree: "Class XII — PCM Stream",
    major: "Physics, Chemistry, Mathematics",
    institution: "St. Anthony's Sr. Secondary School",
    location: "Udaipur, Rajasthan",
    score: "87%",
    scoreLabel: "Percentage",
    status: "Completed",
    year: "2022",
    accent: "hsl(270,100%,65%)",
    details: [
      "Science stream with Mathematics",
      "Consistent academic performer",
    ],
  },
  {
    degree: "Class X",
    major: "All Subjects",
    institution: "St. Anthony's Sr. Secondary School",
    location: "Udaipur, Rajasthan",
    score: "94%",
    scoreLabel: "Percentage",
    status: "Completed",
    year: "2020",
    accent: "hsl(320,100%,60%)",
    details: [
      "Top academic performer in class",
    ],
  },
];

const Education = () => {
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
    <section id="education" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(320,100%,60%,0.02) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(320,100%,60%,0.8)",
              border: "1px solid rgba(255,0,128,0.15)",
              borderRadius: "3px",
              background: "rgba(255,0,128,0.03)",
            }}
          >
            05 / EDUCATION
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
            Education
          </h2>
          <div
            className="mt-3 h-px w-24"
            style={{ background: "linear-gradient(90deg, hsl(320,100%,60%), transparent)" }}
          />
        </div>

        {/* Cards */}
        <div className="space-y-5">
          {education.map((edu, i) => (
            <div
              key={i}
              className={`reveal delay-${i * 150} rounded-2xl overflow-hidden relative group`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${edu.accent}33`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${edu.accent}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: edu.accent,
                  boxShadow: `2px 0 12px ${edu.accent}44`,
                }}
              />

              <div className="pl-8 pr-7 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Info */}
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl shrink-0"
                      style={{
                        background: `${edu.accent}10`,
                        border: `1px solid ${edu.accent}20`,
                      }}
                    >
                      <GraduationCap
                        className="w-5 h-5"
                        style={{ color: edu.accent }}
                      />
                    </div>
                    <div>
                      <div
                        className="font-mono text-xs mb-1"
                        style={{ color: `${edu.accent}80`, letterSpacing: "0.1em" }}
                      >
                        {edu.year} · {edu.status}
                      </div>
                      <h3 className="text-white/90 font-bold text-base mb-0.5">{edu.degree}</h3>
                      <p
                        className="text-sm font-mono mb-1"
                        style={{ color: edu.accent }}
                      >
                        {edu.major}
                      </p>
                      <p className="text-white/40 text-sm">{edu.institution}, {edu.location}</p>
                    </div>
                  </div>

                  {/* Right: Score + details */}
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div
                      className="px-4 py-2 rounded-xl text-center"
                      style={{
                        background: `${edu.accent}10`,
                        border: `1px solid ${edu.accent}25`,
                      }}
                    >
                      <div
                        className="font-display font-black text-xl"
                        style={{ color: edu.accent }}
                      >
                        {edu.score}
                      </div>
                      <div className="font-mono text-xs text-white/30">{edu.scoreLabel}</div>
                    </div>

                    {/* Details as mini badges */}
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {edu.details.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded text-xs font-mono text-white/30"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
