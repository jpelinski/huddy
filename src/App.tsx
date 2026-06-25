import { TimerDisplay } from "./components/TimerDisplay";
import { HeadBar } from "./components/HeadBar";
import { useTimerStore } from "./store/timerStore";
import styles from "./App.module.css";
import { useState } from "react";
import { useDrag } from "./hooks/useDrag";

function App() {
  const { addTimer, toggleTimer, timers } = useTimerStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { onMouseDown } = useDrag();

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setIsExpanded((prev) => !prev);
  };
  const handleAddTimer = () => {
    addTimer({ name: "New Timer", duration: 300 });
  };

  return (
    <div
      className={styles.container}
      onMouseDown={onMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {isExpanded && (
        <HeadBar onDoubleClick={handleDoubleClick} onAddTimer={handleAddTimer} />
      )}

      {timers.map((timer) => (
        <div key={timer.id}>
          <TimerDisplay timerId={timer.id} />
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTimer(timer.id);
              }}
            >
              {timer.isRunning ? "Pause" : "Start"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
