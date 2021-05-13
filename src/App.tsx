import { useState, createContext, FC } from "react";
import { Header } from "./components/Header/Header";
import { Timer } from "./components/Timer/Timer";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { SettingsDialog } from "./components/SettingsDialog/SettingsDialog";
import { useContext } from "react";

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
  alarms: {
    [key: string]: string;
    selected: string;
  };
}

const AudioContext = createContext<HTMLAudioElement | null>(null);

const AudioProvider: FC = ({ children }) => {
  const audio = new Audio();

  return (
    <AudioContext.Provider value={audio as HTMLAudioElement}>
      {children}
    </AudioContext.Provider>
  );
};

export const useSound = (fileName: string) => {
  const audio = useContext(AudioContext);
  const baseUrl = `${process.env.PUBLIC_URL}/audio`;
  let source = `${baseUrl}/${fileName}.wav`;

  if (!audio) {
    throw new Error("useSound must be used within an AudioProvider component");
  }

  return {
    play() {
      audio.src = "";
      audio.src = source;
      audio.play();
    },
    stop() {
      audio.src = "";
    },
    changeSource(fileName: string) {
      source = `${baseUrl}/${fileName}.wav`;
    },
  };
};

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
    alarms: {
      alert: "Alert",
      battleship: "Battleship",
      bell: "Bell",
      bird: "Bird",
      "morning-clock-alarm": "Morning Clock",
      rooster: "Rooster",
      "sci-fi": "Science Fiction",
      selected: "battleship",
    },
  });

  return (
    <Wrapper>
      <Header showDialog={() => setIsDialogOpen(true)} />
      <AudioProvider>
        <Timer timer={settings.timer} alarmSound={settings.alarms.selected} />
        <SettingsDialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          settings={settings}
          onSave={(newSettings: AppSettings) => {
            setSettings(newSettings);
          }}
        />
      </AudioProvider>
    </Wrapper>
  );
};
export default App;
