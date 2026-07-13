import { useEffect, useRef } from "react";
import { BookOpen, Terminal, Code2, Target } from "lucide-react";

const stats = [
  { value: "300+", label: "LeetCode Solved" },
  { value: "9.07", label: "CGPA / 10.0" },
  { value: "3+", label: "Projects Built" },
  { value: "15+", label: "Technologies" },
];

const highlights = [
  { icon: Terminal, title: "Full-Stack Dev", desc: "Building scalable apps with React & Node.js" },
  { icon: Target, title: "Problem Solver", desc: "300+ DSA problems solved on LeetCode" },
  { icon: Code2, title: "Cyber Security", desc: "Specializing in secure systems & network analysis" },
  { icon: BookOpen, title: "Continuous Learner", desc: "Amazon ML Summer School 2026, GCP Gen AI" },
];

const About = () => {
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
    <section id="about" ref={sectionRef} className="py-24 px-6 relative border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">About Me</h2>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            I'm a passionate software developer focused on building impactful, secure, and highly performant applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          
          {/* Main Text Content */}
          <div className="lg:col-span-3 space-y-6 reveal delay-100">
            <div className="premium-card p-8 text-white/70 leading-relaxed space-y-6 text-[15px]">
              <p>
                Currently pursuing my B.E. in Computer Science (Cyber Security) at MS Ramaiah Institute of Technology. I thrive at the intersection of application development and security architecture.
              </p>
              <p>
                Recently, I joined <strong className="text-white font-medium">Hewlett Packard Enterprise (HPE)</strong> as an Intern, working on PUMA-Boot—a secure UEFI-based node provisioning framework for HPC clusters. I'm exploring firmware-level attestation, TPM-based verification, and secure boot workflows.
              </p>
              <p>
                My project experience spans from building real-time Explainable AI Security Operations Centers (XTI-SOC) to developing full-stack platforms like RoadIntel and HealTrip. I believe in writing clean, scalable code and continuously expanding my technical horizon.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, i) => (
                <div key={i} className="premium-card p-5 flex items-start gap-4">
                  <div className="p-2 bg-white/[0.03] rounded-md border border-white/[0.05]">
                    <item.icon className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white/90 mb-1">{item.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Column */}
          <div className="lg:col-span-2 space-y-4 reveal delay-200">
            {stats.map((stat, i) => (
              <div key={i} className="premium-card p-6 flex items-center justify-between">
                <span className="text-sm font-medium text-white/50">{stat.label}</span>
                <span className="text-2xl font-bold tracking-tight text-white/90">{stat.value}</span>
              </div>
            ))}
            
            <div className="premium-card p-6 mt-6">
              <h4 className="text-sm font-medium text-white/50 mb-4">Quick Details</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex justify-between border-b border-white/[0.05] pb-2">
                  <span>Location</span>
                  <span className="text-white">Bangalore, IN</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-2">
                  <span>Education</span>
                  <span className="text-white">MSRIT</span>
                </li>
                <li className="flex justify-between">
                  <span>Availability</span>
                  <span className="text-white">Open to Roles</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
