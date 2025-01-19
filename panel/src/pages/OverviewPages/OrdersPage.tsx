import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getOfferById, getOrdersByStatus } from "../../services/offersService";

import { OrderStatus } from "../../types/types";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import Widget from "../../components/widgets/Widget";
import UserService from "../../services/userService";
import styles from "./OrdersPage.module.css";
import ButtonComponent from "../../components/buttons/ButtonComponent";

const OrdersPage: React.FC = () => {
  const { selectedShopId } = useContext(UserContext);
  const location = useLocation();
  const statusType = location.state?.statusType;
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!selectedShopId) {
    return (
      <Widget title={t("widgets.orders.title")}>
        <p>{t("pages.orders.noShopSelected")}</p>
      </Widget>
    );
  }

  const ordersByStatus = getOrdersByStatus(selectedShopId);

  const getStatusOrders = (status: OrderStatus) => {
    return ordersByStatus[status] || [];
  };

  const statusOrders = getStatusOrders(statusType);

  const outerColor = "var(--brown-4)";
  const innerColor = "var(--brown-3)";
  const lineColor = "var(--grey-6)";

  return (
    <div className={styles.page}>
      <Widget
        title={`${t("pages.orders.title")} - ${
          statusType
            ? t(`order-status.${statusType}`)
            : t("pages.orders.allOrders")
        }`}
      >
        <div>
          {statusOrders.length === 0 ? (
            <p>{t("pages.orders.notFound")}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t("pages.orders.offerName")}</th>
                  <th>{t("pages.orders.amountOrdered")}</th>
                  <th>{t("pages.orders.totalGain")}</th>
                  <th>{t("pages.orders.status")}</th>
                  <th>{t("pages.orders.timestamp")}</th>
                  <th>{t("pages.orders.userEmail")}</th>
                </tr>
              </thead>
              <tbody>
                {statusOrders.map((order) => {
                  const offer = getOfferById(order.offerId);
                  const userEmail = UserService.getUserEmailById(order.userId);
                  return (
                    <tr key={order.id}>
                      <td>{offer?.name || t("pages.orders.unknownOffer")}</td>
                      <td>{order.amountOrdered}</td>
                      <td>{order.totalGain}</td>
                      <td>{t(`order-status.${order.status}`)}</td>
                      <td>
                        {new Intl.DateTimeFormat("en-UK", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }).format(new Date(order.timestamp))}
                      </td>
                      <td>{userEmail || t("pages.orders.unknownUser")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className={styles.backButton}>
          <ButtonComponent
            width={120}
            height={50}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => navigate(-1)}
          >
            <span className={styles.backtext}>
              {t("pages.sales-quality-page.back-button")}
            </span>
          </ButtonComponent>
        </div>
      </Widget>
    </div>
  );
};

export default OrdersPage;
