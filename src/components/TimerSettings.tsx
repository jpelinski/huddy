import { Bookmark } from "lucide-react";
import styles from "./TimerSettings.module.css";
import { useTimerStore } from "../store/timerStore";

export function TimerSettings({ timerId }: { timerId: string }) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  const { addPreset } = useTimerStore();

  if (!timer) {
    return null;
  }

  return (
    <div className={styles.timerSettings}>
      <button
        className={styles.btn}
        onClick={(e) => {
          e.stopPropagation();
          addPreset({ name: timer.name, duration: timer.duration });
        }}
      >
        <Bookmark size={14} />
        <span className={styles.btnText}>Save preset</span>
      </button>
    </div>
  );
}
