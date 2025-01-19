import { useContext, useEffect, useState } from "react";
import { t } from "i18next";
import { UserContext } from "../../../context/UserContext";
import { isAuthenticated } from "../../../services/authService";
import UserService from "../../../services/userService";
import { useNavigate } from "react-router-dom";
import { Shop } from "../../../types/types";
import ButtonComponent from "../../buttons/ButtonComponent";
import LogedInUser from "./LogedInUser";
import styles from "./ChangeShop.module.css";

const ChangeShop: React.FC = () => {
  const { selectedShopId, setSelectedShopId } = useContext(UserContext);
  const [userShop, setUserShops] = useState<Shop | undefined>(undefined);
  const navigate = useNavigate();

  const handleShopChange = () => {
    setSelectedShopId(null);
    localStorage.removeItem("shopId");
    navigate(t("urls.shop-selection"));
  };

  useEffect(() => {
    if (selectedShopId && isAuthenticated()) {
      const fetchUserShop = async () => {
        const shop = UserService.getUserShop(selectedShopId);
        setUserShops(shop);
      };

      fetchUserShop();
    }
  }, [selectedShopId, userShop, navigate, t]);

  const outerColor = "var(--grey-3)";
  const innerColor = "var(--grey-2)";
  const lineColor = "var(--grey-6)";

  return (
    <div>
      {userShop && (
        <div className={styles.containerChangeShop}>
          <div>
            <LogedInUser
              username={userShop.name}
              width={180}
              fontSizeLabel={16}
            />
          </div>
          <div>
            <ButtonComponent
              width={180}
              height={50}
              outerColor={outerColor}
              innerColor={innerColor}
              lineColor={lineColor}
              onClick={handleShopChange}
            >
              <span>{t("pages.dashboard.changeShop")}</span>
            </ButtonComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeShop;
