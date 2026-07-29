import { HexColorPicker } from "react-colorful";
import { Save } from "lucide-react";
import styles from "./TimerSettings.module.css";
import btnStyles from "../styles/buttons.module.css";
import { useTimerStore } from "../store/timerStore";
import { useState } from "react";

const PRESET_COLORS = ["#a08c3a", "#4a7c59", "#2d6a8f"];

export function TimerSettings({ timerId }: { timerId: string }) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  const { addPreset, updateTimer } = useTimerStore();
  const [color, setColor] = useState(timer?.color || "none");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  if (!timer) {
    return null;
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateTimer(timer.id, { color: newColor });
  };

  return (
    <div className={styles.timerSettings}>
      <div className={styles.colorSection}>
        <span className={styles.colorLabel}>COLOR</span>
        <div className={styles.colorOptions}>
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor}
              className={`${btnStyles.btn} ${btnStyles.colorButtons}`}
              style={{
                backgroundColor: presetColor,
              }}
              data-activeBorder={color === presetColor}
              onClick={(e) => {
                e.stopPropagation();
                handleColorChange(presetColor);
              }}
            ></button>
          ))}
          <button
            className={`${btnStyles.btn} ${btnStyles.textButtons}`}
            style={{}}
            onClick={(e) => {
              e.stopPropagation();
              handleColorChange("none");
            }}
          >
            Reset
          </button>
          <button
            className={`${btnStyles.btn} ${btnStyles.textButtons}`}
            data-active={isColorPickerOpen}
            onClick={(e) => {
              e.stopPropagation();
              setIsColorPickerOpen(!isColorPickerOpen);
            }}
          >
            Picker
          </button>
        </div>
      </div>
      {isColorPickerOpen && (
        <div onMouseDown={(e) => e.stopPropagation()} className={styles.colorPicker}>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
      <button
        className={`${btnStyles.btn} ${btnStyles.outlinedButton}`}
        onClick={(e) => {
          e.stopPropagation();
          addPreset({ name: timer.name, duration: timer.duration, color: timer.color });
        }}
      >
        <Save size={14} />
        <span style={{ marginLeft: "0.3rem", fontSize: "0.7rem" }}>Save preset</span>
      </button>
    </div>
  );
}
