import { Play, Pause, RotateCcw, Trash2, Settings } from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { TimerDisplay } from "./TimerDisplay";
import styles from "./Timer.module.css";
import type { Timer } from "../types/timer";

import { TimerSettings } from "./TimerSettings";
import { useUIContext } from "../hooks/useUIContext";
import { useUIStore } from "../store/UIStore";

interface Props {
  timer: Timer;
}
export function Timer({ timer }: Props) {
  const { toggleTimer, resetTimer, removeTimer } = useTimerStore();
  const { openSettingsId, setOpenSettingsId, isExpanded } = useUIStore();

  const progress = (1 - timer.remainingTime / timer.duration) * 100;

  return (
    <>
      <div
        className={styles.row + (timer.isFinished ? " " + styles.finished : "")}
        style={
          {
            "--progress": `${progress}%`,
            "--timer-color": timer.color || "none",
          } as React.CSSProperties
        }
      >
        {timer.isFinished ? (
          <button
            className={styles.btn}
            onClick={(e) => {
              e.stopPropagation();
              resetTimer(timer.id);
            }}
          >
            <RotateCcw size={14} />
          </button>
        ) : (
          <button
            className={styles.btn}
            onClick={(e) => {
              e.stopPropagation();
              toggleTimer(timer.id);
            }}
          >
            {timer.isRunning ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}

        <TimerDisplay timerId={timer.id} />
        <div className={styles.btnGroup}>
          {isExpanded && (
            <button
              className={styles.btn}
              data-active={openSettingsId === timer.id}
              onClick={(e) => {
                e.stopPropagation();
                setOpenSettingsId(openSettingsId === timer.id ? null : timer.id);
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
      {openSettingsId === timer.id && <TimerSettings timerId={timer.id} />}
    </>
  );
}
