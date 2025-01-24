import { CustomerOpinion } from "../types/types";
import UserIcon from "../assets/user.png";
const customerOpinions: CustomerOpinion[] = [
    {
        id: 1,
        username: "Jan Kowalski",
        opinion: "Świetna jakość produktów! Zdecydowanie polecam.",
        rating: 5,
        timestamp: "2023-10-01T12:00:00Z",
        customerIcon: UserIcon
    },
    {
        id: 2,
        username: "Anna Nowak",
        opinion: "Dostawa była opóźniona, ale produkt spełnia moje oczekiwania.",
        rating: 4,
        timestamp: "2023-10-02T14:30:00Z",
        customerIcon: UserIcon
    },
    {
        id: 3,
        username: "Piotr Wiśniewski",
        opinion: "Nie jestem zadowolony z jakości obsługi klienta.",
        rating: 2,
        timestamp: "2023-10-03T09:15:00Z",
        customerIcon: UserIcon
    },
    {
        id: 4,
        username: "Katarzyna Lewandowska",
        opinion: "Bardzo szybka realizacja zamówienia. Zdecydowanie wrócę!",
        rating: 5,
        timestamp: "2023-10-04T11:45:00Z",
        customerIcon: UserIcon
    },
    {
        id: 5,
        username: "Marek Kaczmarek",
        opinion: "Produkt nie spełnił moich oczekiwań. Słaba jakość.",
        rating: 1,
        timestamp: "2023-10-05T16:20:00Z",
        customerIcon: UserIcon
    }
];

export default customerOpinions;