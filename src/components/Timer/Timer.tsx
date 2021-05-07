import { useRef } from "react";
import { useState, useEffect } from "react";

import styles from "./Timer.module.css";

enum PomodoroDefaultTimers {
  pomodoro = 25,
  longBreak = 15,
  shortBreak = 5,
}

const padTimer = (timer: number) => `${timer}`.padStart(2, "0");

const getOutput = (timeLeft: number, baseDisplay: string) => {
  const timerAsDate = new Date(timeLeft);
  const minutesLeft = padTimer(timerAsDate.getMinutes());
  const secondsLeft = padTimer(timerAsDate.getSeconds());
  const display = `${minutesLeft}:${secondsLeft}`;

  return timeLeft ? display : baseDisplay;
};

export const Timer = () => {
  const [timer] = useState({
    pomodoro: PomodoroDefaultTimers.pomodoro,
    longBreak: PomodoroDefaultTimers.longBreak,
    shortBreak: PomodoroDefaultTimers.shortBreak,
  });
  const [activeTimer, setActiveTimer] = useState(timer.pomodoro);
  const [timeLeft, setTimeLeft] = useState(0);
  const output = getOutput(timeLeft, `${padTimer(activeTimer)}:00`);
  const intervalRef = useRef<number>();

  const handleSetActiveTimer = (type: keyof typeof timer) => () => {
    setActiveTimer(timer[type]);
    setTimeLeft(0);
  };

  const handleStartTimer = () => {
    if (timeLeft) {
      setTimeLeft(timeLeft - 1000);
      return;
    }

    const end = Date.now() + activeTimer * 1000 * 60;
    const start = Date.now();

    setTimeLeft(end - start);
  };

  const handleStopTimer = () => {
    setTimeLeft(0);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (timeLeft) {
      intervalRef.current = (setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000) as unknown) as number;
    }

    if (timeLeft <= 0) clearInterval(intervalRef.current);

    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.timers}>
        <button
          onClick={handleSetActiveTimer("pomodoro")}
          className={
            activeTimer === PomodoroDefaultTimers.pomodoro ? styles.active : ""
          }
        >
          Pomodoro
        </button>
        <button
          onClick={handleSetActiveTimer("shortBreak")}
          className={
            activeTimer === PomodoroDefaultTimers.shortBreak
              ? styles.active
              : ""
          }
        >
          Short break
        </button>
        <button
          onClick={handleSetActiveTimer("longBreak")}
          className={
            activeTimer === PomodoroDefaultTimers.longBreak ? styles.active : ""
          }
        >
          Long break
        </button>
      </div>

      <p className={styles.timerDisplay}>{output}</p>

      <div className={styles.controls}>
        <button onClick={handleStartTimer} className={styles.start}>
          Start
        </button>
        <button onClick={handlePauseTimer} className={styles.pause}>
          Pause
        </button>
        <button onClick={handleStopTimer} className={styles.reset}>
          Reset
        </button>
      </div>
    </main>
  );
};
