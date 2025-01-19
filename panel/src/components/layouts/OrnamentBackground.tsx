import React from "react";
import styles from "./OrnamentBackground.module.css";

interface OrnamentBackgroundProps {
  children: React.ReactNode;
  size: number;
}

const OrnamentBackground: React.FC<OrnamentBackgroundProps> = ({
  children,
  size,
}) => {
  return (
    <div className={styles.ornamentBackground}>
      <div
        className={`${styles.ornament} ${styles["top-left"]}`}
        style={{ width: size, height: size }}
      />
      <div
        className={`${styles.ornament} ${styles["top-right"]}`}
        style={{ width: size, height: size }}
      />
      <div
        className={`${styles.ornament} ${styles["bottom-left"]}`}
        style={{ width: size, height: size }}
      />
      <div
        className={`${styles.ornament} ${styles["bottom-right"]}`}
        style={{ width: size, height: size }}
      />
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
};

export default OrnamentBackground;
