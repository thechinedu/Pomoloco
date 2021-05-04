import { useState } from "react";

const timers = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
};

const getOutput = (timer: number) => {
  return "25:00";
};

export const Timer = () => {
  const [timer, setTimer] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const output = getOutput(timer.pomodoro);

  return (
    <div>
      <div>
        <button>Pomodoro</button>
        <button>Short break</button>
        <button>Long break</button>
      </div>

      <div>{output}</div>

      <div>
        <button>Start</button>
        <button>Reset</button>
      </div>
    </div>
  );
};
