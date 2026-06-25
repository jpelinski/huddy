import { HeadBar } from "./components/HeadBar";
import { useTimerStore } from "./store/timerStore";
import styles from "./App.module.css";
import { useState } from "react";
import { useDrag } from "./hooks/useDrag";
import { TimerList } from "./components/TimerList";
import { useEffect, useRef } from "react";

function App() {
  const { addTimer, toggleTimer, timers } = useTimerStore();
  const [isExpanded, setIsExpanded] = useState(true);
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

    setIsExpanded((prev) => !prev);
  };
  const handleAddTimer = () => {
    addTimer({ name: "New Timer", duration: 300 });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isExpanded && (
        <HeadBar onDoubleClick={handleDoubleClick} onAddTimer={handleAddTimer} />
      )}
      <TimerList isExpanded={isExpanded} />
    </div>
  );
}

export default App;
