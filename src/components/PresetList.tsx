import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";
import styles from "./PresetList.module.css";

export function PresetList() {
  const { presets, addTimer } = useTimerStore();

  if (presets.length === 0) {
    return <p className={styles.empty}>No presets saved</p>;
  }
  return (
    <div className={styles.list}>
      {presets.map((preset) => (
        <button
          key={preset.id}
          className={styles.presetBtn}
          onClick={() => addTimer(preset)}
        >
          <span className={styles.name}>{preset.name}</span>
          <span className={styles.duration}>{formatTime(preset.duration)}</span>
        </button>
      ))}
    </div>
  );
}
