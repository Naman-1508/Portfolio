/**
 * MacOSPreview — Preview app (PDF/Image Viewer)
 */
import { useState } from "react";
import { motion } from "framer-motion";

interface MacOSPreviewProps {
  fileUrl: string;
  fileName: string;
}

const MacOSPreview = ({ fileUrl, fileName }: MacOSPreviewProps) => {
  const [zoom, setZoom] = useState(100);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#ececec", fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px", backgroundColor: "#f5f5f5", borderBottom: "1px solid #d1d1d1"
      }}>
        {/* Left Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={toolbarBtnStyle}>sidebar</button>
          <div style={{ display: "flex", border: "1px solid #d1d1d1", borderRadius: 6, overflow: "hidden" }}>
            <button style={{ ...toolbarBtnStyle, borderRight: "1px solid #d1d1d1", borderRadius: 0 }} onClick={() => setZoom(z => Math.max(50, z - 10))}>-</button>
            <div style={{ padding: "4px 10px", fontSize: 12, backgroundColor: "white", display: "flex", alignItems: "center" }}>{zoom}%</div>
            <button style={{ ...toolbarBtnStyle, borderRadius: 0 }} onClick={() => setZoom(z => Math.min(200, z + 10))}>+</button>
          </div>
        </div>
        
        {/* Title */}
        <div style={{ fontSize: 13, fontWeight: 500, color: "#333" }}>{fileName}</div>
        
        {/* Right Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          <button style={toolbarBtnStyle} onClick={() => window.open(fileUrl, "_blank")}>Download</button>
          <button style={{ ...toolbarBtnStyle, backgroundColor: "#007aff", color: "white", border: "none" }} onClick={() => window.open(fileUrl, "_blank")}>Open</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "#dfdfdf" }} className="custom-scrollbar">
        <motion.div
          animate={{ scale: zoom / 100 }}
          style={{ transformOrigin: "top center", transition: "transform 0.2s" }}
        >
          <iframe
            src={`${fileUrl}#view=FitH`}
            title={fileName}
            style={{
              width: "800px",
              height: "1050px", // A4 ratio approx
              border: "1px solid #ccc",
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              backgroundColor: "white",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const toolbarBtnStyle = {
  padding: "4px 12px",
  backgroundColor: "white",
  border: "1px solid #d1d1d1",
  borderRadius: 6,
  fontSize: 12,
  cursor: "pointer",
  color: "#333"
};

export default MacOSPreview;
