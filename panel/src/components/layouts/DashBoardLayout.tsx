import React from "react";
import { Outlet } from "react-router-dom";
import DashboardMenu from "../menus/DashboardMenu";
import styles from "./DashBoardLayout.module.css";

const DashBoardLayout: React.FC = () => {
  return (
    <div className={styles.containerDashboard}>
      <div className={styles.menu}>
        <DashboardMenu />
      </div>
      <div className={styles.display}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
