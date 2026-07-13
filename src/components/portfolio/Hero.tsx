import { useEffect, useRef } from "react";
import { Github, Linkedin, Code2, MapPin } from "lucide-react";

// Helper component for staggered text animation
const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="char-reveal"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      // Parallax effect on the content
      containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background handles Aurora via index.css */}
      <div className="bg-aurora" />

      {/* Content Container */}
      <div 
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center transition-transform duration-200 ease-out"
      >
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-md reveal">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Open to Opportunities</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4">
          <AnimatedText text="Naman Jain" className="text-white/95 drop-shadow-2xl" />
        </h1>

        {/* Dynamic Subtitle */}
        <div className="text-xl md:text-3xl font-display font-semibold mb-6 reveal delay-100">
          <span className="text-white/60">Building </span>
          <span className="text-gradient-animated">Secure & Intelligent </span>
          <span className="text-white/60">Systems</span>
        </div>

        {/* Description */}
        <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10 reveal delay-200 font-light">
          Computer Science undergrad specializing in Cyber Security at MS Ramaiah Institute of Technology. Exploring Gen AI, Firmware Security, and Full-Stack scalable architectures.
        </p>

        {/* Quick Stats/Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal delay-300">
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 flex items-center shadow-lg">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> Bangalore, IN
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 shadow-lg">
            9.07 / 10 CGPA
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 shadow-lg">
            300+ LeetCode Solved
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-5 reveal delay-300">
          <a href="#projects" className="btn-magnetic shadow-xl">
            View Projects
          </a>
          <a href="#contact" className="btn-magnetic-outline shadow-xl">
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-8 mt-16 reveal delay-300">
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
              className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
