import { HeadBar } from "./components/HeadBar";
import { useTimerStore } from "./store/timerStore";
import styles from "./App.module.css";
import { useDrag } from "./hooks/useDrag";
import { TimerList } from "./components/TimerList";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "./store/UIStore";
import { Clock } from "./components/Clock";
import { Update } from "./components/Update";
import { useProcessMonitor } from "./hooks/useProcessMonitor";
import { useSharedUIState } from "./hooks/useSharedUIState";

function App() {
  const { addTimer, timers } = useTimerStore();
  const { isExpanded, toggleExpanded, setOpenSettingsId } = useUIStore();
  const { onMouseDown } = useDrag();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      window.api.setHeight(Math.ceil(height));
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button") || timers.length === 0) return;
    setOpenSettingsId(null);
    toggleExpanded();
  };
  const handleAddTimer = () => {
    addTimer({ name: "New Timer", duration: 300 });
  };
  const { state } = useSharedUIState();

  useProcessMonitor();
  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="headbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <HeadBar onDoubleClick={handleDoubleClick} onAddTimer={handleAddTimer} />
          </motion.div>
        )}
      </AnimatePresence>
      {state.clockVisible && <Clock onAddTimer={handleAddTimer} />}
      <TimerList />
    </div>
  );
  <Update />;
}

export default App;
