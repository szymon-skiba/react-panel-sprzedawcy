import { QualityAspect, ShopQualityScore } from "../types/types";

const shopScores: ShopQualityScore[] = [
  {
    shopId: "1",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 80, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 70, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 60, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 50, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 85, maxPoints: 100 },
    ],
  },
  {
    shopId: "2",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 90, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 95, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 40, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 60, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 75, maxPoints: 100 },
    ],
  },
  {
    shopId: "3",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 30, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 20, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 100, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 65, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 55, maxPoints: 100 },
    ],
  },
  {
    shopId: "4",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 40, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 50, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 30, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 90, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 60, maxPoints: 100 },
    ],
  },
  {
    shopId: "5",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 85, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 80, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 50, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 55, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 95, maxPoints: 100 },
    ],
  },
  {
    shopId: "6",
    scores: [
      { aspect: QualityAspect.ArmorCraftsmanship, points: 88, maxPoints: 100 },
      { aspect: QualityAspect.WeaponSharpness, points: 77, maxPoints: 100 },
      { aspect: QualityAspect.PotionPotency, points: 60, maxPoints: 100 },
      { aspect: QualityAspect.Hospitality, points: 50, maxPoints: 100 },
      { aspect: QualityAspect.GuardReadiness, points: 78, maxPoints: 100 },
    ],
  },
];

export default shopScores;
