import { TimerDisplay } from "./components/TimerDisplay";
import { useTimerStore } from "./store/timerStore";
import styles from "./App.module.css";
import { useState } from "react";
import { useDrag } from "./hooks/useDrag";

function App() {
  const { addTimer, toggleTimer, timers } = useTimerStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const { onMouseDown } = useDrag();

  return (
    <div
      className={styles.container}
      onMouseDown={onMouseDown}
      onDoubleClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        setIsExpanded((prev) => !prev);
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          addTimer({ name: "New Timer", duration: 300 });
        }}
      >
        +
      </button>

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
