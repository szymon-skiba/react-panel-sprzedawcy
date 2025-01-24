export type Shop = {
  id: string;
  name: string;
  userId: string;
};

export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  photo: string;
};

export enum QualityAspect {
  ArmorCraftsmanship = "ArmorCraftsmanship",
  WeaponSharpness = "WeaponSharpness",
  PotionPotency = "PotionPotency",
  Hospitality = "Hospitality",
  GuardReadiness = "GuardReadiness"
}

export enum QualityRank {
  Novice = "Novice",
  Trickster = "Trickster",
  Ruffian = "Ruffian",
  Boss = "Boss",
  BigFish = "BigFish"
}

export type AspectScore = {
  aspect: QualityAspect;
  points: number;
  maxPoints: number;
};

export type ShopQualityScore = {
  [x: string]: any;
  shopId: string;
  scores: AspectScore[];
};

export type Offer = {
  id: string;
  shopId: string;
  name: string;
  price: number;
  amountInStock: number;
  photo: string;
  numberOfViews: number;
};

export type OrderStatus = 'unsent' | 'unpaid' | 'returned' | 'completed';

export type Order = {
  id: string;
  offerId: string;
  amountOrdered: number;
  gainPerItem: number;
  totalGain: number;
  userId: string; 
  status: OrderStatus;
  timestamp:string
};

export type CustomerOpinion = {
  id: number;
  username: string;
  opinion: string;
  rating: number;
  timestamp: string;
  customerIcon: string;
};

