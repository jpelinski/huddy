import styles from "./TimerList.module.css";
import { useTimerStore } from "../store/timerStore";
import { Timer } from "./Timer";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  isExpanded: boolean;
}

export function TimerList({ isExpanded }: Props) {
  const { timers } = useTimerStore();

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
