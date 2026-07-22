/**
 * MacOSMusicPlayer — Spotify Mini Player (Arijit Singh / Bollywood Lofi)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Arijit Singh / Bollywood playlist options
const PLAYLISTS = [
  {
    name: "Arijit Singh Hits",
    embed: "https://open.spotify.com/embed/artist/4YRxDV8wJFPHPTeXepOstw?utm_source=generator&theme=0",
  },
  {
    name: "Bollywood Lofi",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator&theme=0",
  },
  {
    name: "Arijit Singh Playlist",
    embed: "https://open.spotify.com/embed/playlist/5GhQiRkGuqzpWZSE7OU3im?utm_source=generator&theme=0",
  },
];

const MacOSMusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [playlistIdx, setPlaylistIdx] = useState(0);

  if (!isVisible) return null;

  const playlist = PLAYLISTS[playlistIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      style={{
        position: "fixed",
        bottom: 88,
        left: 20,
        zIndex: 9800,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "flex-start",
      }}
    >
      {/* Expanded Spotify embed */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.92, originY: 1 }}
            animate={{ opacity: 1, height: 380, scale: 1, originY: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.92, originY: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{
              overflow: "hidden",
              borderRadius: 16,
              boxShadow: "0 16px 50px rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              width: 320,
              display: "flex",
              flexDirection: "column",
              background: "#000",
            }}
          >
            {/* Playlist switcher */}
            <div style={{
              display: "flex", gap: 4, padding: "8px 10px",
              background: "rgba(30,30,30,0.95)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}>
              {PLAYLISTS.map((pl, i) => (
                <button
                  key={i}
                  onClick={() => setPlaylistIdx(i)}
                  style={{
                    padding: "3px 10px", borderRadius: 20, fontSize: 11,
                    border: "none", cursor: "pointer",
                    background: i === playlistIdx ? "#1DB954" : "rgba(255,255,255,0.08)",
                    color: i === playlistIdx ? "white" : "rgba(255,255,255,0.5)",
                    fontFamily: "-apple-system, sans-serif", fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                >
                  {pl.name}
                </button>
              ))}
            </div>
            {/* Spotify embed */}
            <iframe
              key={playlistIdx}
              style={{ flex: 1, border: "none" }}
              src={playlist.embed}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini pill bar */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "7px 14px",
          borderRadius: 24,
          background: "rgba(24,18,46,0.82)",
          backdropFilter: "blur(40px) saturate(2)",
          WebkitBackdropFilter: "blur(40px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Spotify icon */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#1DB954",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px rgba(29,185,84,0.5)",
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" fill="white" style={{ width: 15, height: 15 }}>
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.962-.518.781.781 0 01.518-.963c3.632-1.102 8.147-.568 11.224 1.329a.78.78 0 01.257 1.061zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.552-1.077 9.46-.87 13.192 1.321a.937.937 0 01-.432 1.63z"/>
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.9)", fontFamily: "-apple-system, sans-serif" }}>
            {isExpanded ? "Spotify" : playlist.name}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "-apple-system, sans-serif" }}>
            {isExpanded ? "Click to collapse" : "Click to open"}
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); setIsVisible(false); }}
          style={{
            background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%",
            width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.4)", fontSize: 9, cursor: "pointer", marginLeft: 4,
          }}
        >✕</button>
      </motion.div>
    </motion.div>
  );
};

export default MacOSMusicPlayer;
