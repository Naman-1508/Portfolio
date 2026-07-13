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
    
    // Mouse tracking for premium cards
    const cards = document.querySelectorAll("#experience .premium-card");
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
    <section id="experience" ref={sectionRef} className="py-8 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Experience</h2>
          <p className="text-white/50 text-lg">My professional journey so far.</p>
        </div>

        <div className="space-y-6 relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent hidden md:block" />

          {experiences.map((exp, i) => (
            <div key={i} className="premium-card p-8 reveal group relative md:ml-16">
              {/* Timeline Dot */}
              <div className="absolute -left-10 top-8 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] hidden md:block group-hover:scale-150 transition-transform duration-300" />
              
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white/95 mb-2 group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-white/60 mb-1 font-medium">
                    <Building2 className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2 shrink-0">
                  <div className="flex items-center gap-2 text-white/50 text-sm font-mono bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.08]">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </div>
                  <span className="text-xs font-bold text-purple-400/80 tracking-wider uppercase">{exp.type}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.responsibilities.map((resp, ri) => (
                  <li key={ri} className="flex items-start gap-3 text-white/60 text-[15px] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500/50 shrink-0 group-hover:bg-purple-400 transition-colors" />
                    {resp}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.05]">
                {exp.tech.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-1 rounded bg-white/[0.03] text-white/50 border border-white/[0.05]">
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
