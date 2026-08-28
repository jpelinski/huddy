import { useState, useEffect, useRef } from "react";
import styles from "./MenuApp.module.css";
import { useSharedUIState } from "./hooks/useSharedUIState";
import { AnimatePresence, motion } from "framer-motion";

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
      <div className={styles.wrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={menuOpen ? "icon-with-menu" : "icon-alone"}
            className={styles.icon}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            H
          </motion.div>

          {menuOpen && (
            <motion.div
              className={styles.menu}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.15 }}
            >
              <div className={styles.menu}>
                <div
                  onClick={() => {
                    setUIState({ ...state, clockVisible: !state.clockVisible });
                  }}
                  className={styles.menuItem}
                  data-active={state.clockVisible}
                >
                  Timers
                </div>
                <div className={styles.menuItem}>Settings</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
