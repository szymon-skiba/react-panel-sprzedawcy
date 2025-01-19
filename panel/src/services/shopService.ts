import shopScores from "../mocks/shopScores";
import { QualityRank, ShopQualityScore } from "../types/types";

export const isAuthenticated = (): boolean =>
  !!localStorage.getItem("authToken");

export interface QualityScore {
  score: number;
  maxScore: number;
  rank: QualityRank;
}

export const getShopQualityAspectsScore = (
  shopId: string
): ShopQualityScore => {
  const shopScore = shopScores.find((score) => score.shopId === shopId);
  if (!shopScore) {
    throw new Error(`Shop with ID ${shopId} not found`);
  }
  return shopScore;
};

const calculateQualityRank = (percentage: number): QualityRank => {
  if (percentage >= 90) return QualityRank.BigFish;
  if (percentage >= 75) return QualityRank.Boss;
  if (percentage >= 60) return QualityRank.Ruffian;
  if (percentage >= 45) return QualityRank.Trickster;
  return QualityRank.Novice;
};

export const getShopQualityScore = (shopId: string): QualityScore => {
  const shopScore = getShopQualityAspectsScore(shopId);

  const totalPoints = shopScore.scores.reduce(
    (sum, aspect) => sum + aspect.points,
    0
  );

  const maxPoints = shopScore.scores.reduce(
    (sum, aspect) => sum + aspect.maxPoints,
    0
  );

  const percentage = (totalPoints / maxPoints) * 100;
  const rank = calculateQualityRank(percentage);

  return {
    score: percentage,
    maxScore: 100,
    rank: rank,
  };
};
