import { useState, useEffect, useRef } from "react";
import styles from "./MenuApp.module.css";
import { useSharedUIState } from "./hooks/useSharedUIState";

export default function MenuApp() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, setUIState } = useSharedUIState();
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver(() => {
      if (!wrapperRef.current) return;
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      window.api.menuSetSize(Math.ceil(width), Math.ceil(height));
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.icon} onClick={() => setMenuOpen((prev) => !prev)}>
        H
      </div>
      {menuOpen && (
        <div className={styles.menu}>
          <div
            onClick={() => {
              setUIState({ ...state, clockVisible: !state.clockVisible });
            }}
            className={styles.menuItem}
          >
            Timers
          </div>
          <div className={styles.menuItem}>Settings</div>
        </div>
      )}
    </div>
  );
}
