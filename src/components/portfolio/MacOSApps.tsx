import { useState } from "react";

export const MacOSMusicApp = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#1e1e1e" }}>
      <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "#252526" }}>
        <h2 style={{ margin: 0, fontSize: 18, color: "white", fontWeight: 600 }}>Apple Music</h2>
      </div>
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        <h3 style={{ color: "white", marginBottom: 16 }}>Top Hindi Songs / Arijit Singh</h3>
        <iframe
          style={{ borderRadius: 12 }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWZ6tV97a2Z0n?utm_source=generator&theme=0"
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export const MacOSNotesApp = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", color: "black", fontFamily: "-apple-system, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 250, borderRight: "1px solid #d1d1d6", background: "#f5f5f7", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #d1d1d6", fontWeight: 600, fontSize: 13, color: "#8e8e93" }}>
          iCloud
        </div>
        <div style={{ padding: "12px 16px", background: "#007aff", color: "white", fontSize: 14, fontWeight: 500 }}>
          Portfolio Ideas
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4, fontWeight: 400 }}>Today</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: "32px 48px", overflow: "auto" }}>
        <div style={{ fontSize: 12, color: "#8e8e93", textAlign: "center", marginBottom: 24 }}>August 22, 2026 at 10:41 AM</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px 0" }}>Portfolio Ideas</h1>
        <ul style={{ fontSize: 15, lineHeight: 1.6, paddingLeft: 20 }}>
          <li>Make the menu bar completely dynamic</li>
          <li>Integrate Spotify player with Arijit Singh songs</li>
          <li>Build a macOS-like App Library / Launchpad</li>
          <li>Fix all the terminal and login cursor bugs</li>
          <li>Showcase RoadIntel publication properly</li>
        </ul>
      </div>
    </div>
  );
};

export const MacOSMessagesApp = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#1e1e1e", color: "white", fontFamily: "-apple-system, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 260, borderRight: "1px solid #38383a", background: "#2d2d2d", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #38383a", fontWeight: 600, fontSize: 14 }}>
          Messages
        </div>
        <div style={{ padding: "12px 16px", background: "#0a84ff", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#8e8e93", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            S
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Steve Jobs</span>
            <span style={{ fontSize: 13, opacity: 0.9 }}>This portfolio is insanely great.</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#1e1e1e" }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #38383a", textAlign: "center", fontWeight: 600, fontSize: 14 }}>
          Steve Jobs
        </div>
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16, overflow: "auto" }}>
          <div style={{ alignSelf: "flex-end", background: "#0a84ff", padding: "8px 14px", borderRadius: 18, borderBottomRightRadius: 4, maxWidth: "70%" }}>
            Hey Steve, what do you think of my new portfolio?
          </div>
          <div style={{ alignSelf: "flex-start", background: "#3a3a3c", padding: "8px 14px", borderRadius: 18, borderBottomLeftRadius: 4, maxWidth: "70%" }}>
            It's beautiful. It just works. The macOS theme is incredibly detailed.
          </div>
          <div style={{ alignSelf: "flex-end", background: "#0a84ff", padding: "8px 14px", borderRadius: 18, borderBottomRightRadius: 4, maxWidth: "70%" }}>
            Thanks! I even added a working Messages app.
          </div>
          <div style={{ alignSelf: "flex-start", background: "#3a3a3c", padding: "8px 14px", borderRadius: 18, borderBottomLeftRadius: 4, maxWidth: "70%" }}>
            This portfolio is insanely great. You should be proud.
          </div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid #38383a" }}>
          <div style={{ background: "#2c2c2e", borderRadius: 20, padding: "8px 16px", color: "#8e8e93", fontSize: 14 }}>
            iMessage
          </div>
        </div>
      </div>
    </div>
  );
};

export const MacOSPhotosApp = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#1e1e1e", color: "white" }}>
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #38383a", background: "#2d2d2d" }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, textAlign: "center" }}>Photos</h2>
      </div>
      <div style={{ flex: 1, padding: 16, overflow: "auto" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 20 }}>All Photos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
          <div style={{ aspectRatio: "1", overflow: "hidden" }}>
             <img src="/wallpaper.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ aspectRatio: "1", overflow: "hidden" }}>
             <img src="/profile.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const MacOSSettingsApp = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#1e1e1e", color: "white", fontFamily: "-apple-system, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 220, borderRight: "1px solid #38383a", background: "#2d2d2d", padding: "16px 10px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px", background: "#3a3a3c", borderRadius: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden" }}>
            <img src="/profile.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Naman Jain</span>
            <span style={{ fontSize: 11, color: "#8e8e93" }}>Apple ID</span>
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ padding: "6px 10px", background: "#0a84ff", borderRadius: 6, fontSize: 13, fontWeight: 500 }}>General</div>
          <div style={{ padding: "6px 10px", fontSize: 13, color: "#d1d1d6" }}>Appearance</div>
          <div style={{ padding: "6px 10px", fontSize: 13, color: "#d1d1d6" }}>Control Centre</div>
          <div style={{ padding: "6px 10px", fontSize: 13, color: "#d1d1d6" }}>Displays</div>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, padding: "40px", overflow: "auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 24, marginTop: 0 }}>General</h1>
        
        <div style={{ background: "#2c2c2e", borderRadius: 10, overflow: "hidden" }}>
           <div style={{ padding: "16px", borderBottom: "1px solid #38383a", display: "flex", justifyContent: "space-between" }}>
             <span>About</span>
             <span style={{ color: "#8e8e93" }}>macOS Sequoia</span>
           </div>
           <div style={{ padding: "16px", borderBottom: "1px solid #38383a", display: "flex", justifyContent: "space-between" }}>
             <span>Software Update</span>
             <span style={{ color: "#8e8e93" }}>Up to date</span>
           </div>
           <div style={{ padding: "16px", display: "flex", justifyContent: "space-between" }}>
             <span>Storage</span>
             <span style={{ color: "#8e8e93" }}>1.2 TB / 2 TB</span>
           </div>
        </div>
      </div>
    </div>
  );
};
