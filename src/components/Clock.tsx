import { useClock } from "../hooks/useClock";
import styles from "./Clock.module.css";
export function Clock() {
  const { formattedTime } = useClock();

  return (
    <div className={styles.clock}>
      <span className={styles.time}>{formattedTime}</span>
    </div>
  );
}
