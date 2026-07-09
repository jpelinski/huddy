import { Minus, Plus, X, FolderBookmark, LucideClock } from "lucide-react";
import styles from "./HeadBar.module.css";
import { useState } from "react";
import { PresetList } from "./PresetList";
import { useUIStore } from "../store/UIStore";

interface Props {
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onAddTimer: () => void;
}

export function HeadBar({ onDoubleClick, onAddTimer }: Props) {
  const [presetListOpen, setPresetListOpen] = useState(false);
  const { clockVisible, setClockVisible } = useUIStore();

  return (
    <div className={styles.headbarWrapper}>
      <div className={styles.headbar} onDoubleClick={onDoubleClick}>
        <button className={styles.btn} onClick={onAddTimer}>
          <Plus size={14} />
        </button>
        <button className={styles.btn} onClick={() => setPresetListOpen((prev) => !prev)}>
          <FolderBookmark size={14} />
        </button>
        <div className={styles.headbar__title}>Huddy</div>
        <button className={styles.btn} onClick={() => window.api.minimize()}>
          <Minus size={14} />
        </button>
        <button
          className={`${styles.btn} ${styles.btnClose}`}
          onClick={() => window.api.close()}
        >
          <X size={14} />
        </button>
      </div>
      <div className={styles.headbar__underbar}>
        <button
          className={styles.btn}
          data-active={clockVisible}
          onClick={() => setClockVisible(!clockVisible)}
        >
          <LucideClock size={14} />
        </button>
      </div>
      {presetListOpen && (
        <div className={styles.presetPanel}>
          <PresetList />
        </div>
      )}
    </div>
  );
}
