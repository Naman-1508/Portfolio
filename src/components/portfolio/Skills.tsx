import { useEffect, useRef } from "react";
import { Terminal, Layout, Shield, Cpu, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Terminal,
    skills: ["Java", "Python", "JavaScript"]
  },
  {
    title: "Full Stack",
    icon: Layout,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "HTML", "CSS"]
  },
  {
    title: "Security",
    icon: Shield,
    skills: ["Scapy", "NFStream"]
  },
  {
    title: "Core CS",
    icon: Cpu,
    skills: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "DBMS", "Cryptography & Network Security"]
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code"]
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
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
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto">
        <div className="reveal mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <p className="text-white/50 text-lg">Languages, frameworks, and core concepts.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, i) => (
            <div key={category.title} className="premium-card p-6 reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/[0.03] border border-white/[0.05] rounded-md">
                  <category.icon className="w-4 h-4 text-white/70" />
                </div>
                <h3 className="font-semibold text-white/90">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="premium-tag text-sm py-1.5 px-3">
                    {skill}
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

export default Skills;
