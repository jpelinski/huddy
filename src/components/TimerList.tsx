import styles from "./TimerList.module.css";
import { useTimerStore } from "../store/timerStore";
import { Timer } from "./Timer";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore } from "../store/UIStore";
import { useEffect } from "react";

export function TimerList() {
  const { setIsExpanded } = useUIStore();
  const { timers } = useTimerStore();

  useEffect(() => {
    if (timers.length === 0) {
      setIsExpanded(true);
    }
  }, [timers.length]);

  return (
    <div className={styles.timerList}>
      <AnimatePresence>
        {timers.map((timer) => (
          <motion.div
            key={timer.id}
            initial={{ height: 0, opacity: 0, width: 0 }}
            animate={{ height: "auto", opacity: 1, width: "100%" }}
            exit={{ height: 0, opacity: 0, width: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <Timer key={timer.id} timer={timer} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
