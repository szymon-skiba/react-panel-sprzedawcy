import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import MenuWithLogout from "../menus/MenuWithLogout";
import OrnamentBackground from "./OrnamentBackground";

interface LayoutProps {
  title: string;
  subtitle: string;
}

const Layout: React.FC<LayoutProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.layout}>
      <OrnamentBackground size={170}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
        <Outlet />
        <MenuWithLogout />
      </OrnamentBackground>
    </div>
  );
};

export default Layout;
