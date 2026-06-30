import styles from "./TimerList.module.css";
import { useTimerStore } from "../store/timerStore";
import { Timer } from "./Timer";

interface Props {
  isExpanded: boolean;
}

export function TimerList({ isExpanded }: Props) {
  const { timers } = useTimerStore();

  return (
    <div className={styles.timerList}>
      {timers.map((timer) => (
        <Timer key={timer.id} timer={timer} />
      ))}
    </div>
  );
}
