import React, { FC, useState } from "react";
import { AppSettings, useSound } from "../../App";

import styles from "./SettingsDialog.module.css";
import { CrossIcon } from "../Icon";

interface SettingsDialogProps {
  open?: boolean;
  settings: AppSettings;
  onClose: () => void;
  onSave: (settings: AppSettings) => void;
}

export const SettingsDialog: FC<SettingsDialogProps> = ({
  open = false,
  onClose,
  settings: readOnlySettings,
  onSave,
}) => {
  const [settings, setSettings] = useState(readOnlySettings);
  const {
    timer: { pomodoro, longBreak, shortBreak },
    alarms,
  } = settings;
  const audio = useSound("");

  const handleChangeTimer = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const elem = evt.target;
    const { settingsGroup, settingsProperty } = elem.dataset;

    setSettings({
      ...settings,
      [settingsGroup as string]: {
        ...settings[settingsGroup as keyof AppSettings],
        [settingsProperty as string]: {
          key: settingsProperty,
          value: +elem.value,
        },
      },
    });
  };

  const handleChangeAlarm = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: selected } = evt.target;

    audio.changeSource(selected);
    audio.play();

    setSettings({
      ...settings,
      alarms: {
        ...settings.alarms,
        selected,
      },
    });
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <>
      {open && (
        <div className={styles.dialogWrapper} onClick={onClose}>
          <div
            className={styles.dialogContent}
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <h3>Settings</h3>
              <span onClick={onClose}>
                <CrossIcon className={styles.icon} />
              </span>
            </header>

            <div className={styles.minuteSettings} onChange={handleChangeTimer}>
              <p>Custom Time (Minutes)</p>

              <div>
                <label htmlFor="pomodoro">Pomodoro</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  data-settings-group="timer"
                  data-settings-property="pomodoro"
                  id="pomodoro"
                  defaultValue={pomodoro.value}
                />
              </div>

              <div>
                <label htmlFor="short-break">Short Break</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  data-settings-group="timer"
                  data-settings-property="shortBreak"
                  id="short-break"
                  defaultValue={shortBreak.value}
                />
              </div>

              <div>
                <label htmlFor="long-break">Long Break</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  data-settings-group="timer"
                  data-settings-property="longBreak"
                  id="long-break"
                  defaultValue={longBreak.value}
                />
              </div>
            </div>

            <div className="alarm">
              <p>Alarm Sound</p>

              <select
                defaultValue={alarms.selected}
                onChange={handleChangeAlarm}
              >
                {Object.entries(alarms)
                  .filter(([key]) => key !== "selected")
                  .map(([key, alarm]) => (
                    <option key={key} value={key}>
                      {alarm}
                    </option>
                  ))}
              </select>
            </div>

            <footer>
              <button onClick={handleSave}>Save</button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};
