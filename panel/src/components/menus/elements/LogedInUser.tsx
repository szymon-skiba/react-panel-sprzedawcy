import React from "react";
import styles from "./LogedInUser.module.css";
import OrnamentBackground from "../../layouts/OrnamentBackground";

interface LogedInUserProps {
  username: string;
  photo?: string;
  width?: number;
  ornamentSize?: number;
  fontSizeLabel?: number;
  backgroundColor?: string;
}

const LogedInUser: React.FC<LogedInUserProps> = ({
  username,
  photo,
  width = 120,
  ornamentSize = 30,
  fontSizeLabel = 12,
  backgroundColor = "var(--blue-3)",
}) => {
  const adjustedWidth = width - 30;

  return (
    <div
      className={styles.wrapper}
      style={{ width: `${width}px`, backgroundColor: backgroundColor }}
    >
      <OrnamentBackground size={ornamentSize}>
        <div className={styles.userinfo}>
          {photo && (
            <img
              src={photo}
              className={styles.photo}
              alt={`${username}'s profile`}
            />
          )}
          <label
            className={styles.username}
            style={{
              maxWidth: `${adjustedWidth}px`,
              fontSize: `${fontSizeLabel}px`,
            }}
          >
            {username}
          </label>
        </div>
      </OrnamentBackground>
    </div>
  );
};

export default LogedInUser;
