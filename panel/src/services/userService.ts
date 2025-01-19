import shops from "../mocks/shops";
import users from "../mocks/users";
import { Shop, User } from "../types/types";
import { isAuthenticated } from "./authService";

class UserService {
  static getUserByUsername(username: string): User | undefined {
    if (isAuthenticated()) {
      return users.find((user) => user.username === username);
    }
    return undefined;
  }

  static getUserEmailById(id: string): string | undefined {
    if (isAuthenticated()) {
      return users.find((user) => user.id === id)?.email;
    }
    return undefined;
  }

  static getUserShops(userId: string): Shop[] | undefined {
    if (isAuthenticated()) {
      return shops.filter((shop) => shop.userId === userId);
    }
    return undefined;
  }

  static getUserShop(shopId: string): Shop | undefined {
    if (isAuthenticated()) {
      return shops.find((shop) => shop.id === shopId);
    }
    return undefined;
  }
}

export default UserService;
