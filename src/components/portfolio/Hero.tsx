import { useEffect } from "react";
import { Github, Linkedin, Code2, MapPin } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.getElementById("hero-glow");
      if (glow) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 50%)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dot-pattern">
      {/* Interactive Background Glow */}
      <div id="hero-glow" className="absolute inset-0 z-0 pointer-events-none transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full premium-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-white/70">Open to Opportunities</span>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="block text-white/90">Naman Jain</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          Computer Science undergrad specializing in Cyber Security at MS Ramaiah Institute of Technology. Building secure, intelligent systems and scaling modern web applications.
        </p>

        {/* Quick Stats/Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="premium-tag"><MapPin className="w-3.5 h-3.5 mr-1.5" /> Bangalore, India</span>
          <span className="premium-tag">9.07 / 10 CGPA</span>
          <span className="premium-tag">300+ LeetCode Solved</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <a href="#projects" className="btn-premium">
            View Projects
          </a>
          <a href="#contact" className="btn-premium-outline">
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {[
            { href: "https://github.com/Naman-1508", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/naman-jain-123681317/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://leetcode.com/u/ZWCMA2Saw6/", icon: Code2, label: "LeetCode" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white/40 hover:text-white transition-colors"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
