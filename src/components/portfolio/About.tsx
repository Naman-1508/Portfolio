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
    
    // Mouse tracking for premium cards
    const cards = document.querySelectorAll("#about .premium-card");
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
    <section id="about" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">About Me</h2>
          <p className="text-white/50 max-w-2xl text-lg leading-relaxed">
            I'm a passionate software developer focused on building impactful, secure, and highly performant applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          
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
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, i) => (
                <div key={i} className="premium-card p-5 flex items-start gap-4">
                  <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                    <item.icon className="w-5 h-5 text-purple-400" />
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
              <div key={i} className="premium-card p-6 flex items-center justify-between group">
                <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">{stat.label}</span>
                <span className="text-2xl font-display font-bold tracking-tight text-white/90 group-hover:text-purple-400 transition-colors">{stat.value}</span>
              </div>
            ))}
            
            <div className="premium-card p-6 mt-6">
              <h4 className="text-sm font-medium text-white/50 mb-5 uppercase tracking-wider">Quick Details</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex justify-between border-b border-white/[0.05] pb-3">
                  <span className="font-mono text-xs text-white/40">Location</span>
                  <span className="text-white/90">Bangalore, IN</span>
                </li>
                <li className="flex justify-between border-b border-white/[0.05] pb-3">
                  <span className="font-mono text-xs text-white/40">Education</span>
                  <span className="text-white/90">MSRIT</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-mono text-xs text-white/40">Availability</span>
                  <span className="text-green-400 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Open to Roles
                  </span>
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
