import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Code2, ChevronDown } from "lucide-react";

const TITLES = [
  "Full-Stack Developer",
  "Cyber Security Enthusiast",
  "Problem Solver",
  "Flutter Developer",
  "CS Undergrad @ MSRIT",
];

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), 70);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((t) => (t + 1) % TITLES.length);
      }
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; color: string; alpha: number; life: number; maxLife: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(0,255,255,", "rgba(128,0,255,", "rgba(255,0,128,"];

    const spawn = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.3),
        size: Math.random() * 2 + 0.5,
        color,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    };

    let spawnCount = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(0,255,255,0.025)";
      ctx.lineWidth = 0.5;
      const gSize = 60;
      for (let x = 0; x < canvas.width; x += gSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Spawn
      spawnCount++;
      if (spawnCount % 3 === 0 && particles.length < 120) spawn();

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife || p.y < -20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (p.alpha * 0.1) + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Radial glow BG */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,255,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(128,0,255,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px z-10 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent)",
          animation: "scan-line 8s linear infinite",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        {/* Pre-tag */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 reveal visible"
          style={{
            background: "rgba(0,255,255,0.05)",
            border: "1px solid rgba(0,255,255,0.15)",
            borderRadius: "4px",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "rgba(0,255,255,0.8)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        {/* Main heading */}
        <h1
          className="font-display font-black mb-4 reveal visible"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              display: "block",
              color: "rgba(255,255,255,0.9)",
              animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
            }}
          >
            NAMAN
          </span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, hsl(180,100%,50%) 0%, hsl(270,100%,65%) 50%, hsl(320,100%,60%) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both, gradient-x 4s ease infinite",
            }}
          >
            JAIN
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <div
          className="flex items-center justify-center gap-2 mb-8"
          style={{ animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {"<"}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              color: "hsl(180,100%,65%)",
              minWidth: "280px",
              textAlign: "center",
              borderRight: "2px solid hsl(180,100%,50%)",
              paddingRight: "4px",
              animation: "blink-cursor 0.8s step-end infinite",
            }}
          >
            {displayed}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {"/>"}
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-white/40 max-w-xl mx-auto mb-12 leading-relaxed"
          style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both",
          }}
        >
          B.E. CS (Cyber Security) @ MS Ramaiah Institute of Technology · 9.02 CGPA ·
          Building the future, one commit at a time.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-wrap gap-4 justify-center mb-14"
          style={{ animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both" }}
        >
          <a href="#projects" className="btn-neon">
            <span className="flex items-center gap-2">
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </span>
          </a>
          <a href="#contact" className="btn-outline-neon">
            <span>Get In Touch</span>
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex justify-center gap-4"
          style={{ animation: "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both" }}
        >
          {[
            { href: "https://github.com/Naman-1508", icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/naman-jain-123681317/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://leetcode.com/u/ZWCMA2Saw6/", icon: Code2, label: "LeetCode" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative flex items-center justify-center w-11 h-11"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.03)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,255,0.4)";
                (e.currentTarget as HTMLElement).style.background = "rgba(0,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(0,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Icon className="w-4 h-4 text-white/50 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="font-mono text-xs tracking-widest text-white/20">SCROLL</span>
        <div
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: "1px solid rgba(0,255,255,0.2)" }}
        >
          <div
            className="w-0.5 h-2 rounded-full"
            style={{
              background: "hsl(180,100%,50%)",
              animation: "scan-line 1.8s ease-in-out infinite",
            }}
          />
        </div>
        <ChevronDown className="w-4 h-4 text-cyan-500/40" />
      </div>
    </section>
  );
};

export default Hero;
