import { FC } from "react";
import logo from "./logo.png";

import styles from "./Header.module.css";
import { Icon } from "./SettingsIcon";

interface HeaderProps {
  showDialog: () => void;
}

export const Header: FC<HeaderProps> = ({ showDialog }) => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="Site logo" className={styles.img} />
        Pomoloco
      </a>

      <button className={styles.settings} onClick={showDialog}>
        <Icon className={styles.settingsIcon} />
        Settings
      </button>
    </nav>
  </header>
);
