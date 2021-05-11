import { useState, FC } from "react";
import { Header } from "./components/Header/Header";
import { Timer } from "./components/Timer/Timer";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { SettingsDialog } from "./components/SettingsDialog/SettingsDialog";

export enum PomodoroDefaultTimers {
  pomodoro = 25,
  longBreak = 15,
  shortBreak = 5,
}

export interface AppSettings {
  timer: {
    pomodoro: { key: "pomodoro"; value: number };
    shortBreak: { key: "shortBreak"; value: number };
    longBreak: { key: "longBreak"; value: number };
  };
}

const App: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    timer: {
      pomodoro: { key: "pomodoro", value: PomodoroDefaultTimers.pomodoro },
      longBreak: { key: "longBreak", value: PomodoroDefaultTimers.longBreak },
      shortBreak: {
        key: "shortBreak",
        value: PomodoroDefaultTimers.shortBreak,
      },
    },
  });

  return (
    <Wrapper>
      <Header showDialog={() => setIsDialogOpen(true)} />
      <Timer timer={settings.timer} />
      <SettingsDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        settings={settings}
        onSave={(newSettings: AppSettings) => {
          setSettings(newSettings);
        }}
      />
    </Wrapper>
  );
};
export default App;
