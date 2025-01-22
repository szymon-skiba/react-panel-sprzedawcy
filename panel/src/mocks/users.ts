import userPhoto from "../assets/user.png";
import { User } from "../types/types";

const users: User[] = [
  {
    id: "1",
    username: "user1",
    password: "password",
    email: "rycerz@zamek.pl",
    photo: userPhoto,
  },
  {
    id: "2",
    username: "MistrzKowal",
    password: "password",
    email: "kowal@zamek.pl",
    photo: userPhoto,
  },
  {
    id: "3",
    username: "CzarodziejZBieli",
    password: "password",
    email: "czarodziej@zamek.pl",
    photo: userPhoto,
  },
  {
    id: "4",
    username: "BardZeZłotejLutni",
    password: "password",
    email: "bard@zamek.pl",
    photo: userPhoto,
  },
  {
    id: "5",
    username: "StrażnikZamkowychWrót",
    password: "password",
    email: "straznik@zamek.pl",
    photo: userPhoto,
  },
];

export default users;
