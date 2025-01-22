import React, { useContext } from "react";
import styles from "./SalesQualityWidget.module.css";
import {
  getShopQualityAspectsScore,
  getShopQualityScore,
} from "../../services/shopService";
import { UserContext } from "../../context/UserContext";
import { useTranslation } from "react-i18next";
import LogedInUser from "../menus/elements/LogedInUser";
import ButtonComponent from "../buttons/ButtonComponent";
import Widget from "./Widget";
import { useNavigate } from "react-router-dom";

const SalesQualityWidget: React.FC = () => {
  const { selectedShopId } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!selectedShopId) {
    return (
      <Widget title={t("widgets.quality.title")}>
        <div>{t("widgets.quality.error-no-id")}</div>
      </Widget>
    );
  }

  const handleNavigateToFullPage = () => {
    navigate(t("urls.sales-quality"));
  };

  const outerColor = "var(--brown-4)";
  const innerColor = "var(--brown-3)";
  const lineColor = "var(--grey-6)";

  const shopQualityScore = getShopQualityScore(selectedShopId);
  const shopAspects = getShopQualityAspectsScore(selectedShopId);

  const lowestAspects = shopAspects.scores
    .sort((a, b) => a.points - b.points)
    .slice(0, 3);

  if (!lowestAspects || !shopQualityScore) {
    return (
      <Widget title={t("widgets.quality.title")}>
        <div>
          <p>{t("widgets.quality.error-no-items")}</p>
        </div>
      </Widget>
    );
  }

  return (
    <Widget title={t("widgets.quality.title")}>
      <div className={styles.rankSection}>
        <LogedInUser
          username={t("quality-ranks." + shopQualityScore.rank)}
          width={200}
          ornamentSize={50}
          fontSizeLabel={16}
          backgroundColor="var(--brown-3)"
        />
        <ButtonComponent
          width={100}
          height={50}
          outerColor={outerColor}
          innerColor={innerColor}
          lineColor={lineColor}
          onClick={handleNavigateToFullPage}
        >
          <span className={styles.scoreSpan}>
            {shopQualityScore.score}/{shopQualityScore.maxScore}
          </span>
        </ButtonComponent>
      </div>
      <div className={styles.lowestSection}>
        <h3>{t("widgets.quality.lowestScoreLabel")}</h3>
        <div className={styles.aspectContainer}>
          {lowestAspects.map((aspect) => (
            <div key={aspect.aspect} className={styles.aspectBox}>
              <span className={styles.aspectName}>
                {t("quality-aspects." + aspect.aspect)}
              </span>
              <div className={styles.aspectScore}>
                <div className={styles.circle}>{aspect.points}</div>/{" "}
                {aspect.maxPoints}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
};

export default SalesQualityWidget;
