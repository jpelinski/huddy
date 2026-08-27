import { useClock } from "../hooks/useClock";
import styles from "./Clock.module.css";
import btnStyles from "../styles/buttons.module.css";
import { Plus, FolderBookmark, LucideClock, Settings } from "lucide-react";
import { useState } from "react";
import { useUIStore } from "../store/UIStore";

interface Props {
  onAddTimer: () => void;
}

export function Clock({ onAddTimer }: Props) {
  const { formattedTime } = useClock();
  const [presetListOpen, setPresetListOpen] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftButtons}>
        <button
          className={btnStyles.btn}
          onClick={onAddTimer}
          // onMouseEnter={() => setHoverLabel("Add Timer")}
          // onMouseLeave={() => setHoverLabel(null)}
        >
          <Plus size={14} />
        </button>
        <button
          className={btnStyles.btn}
          data-active={presetListOpen}
          onClick={() => setPresetListOpen((prev) => !prev)}
          // onMouseEnter={() => setHoverLabel("Preset List")}
          // onMouseLeave={() => setHoverLabel(null)}
        >
          <FolderBookmark size={14} />
        </button>
      </div>
      <div className={styles.clock}>
        <span className={styles.time}>{formattedTime}</span>
      </div>
      <div className={styles.rightButtons}>
        <button
          className={btnStyles.btn}
          data-active={settingsOpen}
          onClick={() => setSettingsOpen((prev) => !prev)}
          // onMouseEnter={() => setHoverLabel("Settings")}
          // onMouseLeave={() => setHoverLabel(null)}
        >
          <Settings size={14} />
        </button>
      </div>
    </div>
  );
}
