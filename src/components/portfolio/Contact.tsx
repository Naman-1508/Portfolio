import { useEffect, useRef } from "react";
import { Github, Linkedin, Code2, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
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
    const cards = document.querySelectorAll("#contact .premium-card");
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

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Naman-1508",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/naman-jain-123681317/",
    },
    {
      icon: Code2,
      label: "LeetCode",
      href: "https://leetcode.com/u/ZWCMA2Saw6/",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">Let's Connect</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Direct Contact */}
          <div className="premium-card p-8 reveal">
            <h3 className="font-semibold text-white/90 mb-8 text-lg">Contact Details</h3>
            
            <div className="space-y-6">
              <a href="mailto:namanjain01508@gmail.com" className="flex items-center gap-5 group">
                <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl group-hover:bg-white/[0.08] group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Email</div>
                  <div className="text-sm font-medium text-white/80 group-hover:text-purple-300 transition-colors">namanjain01508@gmail.com</div>
                </div>
              </a>

              <a href="tel:+919509472256" className="flex items-center gap-5 group">
                <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl group-hover:bg-white/[0.08] group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Phone</div>
                  <div className="text-sm font-medium text-white/80 group-hover:text-purple-300 transition-colors">+91 9509472256</div>
                </div>
              </a>

              <div className="flex items-center gap-5 group cursor-default">
                <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl group-hover:bg-white/[0.08] transition-all duration-300">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1 font-mono uppercase tracking-wider">Location</div>
                  <div className="text-sm font-medium text-white/80">Bangalore, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="premium-card p-8 reveal delay-100 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-white/90 mb-8 text-lg">Social Profiles</h3>
              <div className="flex flex-col gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl transition-all duration-300 group hover:translate-x-2"
                  >
                    <social.icon className="w-5 h-5 text-white/50 group-hover:text-purple-400 transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Naman Jain. All rights reserved.</p>
          <p>Built with React & Tailwind</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
