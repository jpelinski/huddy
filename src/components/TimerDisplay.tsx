import { useTimer } from "../hooks/useTimer";
import { useTimerStore } from "../store/timerStore";
import { formatTime } from "../utils/formatTime";

interface Props {
  timerId: string;
}
export function TimerDisplay({ timerId }: Props) {
  const timer = useTimerStore((state) => state.timers.find((t) => t.id === timerId));
  useTimer(timerId);

  if (!timer) return null;

  return (
    <div>
      <h2>{timer.name}</h2>
      <p>{formatTime(timer.remainingTime)}</p>
      <p>
        Status: {timer.isRunning ? "Running" : timer.isFinished ? "Finished" : "Paused"}
      </p>
    </div>
  );
}
