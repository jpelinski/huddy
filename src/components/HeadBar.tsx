import { Minus, X, LucideClock, Settings } from "lucide-react";
import styles from "./HeadBar.module.css";
import btnStyles from "../styles/buttons.module.css";
// import { PresetList } from "./PresetList";
import { AnimatePresence, motion } from "framer-motion";
// import { AppSettings } from "./AppSettings";
import { Monitor } from "./Monitor";
// import { useState } from "react";
interface Props {
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onAddTimer: () => void;
}

export function HeadBar({ onDoubleClick }: Props) {
  // const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  return (
    <div className={styles.headbarWrapper}>
      <div className={styles.headbar} onDoubleClick={onDoubleClick}>
        <Monitor />
        <AnimatePresence mode="wait">
          <motion.span
            // key={hoverLabel ?? "Huddy"}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* {hoverLabel ?? "Huddy"} */ "Huddy"}
          </motion.span>
        </AnimatePresence>
        <div className={styles.headbar__buttons}>
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
      </div>
      <div className={styles.headbar__underbar}></div>
      {/* {settingsOpen && (
        <div className={styles.settingsPanel}>
          <AppSettings />
        </div>
      )}
      {presetListOpen && (
        <div className={styles.presetPanel}>
          <PresetList />
        </div>
      )} */}
    </div>
  );
}
