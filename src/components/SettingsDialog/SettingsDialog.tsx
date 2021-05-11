import React, { FC, useState } from "react";
import { AppSettings } from "../../App";

import styles from "./SettingsDialog.module.css";
import { Icon } from "./CrossIcon";

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

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const elem = evt.target;
    const { settingsGroup, settingsProperty } = elem.dataset;

    setSettings({
      ...settings,
      [settingsGroup as string]: {
        ...settings[settingsGroup as keyof AppSettings],
        [settingsProperty as string]: +elem.value,
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
                <Icon className={styles.icon} />
              </span>
            </header>

            <div className={styles.minuteSettings} onChange={handleChange}>
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
                  defaultValue={settings.timer.pomodoro}
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
                  defaultValue={settings.timer.shortBreak}
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
                  defaultValue={settings.timer.longBreak}
                />
              </div>
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
