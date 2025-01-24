import React, { useState } from "react";
import styles from "./OrdersWidget.module.css";
import Widget from "./Widget";
import ButtonComponent from "../buttons/ButtonComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { findAmountOfSoldItemsForOffer, findTurnoverForOffer } from "../../services/offersService";
import offers from "../../mocks/offers";
import { Offer } from "../../types/types";

const OffersRankingWidget: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCriterion, setSelectedCriterion] = useState("");

  const outerColor = "var(--brown-4)";
  const innerColor = "var(--brown-3)";
  const lineColor = "var(--grey-6)";

const getTop5OffersByAmountOfSoldItems = () => {
  return [...offers]
    .sort((a, b) => {
      const aSold = findAmountOfSoldItemsForOffer(a.id);
      const bSold = findAmountOfSoldItemsForOffer(b.id);
      if (aSold === bSold) {
        const aTurnover = findTurnoverForOffer(a.id);
        const bTurnover = findTurnoverForOffer(b.id);
        return bTurnover - aTurnover;
      }
      return bSold - aSold;
    })
    .slice(0, 5);
};

const getWorst5OffersByAmountOfSoldItems = () => {
  return [...offers]
    .sort((a, b) => {
      const aSold = findAmountOfSoldItemsForOffer(a.id);
      const bSold = findAmountOfSoldItemsForOffer(b.id);
      if (aSold === bSold) {
        const aTurnover = findTurnoverForOffer(a.id);
        const bTurnover = findTurnoverForOffer(b.id);
        return aTurnover - bTurnover; 
      }
      return aSold - bSold; 
    })
    .slice(0, 5);
};

const getTop5OffersByTurnover = () => {
  return [...offers]
    .sort((a, b) => {
      const aTurnover = findTurnoverForOffer(a.id);
      const bTurnover = findTurnoverForOffer(b.id);
      return bTurnover - aTurnover; 
    })
    .slice(0, 5);
};

const getWorst5OffersByViews = () => {
  return [...offers]
    .sort((a, b) => a.numberOfViews - b.numberOfViews) 
    .slice(0, 5);
};

  const handleNavigateToFullPage = () => {
    navigate(t("urls.offers-listing"));
  };

  const getSortedOffers = () => {
    
    switch (selectedCriterion) {
      case "mostSold":
        return getTop5OffersByAmountOfSoldItems();
      case "leastSold":
        return getWorst5OffersByAmountOfSoldItems();
      case "highestTurnover":
        return getTop5OffersByTurnover();
      case "leastViewed":
        return getWorst5OffersByViews();
      default:
        return getTop5OffersByAmountOfSoldItems();
    }
  };

  const sortedOffers = getSortedOffers();

  const renderTableHeaders = () => {
    const commonHeaders = (
      <>
        <th>{t("widgets.offers-ranking-widget.icon")}</th>
        <th>{t("widgets.offers-ranking-widget.name")}</th>
        <th>{t("widgets.offers-ranking-widget.sold-amount")}</th>
      </>
    );

    if (selectedCriterion === "mostSold" || selectedCriterion === "highestTurnover") {
      return (
        <tr>
          {commonHeaders}
          <th>{t("widgets.offers-ranking-widget.turnover")}</th>
        </tr>
      );
    }
    return (
      <tr>
        {commonHeaders}
        <th>{t("widgets.offers-ranking-widget.views")}</th>

      </tr>
    );
  };

  const renderTableRow = (offer: Offer) => {
    const soldAmount = findAmountOfSoldItemsForOffer(offer.id);
    const turnover = findTurnoverForOffer(offer.id);

    return (
      <tr key={offer.id}>
        <td>
          <img
            src={offer.photo}
            alt={offer.name}
            style={{ width: "30px", height: "30px" }}
          />
        </td>
        <td>{offer.name}</td>
        <td>{soldAmount}</td>
        {(selectedCriterion === "mostSold" || selectedCriterion === "highestTurnover") ? (
          <td>{turnover}</td>
        ) : (
          <td>{offer.numberOfViews}</td>
        )}
      </tr>
    );
  };

  return (
    <Widget title={t("widgets.offers-ranking-widget.title")}>
      <div className={styles.controlSection}>
        <div className={styles.inputGroup}>
          <label>{t("widgets.offers-ranking-widget.choose-criteria")}</label>
          <select 
            value={selectedCriterion}
            onChange={(e) => setSelectedCriterion(e.target.value)}
            className={styles.select}
          >
            <option value="">{t("widgets.offers-ranking-widget.choose-criteria")}</option>
            <option value="mostSold">{t("widgets.offers-ranking-widget.most-sold")}</option>
            <option value="leastSold">{t("widgets.offers-ranking-widget.least-sold")}</option>
            <option value="highestTurnover">{t("widgets.offers-ranking-widget.highest-turnover")}</option>
            <option value="leastViewed">{t("widgets.offers-ranking-widget.least-viewed")}</option>
          </select>
        </div>

        <div className={styles.seeAllButton}>
          <ButtonComponent
            width={180}
            height={44}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={handleNavigateToFullPage}
          >
            <span>{t("widgets.offers-ranking-widget.see-all")}</span>
          </ButtonComponent>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody>
            {sortedOffers.map(renderTableRow)}
          </tbody>
        </table>
      </div>
    </Widget>
  );
};

export default OffersRankingWidget;
