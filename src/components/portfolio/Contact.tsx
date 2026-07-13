import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Code2, Mail, MapPin, Send } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "all 0.3s ease",
  };

  const focusStyle = {
    borderColor: "rgba(0,255,255,0.3)",
    boxShadow: "0 0 12px rgba(0,255,255,0.08)",
    background: "rgba(0,255,255,0.02)",
  };

  const socials = [
    {
      icon: Github,
      label: "GitHub",
      handle: "@Naman-1508",
      href: "https://github.com/Naman-1508",
      accent: "hsl(180,100%,50%)",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      handle: "naman-jain-123681317",
      href: "https://www.linkedin.com/in/naman-jain-123681317/",
      accent: "hsl(220,100%,65%)",
    },
    {
      icon: Code2,
      label: "LeetCode",
      handle: "ZWCMA2Saw6",
      href: "https://leetcode.com/u/ZWCMA2Saw6/",
      accent: "hsl(38,100%,60%)",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-16 text-center reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(0,255,255,0.6)",
              border: "1px solid rgba(0,255,255,0.1)",
              borderRadius: "3px",
              background: "rgba(0,255,255,0.03)",
            }}
          >
            07 / CONTACT
          </div>
          <h2
            className="font-display font-black"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.4))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Let's Connect
          </h2>
          <div
            className="mt-3 h-px w-24 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, hsl(180,100%,50%), transparent)" }}
          />
          <p className="mt-6 text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            I'm always open to discussing new projects, internships, or just saying hello.
            Drop a message — I'll get back as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Contact form */}
          <div className="reveal-left">
            <div
              className="rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="font-display font-bold text-base text-white/60 mb-6 tracking-widest uppercase">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-white/30 mb-1.5 tracking-wider">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(255,255,255,0.03)";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/30 mb-1.5 tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(255,255,255,0.03)";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/30 mb-1.5 tracking-wider">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                    placeholder="What's on your mind?"
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                      e.target.style.background = "rgba(255,255,255,0.03)";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-mono text-sm tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: sent
                      ? "rgba(0,255,100,0.15)"
                      : "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(128,0,255,0.15))",
                    border: `1px solid ${sent ? "rgba(0,255,100,0.3)" : "rgba(0,255,255,0.25)"}`,
                    color: sent ? "hsl(150,100%,60%)" : "hsl(180,100%,65%)",
                    cursor: sending || sent ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!sending && !sent) {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,255,255,0.2)";
                      (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(128,0,255,0.2))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!sending && !sent) {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(128,0,255,0.15))";
                    }
                  }}
                >
                  {sent ? (
                    <>✓ Message Sent!</>
                  ) : sending ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full border-t-2 border-cyan-400"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right: Info + Socials */}
          <div className="reveal-right space-y-5 delay-200">
            {/* Direct contact */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="font-display font-bold text-base text-white/60 mb-5 tracking-widest uppercase">
                Direct Contact
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:namanjain01508@gmail.com"
                  className="flex items-center gap-4 group p-3 rounded-xl transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg"
                    style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.15)" }}
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs font-mono mb-0.5">EMAIL</div>
                    <div className="text-white/70 text-sm group-hover:text-cyan-400 transition-colors">
                      namanjain01508@gmail.com
                    </div>
                  </div>
                </a>

                <div
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="p-2.5 rounded-lg"
                    style={{ background: "rgba(128,0,255,0.08)", border: "1px solid rgba(128,0,255,0.15)" }}
                  >
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs font-mono mb-0.5">LOCATION</div>
                    <div className="text-white/70 text-sm">Bangalore, Karnataka, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h3 className="font-display font-bold text-base text-white/60 mb-5 tracking-widest uppercase">
                Find Me Online
              </h3>

              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, handle, href, accent }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3 rounded-xl transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${accent}22`;
                      (e.currentTarget as HTMLElement).style.background = `${accent}06`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div
                      className="p-2.5 rounded-lg transition-all"
                      style={{
                        background: `${accent}10`,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accent }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white/30 text-xs font-mono mb-0.5">{label.toUpperCase()}</div>
                      <div
                        className="text-sm font-mono transition-colors"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {handle}
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: accent }}
                    >
                      →
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Status card */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                background: "rgba(0,255,100,0.03)",
                border: "1px solid rgba(0,255,100,0.1)",
              }}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  background: "hsl(150,100%,60%)",
                  boxShadow: "0 0 10px hsl(150,100%,60%)",
                  animation: "pulse-glow 2s ease infinite",
                }}
              />
              <div>
                <div className="text-green-400 text-sm font-semibold">Open to Opportunities</div>
                <div className="text-white/30 text-xs font-mono mt-0.5">
                  Internships · Full-time · Freelance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/15 text-xs font-mono"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span>© 2025 Naman Jain · Built with React, TypeScript & TailwindCSS</span>
          <span>Designed with 💙 in Bangalore</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
