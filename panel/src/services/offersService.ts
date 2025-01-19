import offers from "../mocks/offers";
import orders from "../mocks/orders";
import { Offer, Order } from "../types/types";

export const getOrdersByStatus = (selectedShopId: string) => {
  const shopOffers = offers.filter((offer) => offer.shopId === selectedShopId);

  const shopOrders = orders.filter((order) =>
    shopOffers.some((offer) => offer.id === order.offerId)
  );

  const statusCategories = {
    unsent: [] as Order[],
    unpaid: [] as Order[],
    returned: [] as Order[],
    completed: [] as Order[],
  };

  shopOrders.forEach((order) => {
    statusCategories[order.status].push(order);
  });

  return statusCategories;
};

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find((offer) => offer.id === id);
};
