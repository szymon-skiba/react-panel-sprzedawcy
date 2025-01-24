import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./ShopSelectionPage.module.css";
import ButtonComponent from "../components/buttons/ButtonComponent";
import { UserContext } from "../context/UserContext";
import UserService from "../services/userService";

const ShopSelectionPage: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string>("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, selectedShopId, setSelectedShopId } = useContext(UserContext);
  const [userShops, setUserShops] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    if (selectedShopId) {
      navigate(t("urls.dashboard"));
    } else {
      const fetchUserShops = async () => {
        if (user) {
          const shops = UserService.getUserShops(user.id);
          setUserShops(shops || []);
        }
      };

      fetchUserShops();
    }
  }, [selectedShopId, user, navigate, t]);

  const outerColor = "var(--grey-3)";
  const innerColor = "var(--grey-2)";
  const lineColor = "var(--grey-6)";

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShop(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedShop) {
      localStorage.setItem("shopId", JSON.stringify({ shopId: selectedShop }));
      setSelectedShopId(selectedShop);
      navigate(t("urls.dashboard"));
    } else {
      alert("Wybierz sklep.");
    }
  };

  return (
    <div className={styles.containerShopSelction}>
      <div>
        <select
          value={selectedShop}
          onChange={handleSelectChange}
          className={styles.selectInput}
        >
          <option value="">{t("pages.shop-select-page.placeholder")}</option>
          {userShops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <ButtonComponent
          outerColor={outerColor}
          innerColor={innerColor}
          lineColor={lineColor}
          width={120}
          height={50}
          onClick={handleNavigate}
        >
          {t("pages.shop-select-page.button")}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ShopSelectionPage;
