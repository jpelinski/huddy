import { Play, Pause, RotateCcw, Trash2, Settings } from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { TimerDisplay } from "./TimerDisplay";
import styles from "./Timer.module.css";
import type { Timer } from "../types/timer";
import { useState } from "react";
import { TimerSettings } from "./TimerSettings";
import { useUIContext } from "../hooks/useUIContext";

interface Props {
  timer: Timer;
}
export function Timer({ timer }: Props) {
  const { toggleTimer, resetTimer, removeTimer } = useTimerStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isExpanded } = useUIContext();

  const progress = (1 - timer.remainingTime / timer.duration) * 100;

  return (
    <>
      <div
        className={styles.row}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
      >
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
          {isExpanded && (
            <button
              className={styles.btn}
              data-active={settingsOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSettingsOpen((prev) => !prev);
              }}
            >
              <Settings size={14} />
            </button>
          )}
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
      {settingsOpen && <TimerSettings timerId={timer.id} />}
    </>
  );
}
