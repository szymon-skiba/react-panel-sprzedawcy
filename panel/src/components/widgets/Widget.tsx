import React from "react";
import styles from "./Widget.module.css";
import OrnamentBackground from "../layouts/OrnamentBackground";

interface WidgetProps {
  children: React.ReactNode;
  title: string;
}

const Widget: React.FC<WidgetProps> = ({ children, title }) => {
  return (
    <div className={styles.widget}>
      <OrnamentBackground size={60}>
        <div>
          <h1 className={styles.headerWidget}>{title}</h1>
        </div>
        <div>{children}</div>
      </OrnamentBackground>
    </div>
  );
};

export default Widget;
