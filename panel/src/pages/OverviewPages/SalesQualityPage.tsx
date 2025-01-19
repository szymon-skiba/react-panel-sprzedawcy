import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  getShopQualityScore,
  getShopQualityAspectsScore,
} from "../../services/shopService";
import styles from "./SalesQualityPage.module.css";
import Widget from "../../components/widgets/Widget";
import LogedInUser from "../../components/menus/elements/LogedInUser";
import { QualityRank } from "../../types/types";
import ButtonComponent from "../../components/buttons/ButtonComponent";

const SalesQualityPage: React.FC = () => {
  const { selectedShopId } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!selectedShopId) {
    return (
      <Widget title={t("pages.sales-quality-page.title")}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          {t("shopQualityScorePage.backButton")}
        </button>
      </Widget>
    );
  }

  const rankPoints = {
    [QualityRank.Novice]: "0-44",
    [QualityRank.Trickster]: "45-59",
    [QualityRank.Ruffian]: "60-74",
    [QualityRank.Boss]: "75-89",
    [QualityRank.BigFish]: "90-100",
  };

  const outerColor = "var(--brown-4)";
  const innerColor = "var(--brown-3)";
  const lineColor = "var(--grey-6)";

  const shopQualityScore = getShopQualityScore(selectedShopId);
  const shopAspects = getShopQualityAspectsScore(selectedShopId);
  const ranks = Object.values(QualityRank);

  return (
    <div className={styles.page}>
      <Widget title={t("pages.sales-quality-page.title")}>
        <div className={styles.ranksRow}>
          {ranks.map((rank) => (
            <div key={rank} className={`${styles.rankBox}`}>
              <LogedInUser
                username={t("quality-ranks." + rank)}
                width={140}
                ornamentSize={40}
                fontSizeLabel={14}
                backgroundColor="var(--brown-3)"
              />
              <span>{rankPoints[rank]}</span>
            </div>
          ))}
        </div>

        <div className={styles.rankSection}>
          <span>{t("pages.sales-quality-page.title2")}</span>
          <LogedInUser
            username={t("quality-ranks." + shopQualityScore.rank)}
            width={200}
            ornamentSize={80}
            fontSizeLabel={16}
            backgroundColor="var(--brown-3)"
          />
          <span className={styles.scoreSpan}>
            {shopQualityScore.score}/{shopQualityScore.maxScore}
          </span>
        </div>

        <div className={styles.lowestSection}>
          <h3>{t("pages.sales-quality-page.aspects-label")}</h3>
          <div className={styles.aspectContainer}>
            {shopAspects.scores.map((aspect) => (
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

export default SalesQualityPage;
