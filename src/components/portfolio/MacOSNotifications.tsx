/**
 * MacOSNotifications — macOS notification system
 *
 * Features:
 * - Top-right slide-in from right
 * - Stacked notifications with natural spacing
 * - Auto-dismiss after 4s with progress bar
 * - Clickable (opens related action)
 * - Queue management (max 4 visible at once)
 * - Close button on hover
 * - App icon, title, subtitle, time
 */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface NotificationItem {
  id: string;
  appName: string;
  appIcon: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  onClick?: () => void;
  duration?: number; // ms, default 4500
}

interface MacOSNotificationsProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

const MacOSNotifications = ({ notifications, onDismiss }: MacOSNotificationsProps) => {
  return (
    <div style={{
      position: "fixed",
      top: 40,
      right: 14,
      zIndex: 99980,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: 320,
      pointerEvents: "none",
    }}>
      <AnimatePresence mode="popLayout">
        {notifications.slice(0, 5).map((n, i) => (
          <NotificationCard
            key={n.id}
            notification={n}
            onDismiss={onDismiss}
            index={i}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationCard = ({
  notification: n,
  onDismiss,
  index,
}: {
  notification: NotificationItem;
  onDismiss: (id: string) => void;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = n.duration ?? 4500;

  // Auto-dismiss with progress bar
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(pct);
      if (pct <= 0) {
        clearInterval(interval);
        onDismiss(n.id);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [n.id, duration, onDismiss]);

  const now = n.timestamp ?? new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{   opacity: 0, x: 80, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        type: "spring", stiffness: 380, damping: 30,
        delay: index * 0.04,
      }}
      style={{ pointerEvents: "all" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={() => { n.onClick?.(); onDismiss(n.id); }}
        style={{
          position: "relative",
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(36, 24, 58, 0.88)",
          backdropFilter: "blur(50px) saturate(2)",
          WebkitBackdropFilter: "blur(50px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.13)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
          cursor: n.onClick ? "pointer" : "default",
          padding: "12px 14px 8px",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{
            width: 18, height: 18,
            borderRadius: 4,
            background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12,
          }}>
            {n.appIcon}
          </div>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
            flex: 1,
          }}>
            {n.appName}
          </span>
          <span style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.3)",
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
          }}>
            {now}
          </span>
          {hovered && (
            <button
              onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
              style={{
                marginLeft: 4,
                background: "rgba(255,255,255,0.12)",
                border: "none",
                borderRadius: "50%",
                width: 16, height: 16,
                color: "rgba(255,255,255,0.6)",
                fontSize: 9,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>
          )}
        </div>

        {/* Body */}
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: "rgba(255,255,255,0.92)",
          fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
          marginBottom: n.subtitle ? 2 : 6,
          lineHeight: 1.3,
        }}>
          {n.title}
        </div>
        {n.subtitle && (
          <div style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif",
            marginBottom: 6,
            lineHeight: 1.35,
          }}>
            {n.subtitle}
          </div>
        )}

        {/* Auto-dismiss progress bar */}
        <div style={{
          height: 2,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 1,
          overflow: "hidden",
          marginTop: 4,
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "rgba(140,100,255,0.7)",
            borderRadius: 1,
            transition: "width 0.05s linear",
          }} />
        </div>
      </div>
    </motion.div>
  );
};

export default MacOSNotifications;

// ── Notification queue hook ───────────────────────────────────────────────────
export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const push = useCallback((n: Omit<NotificationItem, "id">) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setNotifications(prev => [{ ...n, id }, ...prev].slice(0, 5));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return { notifications, push, dismiss };
}
