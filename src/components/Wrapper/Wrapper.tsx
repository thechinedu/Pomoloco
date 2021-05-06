import { FC } from "react";

import styles from "./Wrapper.module.css";

export const Wrapper: FC = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);
