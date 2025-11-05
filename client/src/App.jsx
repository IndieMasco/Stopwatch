import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
  const [isTicking, setIsTicking] = useState(false);
  const [timeAmount, setTimeAmount] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const handleStartStop = () => {
    setIsTicking((prev) => !prev);
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTicking(false);
    setTimeAmount(0);
    timerRef.current = null;
    startTimeRef.current = 0;
  };

  useEffect(() => {
    if (isTicking) {
      startTimeRef.current = Date.now() - timeAmount;
      timerRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        setTimeAmount(elapsedTime);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTicking, timeAmount]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, "0");
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const timerMessage = isTicking
    ? `Timer started: ${formatTime(timeAmount)}`
    : timeAmount === 0
    ? `00:00:00`
    : `Timer paused: ${formatTime(timeAmount)}`;

  return (
    <>
      <h2>Stopwatch</h2>

      <p>{timerMessage}</p>

      <button onClick={handleStartStop}>
        {isTicking ? "Pause" : timeAmount > 0 ? "Resume" : "Start"}
      </button>

      <button onClick={handleReset} disabled={timeAmount === 0 && !isTicking}>
        Reset
      </button>
    </>
  );
}
