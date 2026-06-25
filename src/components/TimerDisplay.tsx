import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";
import styles from "./TimerDisplay.module.css";

interface Props {
  timerId: string;
}
export function TimerDisplay({ timerId }: Props) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  useTimer(timerId);

  if (!timer) return null;

  return (
    <div className={`${styles.timer} ${timer.isFinished ? styles.finished : ""}`}>
      <span className={styles.time}>{formatTime(timer.remainingTime)}</span>
      <span className={styles.label}>{timer.name}</span>
    </div>
  );
}
