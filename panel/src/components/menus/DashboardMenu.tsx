import React from "react";
import ChangeShop from "./elements/ChangeShop";
import OrnamentBackground from "../layouts/OrnamentBackground";
import styles from "./DashboardMenu.module.css";
import { useTranslation } from "react-i18next";
import Logout from "./elements/Logout";
import Menu from "./Menu";

const DashboardMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.containerMenu}>
      <OrnamentBackground size={70}>
        <div className={styles.optionsWrapper}>
          <div>
            <h1 className={styles.header}>{t("app-name")}</h1>
          </div>
          <div className={styles.changeShop}>
            <div>
              <label className={styles.optionLabel}>
                {t("pages.dashboard.shop")}
              </label>
              <ChangeShop />
            </div>
            <div>
              <label className={styles.optionLabel}>
                {t("pages.dashboard.user")}
              </label>
              <Logout alignClass={"column-logout"} width={180} />
            </div>
          </div>
          <div className={styles.menuWithLogout}>
            <Menu />
          </div>
        </div>
      </OrnamentBackground>
    </div>
  );
};

export default DashboardMenu;
