import { useEffect, useRef } from "react";
import { Trophy, FileText, Code, Award } from "lucide-react";

const achievements = [
  {
    title: "Amazon ML Summer School 2026",
    issuer: "Amazon",
    description: "Selected for the highly competitive Amazon Machine Learning Summer School.",
    icon: Code,
  },
  {
    title: "IEEE Publication: Road Intelligence System",
    issuer: "IEEE ICCECE 2026",
    description: "Published research on 'Road Intelligence System for Real-Time Hazard Detection and Navigation Assistance' at the International Conference.",
    icon: FileText,
  },
  {
    title: "Top 12 / 170+ Teams — WHACKIEST'25 Hackathon",
    issuer: "CodeRit Club, MSRIT",
    description: "Built HealTrip, an AI Medical Tourism platform connecting international patients with verified hospitals using FastAPI and React.",
    icon: Trophy,
  },
  {
    title: "National Round — NCSC",
    issuer: "National Children Science Congress",
    description: "Selected for the national round for developing an Arduino-based Smart Elevator project.",
    icon: Award,
  }
];

const Achievements = () => {
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
    <section id="certifications" ref={sectionRef} className="py-24 px-6 relative border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Achievements & Publications</h2>
          <p className="text-white/50 text-lg">Milestones, research, and hackathon wins.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="premium-card p-6 reveal group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl shrink-0 group-hover:bg-white/[0.08] transition-colors">
                    <Icon className="w-6 h-6 text-white/70" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/90 leading-snug mb-1">{item.title}</h3>
                    <div className="text-xs font-mono text-white/40 mb-3">{item.issuer}</div>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
