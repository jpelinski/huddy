import { Trash2, BookmarkCheck } from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";
import styles from "./PresetList.module.css";

export function PresetList() {
  const { presets, addTimer, removePreset } = useTimerStore();

  if (presets.length === 0) {
    return <p className={styles.empty}>No presets saved</p>;
  }
  return (
    <div className={styles.list}>
      {presets.map((preset) => (
        <div key={preset.id} className={styles.presetRow}>
          <button
            key={preset.id}
            className={styles.presetBtn}
            onClick={() => addTimer(preset)}
          >
            <span>
              <BookmarkCheck size={14} />
              <span className={styles.name}>{preset.name}</span>
            </span>
            <span className={styles.duration}>{formatTime(preset.duration)}</span>
          </button>
          <button
            className={styles.removeBtn}
            onClick={(e) => {
              e.stopPropagation();
              removePreset(preset.id);
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
