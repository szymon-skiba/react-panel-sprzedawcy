import { createContext, useState, ReactNode } from "react";
import { User } from "../types/types";

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedShopId: string | null;
  setSelectedShopId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  user: {} as User,
  setUser: () => {},
  selectedShopId: null,
  setSelectedShopId: () => {},
});

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, selectedShopId, setSelectedShopId }}
    >
      {children}
    </UserContext.Provider>
  );
};
