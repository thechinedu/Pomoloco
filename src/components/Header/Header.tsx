import logo from "./logo.png";

import styles from "./Header.module.css";

export const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="Site logo" className={styles.img} />
        Pomoloco
      </a>

      <button className={styles.settings}>Settings</button>
    </nav>
  </header>
);
