import { useEffect, useRef } from "react";
import { Github, Linkedin, Code2, MapPin } from "lucide-react";
import { motion } from "framer-motion";

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

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const text = "Naman Jain".split("");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background handles Aurora via index.css */}
      <div className="bg-aurora" />

      {/* Content Container */}
      <motion.div 
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center transition-transform duration-200 ease-out"
      >
        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Open to Opportunities</span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4 flex gap-1 drop-shadow-2xl justify-center">
          {text.map((char, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="text-white/95"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Dynamic Subtitle */}
        <motion.div variants={itemVariants} className="text-xl md:text-3xl font-display font-semibold mb-6">
          <span className="text-white/60">Building </span>
          <span className="text-gradient-animated">Secure & Intelligent </span>
          <span className="text-white/60">Systems</span>
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Computer Science undergrad specializing in Cyber Security at MS Ramaiah Institute of Technology. Exploring Gen AI, Firmware Security, and Full-Stack scalable architectures.
        </motion.p>

        {/* Quick Stats/Tags */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 flex items-center shadow-lg hover:bg-white/[0.08] transition-colors cursor-default">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> Bangalore, IN
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 shadow-lg hover:bg-white/[0.08] transition-colors cursor-default">
            9.07 / 10 CGPA
          </span>
          <span className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-white/70 shadow-lg hover:bg-white/[0.08] transition-colors cursor-default">
            300+ LeetCode Solved
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5">
          <a href="#projects" className="btn-magnetic shadow-xl">
            View Projects
          </a>
          <a href="#contact" className="btn-magnetic-outline shadow-xl">
            Contact Me
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center gap-8 mt-16">
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
