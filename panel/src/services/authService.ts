import users from "../mocks/users";
import { User } from "../types/types";

export const isAuthenticated = (): boolean =>
  !!localStorage.getItem("authToken");

export const logout = (
  setUser: (user: User | null) => void,
  setShopId: (shopId: string | null) => void
) => {
  setShopId(null);
  setUser(null);
  localStorage.removeItem("authToken");
  localStorage.removeItem("shopId");
};

export const login = (
  username: string,
  password: string,
  setUser: (user: User) => void
): boolean => {
  const user = users.find(
    (uzytkownik) =>
      uzytkownik.username === username && uzytkownik.password === password
  );

  if (user) {
    localStorage.setItem(
      "authToken",
      JSON.stringify({ username: user.username })
    );
    setUser(user);
    return true;
  } else {
    return false;
  }
};
