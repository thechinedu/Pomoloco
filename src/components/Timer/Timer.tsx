import { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { AppSettings, useSound } from "../../App";

import styles from "./Timer.module.css";

interface TimerProps {
  timer: AppSettings["timer"];
  alarmSound: string;
}

type ActiveTimer =
  | TimerProps["timer"]["pomodoro"]
  | TimerProps["timer"]["longBreak"]
  | TimerProps["timer"]["shortBreak"];

const padTimer = (timer: number) => `${timer}`.padStart(2, "0");

const getOutput = (timeLeft: number, baseDisplay: string) => {
  const timerAsDate = new Date(timeLeft);
  const minutesLeft = padTimer(timerAsDate.getMinutes());
  const secondsLeft = padTimer(timerAsDate.getSeconds());
  const display = `${minutesLeft}:${secondsLeft}`;

  return timeLeft ? display : baseDisplay;
};

export const Timer: FC<TimerProps> = ({ timer: readOnlyTimer, alarmSound }) => {
  const [timer, setTimer] = useState(readOnlyTimer);
  const [activeTimer, setActiveTimer] = useState<ActiveTimer>(timer.pomodoro);
  const [timeLeft, setTimeLeft] = useState(0);
  const output = getOutput(timeLeft, `${padTimer(activeTimer.value)}:00`);
  const intervalRef = useRef<number>();
  const timerCompleteSound = useSound(alarmSound);
  const clickSound = useSound("click");

  const handleSetActiveTimer = (type: keyof typeof timer) => () => {
    timerCompleteSound.stop();
    setActiveTimer(timer[type]);
    setTimeLeft(0);
  };

  const handleStartTimer = () => {
    if (timeLeft) {
      setTimeLeft(timeLeft - 1000);
      return;
    }

    const end = Date.now() + activeTimer.value * 1000 * 60;
    const start = Date.now();

    setTimeLeft(end - start);
  };

  const handleStopTimer = () => {
    intervalRef.current = undefined;
    setTimeLeft(0);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const playClickSound = () => clickSound.play();

  useEffect(() => {
    if (timeLeft) {
      intervalRef.current = (setInterval(() => {
        setTimeLeft(timeLeft - 1000);
      }, 1000) as unknown) as number;
    }

    if (timeLeft <= 0 && intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
      timerCompleteSound.play();
    }

    return () => clearInterval(intervalRef.current);
  }, [timeLeft, timerCompleteSound]);

  useEffect(() => {
    setTimer(readOnlyTimer);
    setActiveTimer(readOnlyTimer[activeTimer.key]);
  }, [readOnlyTimer, activeTimer]);

  return (
    <main className={styles.wrapper}>
      <div className={styles.timers}>
        <button
          onClick={handleSetActiveTimer("pomodoro")}
          className={
            activeTimer.key === timer.pomodoro.key ? styles.active : ""
          }
        >
          Pomodoro
        </button>
        <button
          onClick={handleSetActiveTimer("shortBreak")}
          className={
            activeTimer.key === timer.shortBreak.key ? styles.active : ""
          }
        >
          Short break
        </button>
        <button
          onClick={handleSetActiveTimer("longBreak")}
          className={
            activeTimer.key === timer.longBreak.key ? styles.active : ""
          }
        >
          Long break
        </button>
      </div>

      <p className={styles.timerDisplay}>{output}</p>

      <div className={styles.controls} onClick={playClickSound}>
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
