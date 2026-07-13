import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Detect active section
      const sections = navItems.map((n) => n.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5,5,10,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,255,255,0.08)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 relative"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "linear-gradient(135deg, hsl(180,100%,50%), hsl(270,100%,65%))",
            }}
          />
          <span
            className="font-display text-base font-bold tracking-widest"
            style={{
              background: "linear-gradient(135deg, hsl(180,100%,50%), hsl(270,100%,65%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            NJ
          </span>
          <span className="font-mono text-xs text-white/30 group-hover:text-white/50 transition-colors">
            _portfolio
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${activeSection === item.href.replace("#","") ? "!text-cyan-400" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA button */}
        <a
          href="mailto:namanjain01508@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest uppercase"
          style={{
            border: "1px solid rgba(0,255,255,0.3)",
            color: "hsl(180,100%,60%)",
            background: "rgba(0,255,255,0.05)",
            clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,255,255,0.15)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(0,255,255,0.05)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px transition-all duration-300"
              style={{
                width: i === 1 ? (menuOpen ? "24px" : "16px") : "24px",
                background: "hsl(180,100%,50%)",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translateY(6px)" : i === 2 ? "rotate(-45deg) translateY(-6px)" : "scaleX(0)"
                  : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "300px" : "0",
          background: "rgba(5,5,10,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: menuOpen ? "1px solid rgba(0,255,255,0.08)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <span className="text-cyan-500/50 mr-2">{">"}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
