import { Minus, Plus, X, FolderBookmark, LucideClock, Settings } from "lucide-react";
import styles from "./HeadBar.module.css";
import btnStyles from "../styles/buttons.module.css";
import { useState } from "react";
import { PresetList } from "./PresetList";
import { useUIStore } from "../store/UIStore";
import { AnimatePresence, motion } from "framer-motion";
import { AppSettings } from "./AppSettings";
interface Props {
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onAddTimer: () => void;
}

export function HeadBar({ onDoubleClick, onAddTimer }: Props) {
  const [presetListOpen, setPresetListOpen] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const { clockVisible, setClockVisible } = useUIStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.headbarWrapper}>
      <div className={styles.headbar} onDoubleClick={onDoubleClick}>
        <button
          className={btnStyles.btn}
          onClick={onAddTimer}
          onMouseEnter={() => setHoverLabel("Add Timer")}
          onMouseLeave={() => setHoverLabel(null)}
        >
          <Plus size={14} />
        </button>
        <button
          className={btnStyles.btn}
          data-active={presetListOpen}
          onClick={() => setPresetListOpen((prev) => !prev)}
          onMouseEnter={() => setHoverLabel("Preset List")}
          onMouseLeave={() => setHoverLabel(null)}
        >
          <FolderBookmark size={14} />
        </button>
        <div className={styles.headbar__title}>
          <AnimatePresence mode="wait">
            <motion.span
              key={hoverLabel ?? "Huddy"}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {hoverLabel ?? "Huddy"}
            </motion.span>
          </AnimatePresence>
        </div>
        <button className={btnStyles.btn} onClick={() => window.api.minimize()}>
          <Minus size={14} />
        </button>
        <button
          className={`${btnStyles.btn} ${btnStyles.btnClose}`}
          onClick={() => window.api.close()}
        >
          <X size={14} />
        </button>
      </div>
      <div className={styles.headbar__underbar}>
        <button
          className={btnStyles.btn}
          data-active={clockVisible}
          onClick={() => setClockVisible(!clockVisible)}
          onMouseEnter={() => setHoverLabel("Clock On/Off")}
          onMouseLeave={() => setHoverLabel(null)}
        >
          <LucideClock size={14} />
        </button>
        <button
          className={btnStyles.btn}
          data-active={settingsOpen}
          onClick={() => setSettingsOpen((prev) => !prev)}
          onMouseEnter={() => setHoverLabel("Settings")}
          onMouseLeave={() => setHoverLabel(null)}
        >
          <Settings size={14} />
        </button>
      </div>
      {settingsOpen && (
        <div className={styles.settingsPanel}>
          <AppSettings />
        </div>
      )}
      {presetListOpen && (
        <div className={styles.presetPanel}>
          <PresetList />
        </div>
      )}
    </div>
  );
}
