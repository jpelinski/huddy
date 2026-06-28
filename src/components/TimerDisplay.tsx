import { useRef, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";
import styles from "./TimerDisplay.module.css";

interface Props {
  timerId: string;
}
export function TimerDisplay({ timerId }: Props) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  const { updateTimer } = useTimerStore();
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(timer?.name || "");
  const [editingTime, setEditingTime] = useState(false);
  const [time, setTime] = useState({ hh: "00", mm: "00", ss: "00" });

  const hhRef = useRef<HTMLInputElement>(null);
  const mmRef = useRef<HTMLInputElement>(null);
  const ssRef = useRef<HTMLInputElement>(null);

  useTimer(timerId);

  if (!timer) return null;

  const handleNameClick = () => {
    setName(timer.name);
    setEditingName(true);
  };
  const handleNameChange = () => {
    updateTimer(timerId, { name: name.trim() || timer.name });
    setEditingName(false);
  };

  const handleTimeClick = () => {
    if (timer.isRunning) return;
    setTime((prev) => ({ ...prev, mm: "30" }));
    setEditingTime(true);
  };
  const handleTimeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.key))) return;
    e.preventDefault();

    const currentTime = time.replace(/[^0-9]/g, "");
    const newTime = (currentTime + e.key).slice(-6).padStart(6, "0");
    const hh = newTime.slice(0, 2);
    const mm = newTime.slice(2, 4);
    const ss = newTime.slice(4, 6);

    setTime(`${hh}:${mm}:${ss}`);
  };
  const handleTimeChange = () => {
    const [hh, mm, ss] = time.split(":").map(Number);
    const duration = hh * 3600 + mm * 60 + ss;
    updateTimer(timerId, { duration: duration, remainingTime: duration });
    setEditingTime(false);
  };
  return (
    <div className={`${styles.timer} ${timer.isFinished ? styles.finished : ""}`}>
      {editingTime ? (
        <input
          className={styles.timeInput}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={handleTimeChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTimeChange();
            if (e.key === "Escape") setEditingTime(false);
            handleTimeInput(e);
          }}
          autoFocus
        />
      ) : (
        <span className={styles.time} onClick={handleTimeClick}>
          {formatTime(timer.remainingTime)}
        </span>
      )}
      {editingName ? (
        <input
          className={styles.nameInput}
          value={name}
          size={name.length || 1}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => e.currentTarget.select()}
          onBlur={handleNameChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleNameChange();
            if (e.key === "Escape") setEditingName(false);
          }}
          autoFocus
        />
      ) : (
        <span className={styles.label} onClick={handleNameClick}>
          {timer.name}
        </span>
      )}
    </div>
  );
}
