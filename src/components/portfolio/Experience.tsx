import { useEffect, useRef } from "react";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Career Preview Program Intern",
    company: "Hewlett Packard Enterprise (HPE)",
    period: "2025 - Present",
    type: "Internship",
    responsibilities: [
      "Working on PUMA-Boot, a secure UEFI-based node provisioning framework for HPC clusters aimed at improving trust and security during node bootstrapping.",
      "Exploring firmware-level attestation, TPM-based verification, and post-quantum cryptographic mechanisms for secure OS provisioning and node authentication.",
      "Contributing to the design and implementation of secure boot workflows, encrypted artifact delivery, and integrity verification mechanisms."
    ],
    tech: ["UEFI", "TPM", "Secure Boot", "Cryptography", "HPC"],
  },
  {
    role: "Flutter Development Intern",
    company: "MS Ramaiah Institute of Technology",
    period: "Aug 2024",
    type: "Internship",
    responsibilities: [
      "Developed a responsive travel booking application UI using Flutter and Dart with modular, reusable widget architecture following Material Design guidelines.",
      "Designed intuitive interfaces for browsing destinations, selecting dates, and viewing trip details.",
      "Collaborated with team members to deliver high-quality mobile application designs."
    ],
    tech: ["Flutter", "Dart", "Material Design", "Mobile UI"],
  }
];

const Experience = () => {
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
    <section id="experience" ref={sectionRef} className="py-24 px-6 relative border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience</h2>
          <p className="text-white/50 text-lg">My professional journey so far.</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="premium-card p-8 reveal group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-white/10 group-hover:bg-white/30 transition-colors" />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white/90 mb-2">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-white/60 mb-1">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 text-white/40 text-sm font-mono bg-white/[0.02] px-3 py-1.5 rounded-md border border-white/[0.05]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                  <span className="text-xs text-white/30 tracking-wider uppercase">{exp.type}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((t) => (
                  <span key={t} className="premium-tag text-xs bg-white/[0.02]">
                    {t}
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

export default Experience;
