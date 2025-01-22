import { Offer } from "../types/types";
import offerPhoto from "../assets/crown.png";

const offers: Offer[] = [
  {
    id: "1",
    shopId: "1",
    name: "Zbroja Płytowa",
    price: 150,
    amountInStock: 10,
    photo: offerPhoto,
    numberOfViews: 250,
  },
  {
    id: "2",
    shopId: "1",
    name: "Miecz Dwuręczny",
    price: 200,
    amountInStock: 5,
    photo: offerPhoto,
    numberOfViews: 300,
  },
  {
    id: "3",
    shopId: "1",
    name: "Eliksir Mocy",
    price: 50,
    amountInStock: 20,
    photo: offerPhoto,
    numberOfViews: 150,
  },
  {
    id: "4",
    shopId: "1",
    name: "Pieśń Bohaterów",
    price: 75,
    amountInStock: 15,
    photo: offerPhoto,
    numberOfViews: 100,
  },
  {
    id: "5",
    shopId: "1",
    name: "Tarcza Strażnika",
    price: 120,
    amountInStock: 8,
    photo: offerPhoto,
    numberOfViews: 220,
  },
];

export default offers;
