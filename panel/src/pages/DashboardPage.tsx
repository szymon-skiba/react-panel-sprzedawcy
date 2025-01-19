import React from "react";
import styles from "./DashboardPage.module.css";
import SalesQualityWidget from "../components/widgets/SalesQualityWidget";
import OrdersWidget from "../components/widgets/OrdersWidget";
import OffersListingWidget from "../components/widgets/OffersListingWidget";
import SalesChartWidget from "../components/widgets/SalesChartWidget";
import CustomersOpinionsWidget from "../components/widgets/CustomersOpinionsWidget";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={`${styles.box} ${styles.box1}`}><SalesQualityWidget/></div> 
      <div className={`${styles.box} ${styles.box2}`}><OrdersWidget/></div>
      <div className={`${styles.box} ${styles.box3}`}><OffersListingWidget/></div>
      <div className={`${styles.box} ${styles.box4}`}><SalesChartWidget/></div>
      <div className={`${styles.box} ${styles.box5}`}><CustomersOpinionsWidget/></div>
    </div>
  );
};

export default DashboardPage;
