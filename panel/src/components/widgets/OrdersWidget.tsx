import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Widget from "./Widget";
import { UserContext } from "../../context/UserContext";
import { getOrdersByStatus } from "../../services/offersService";
import styles from "./OrdersWidget.module.css";
import ButtonComponent from "../buttons/ButtonComponent";
import { OrderStatus } from "../../types/types";

const OrdersWidget: React.FC = () => {
  const { selectedShopId } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const outerColor = "var(--brown-4)";
  const innerColor = "var(--brown-3)";
  const lineColor = "var(--grey-6)";

  if (!selectedShopId) {
    return (
      <Widget title={t("orders.noShopSelected")}>
        {t("orders.selectShopPrompt")}
      </Widget>
    );
  }

  const ordersByStatus = getOrdersByStatus(selectedShopId);

  const getStatusOrderCount = (status: OrderStatus) => {
    return ordersByStatus[status]?.length || 0;
  };

  const handleOpenOrdersPage = (status: OrderStatus) => {
    navigate(t("urls.orders"), { state: { statusType: status } });
  };

  return (
    <Widget title={t("widgets.orders.title")}>
      <div className={styles.tableContainer}>
        {/* Unsent Orders */}
        <div className={styles.statusRow}>
          <ButtonComponent
            width={120}
            height={44}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => handleOpenOrdersPage("unsent")}
          >
            <span className={styles.rowlabel}>{t("order-status.unsent")}</span>
          </ButtonComponent>
          <div className={styles.statusNumber}>
            {getStatusOrderCount("unsent")}
          </div>
        </div>

        {/* Unpaid Orders */}
        <div className={styles.statusRow}>
          <ButtonComponent
            width={120}
            height={44}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => handleOpenOrdersPage("unpaid")}
          >
            <span className={styles.rowlabel}>{t("order-status.unpaid")}</span>
          </ButtonComponent>
          <div className={styles.statusNumber}>
            {getStatusOrderCount("unpaid")}
          </div>
        </div>

        {/* Returned Orders */}
        <div className={styles.statusRow}>
          <ButtonComponent
            width={120}
            height={44}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => handleOpenOrdersPage("returned")}
          >
            <span className={styles.rowlabel}>
              {t("order-status.returned")}
            </span>
          </ButtonComponent>
          <div className={styles.statusNumber}>
            {getStatusOrderCount("returned")}
          </div>
        </div>

        {/* Completed Orders */}
        <div className={styles.statusRow}>
          <ButtonComponent
            width={120}
            height={44}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => handleOpenOrdersPage("completed")}
          >
            <span className={styles.rowlabel}>
              {t("order-status.completed")}
            </span>
          </ButtonComponent>
          <div className={styles.statusNumber}>
            {getStatusOrderCount("completed")}
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default OrdersWidget;
