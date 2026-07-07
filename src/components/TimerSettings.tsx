import { HexColorPicker } from "react-colorful";
import { Bookmark } from "lucide-react";
import styles from "./TimerSettings.module.css";
import { useTimerStore } from "../store/timerStore";
import { useState } from "react";

export function TimerSettings({ timerId }: { timerId: string }) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  const { addPreset, updateTimer } = useTimerStore();
  const [color, setColor] = useState(timer?.color || "none");

  if (!timer) {
    return null;
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateTimer(timer.id, { color: newColor });
  };

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
      <div onMouseDown={(e) => e.stopPropagation()} className={styles.colorPicker}>
        <HexColorPicker color={color} onChange={handleColorChange} />
      </div>
    </div>
  );
}
