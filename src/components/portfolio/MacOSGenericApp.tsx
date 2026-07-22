import React from "react";

const MacOSGenericApp = ({ appName, icon, description }: { appName: string; icon: string; description: string }) => {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      height: "100%", padding: 40, background: "rgba(30, 30, 30, 0.4)", color: "white",
      fontFamily: "-apple-system, 'SF Pro Display', sans-serif"
    }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>{icon}</div>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>{appName}</h2>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: 300 }}>
        {description}
      </p>
    </div>
  );
};

export default MacOSGenericApp;
