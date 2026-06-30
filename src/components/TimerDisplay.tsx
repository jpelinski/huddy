import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";
import styles from "./TimerDisplay.module.css";
import { useEditTime } from "../hooks/useEditTime";
import { useEditName } from "../hooks/useEditName";

interface Props {
  timerId: string;
}
export function TimerDisplay({ timerId }: Props) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  const { toggleTimer } = useTimerStore();

  const editTime = useEditTime(timerId);
  const editName = useEditName(timerId);

  useTimer(timerId);

  if (!timer) return null;

  return (
    <div className={`${styles.timer} ${timer.isFinished ? styles.finished : ""}`}>
      {editTime.editing ? (
        <div
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              editTime.handlers.saveTime();
            }
          }}
        >
          <input
            ref={editTime.refs.hhRef}
            className={styles.timeInput}
            value={editTime.time.hh}
            onFocus={(e) => e.currentTarget.select()}
            onKeyDown={(e) => {
              editTime.handlers.handleKeyDown(e, "hh", editTime.refs.mmRef);
            }}
            readOnly
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            ref={editTime.refs.mmRef}
            className={styles.timeInput}
            value={editTime.time.mm}
            onFocus={(e) => e.currentTarget.select()}
            onKeyDown={(e) => {
              editTime.handlers.handleKeyDown(
                e,
                "mm",
                editTime.refs.ssRef,
                editTime.refs.hhRef,
              );
            }}
            readOnly
            autoFocus
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            ref={editTime.refs.ssRef}
            className={styles.timeInput}
            value={editTime.time.ss}
            onFocus={(e) => e.currentTarget.select()}
            onKeyDown={(e) => {
              editTime.handlers.handleKeyDown(e, "ss", undefined, editTime.refs.mmRef);
            }}
            readOnly
          />
        </div>
      ) : (
        <span
          className={styles.time}
          onClick={() => {
            timer.isRunning ? toggleTimer(timerId) : null;
            editTime.handlers.editingStart(timer.remainingTime);
          }}
        >
          {formatTime(timer.remainingTime)}
        </span>
      )}
      {editName.editing ? (
        <input
          className={styles.nameInput}
          value={editName.updatedName}
          size={editName.updatedName.length || 1}
          onChange={(e) => editName.setUpdatedName(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={editName.handlers.save}
          onKeyDown={editName.handlers.handleKeyDown}
          autoFocus
        />
      ) : (
        <span className={styles.name} onClick={editName.handlers.editingStart}>
          {timer.name}
        </span>
      )}
    </div>
  );
}
