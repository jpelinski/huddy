import { Play, Pause, RotateCcw, Trash2 } from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { TimerDisplay } from "./TimerDisplay";
import styles from "./TimerList.module.css";

interface Props {
  isExpanded: boolean;
}

export function TimerList({ isExpanded }: Props) {
  const { timers, toggleTimer, resetTimer, removeTimer } = useTimerStore();

  return (
    <div className={styles.timerList}>
      {timers.map((timer) => (
        <div key={timer.id} className={styles.row}>
          <button
            className={styles.btn}
            onClick={(e) => {
              e.stopPropagation();
              toggleTimer(timer.id);
            }}
          >
            {timer.isRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>

          <TimerDisplay timerId={timer.id} />
          <div className={styles.btnGroup}>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.stopPropagation();
                resetTimer(timer.id);
              }}
            >
              <RotateCcw size={14} />
            </button>
            <button
              className={styles.btn}
              onClick={(e) => {
                e.stopPropagation();
                removeTimer(timer.id);
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
