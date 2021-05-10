import { FC } from "react";

import styles from "./Dialog.module.css";

interface DialogProps {
  open?: boolean;
}

export const Dialog: FC<DialogProps> = ({ open = false }) => (
  <>{open && <div className={styles.dialog}>fufu</div>}</>
);
