import { useContext } from "react";
import styles from "./Logout.module.css";
import { t } from "i18next";
import { UserContext } from "../../../context/UserContext";
import { isAuthenticated, logout } from "../../../services/authService";
import ButtonComponent from "../../buttons/ButtonComponent";
import LogedInUser from "./LogedInUser";

interface LogoutProps {
  alignClass?: string;
  width?: number;
  height?: number;
}

const Logout: React.FC<LogoutProps> = ({
  alignClass = "logout",
  width = 120,
  height = 50,
}) => {
  const { user, setUser, setSelectedShopId } = useContext(UserContext);

  const outerColor = "var(--grey-3)";
  const innerColor = "var(--grey-2)";
  const lineColor = "var(--grey-6)";

  return (
    <div>
      {user && isAuthenticated() && (
        <div className={styles[alignClass]}>
          <LogedInUser
            username={user.username}
            photo={user.photo}
            width={width}
            fontSizeLabel={16}
          />
          <ButtonComponent
            width={width}
            height={height}
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            onClick={() => logout(setUser, setSelectedShopId)}
          >
            <span>{t("logout")}</span>
          </ButtonComponent>
        </div>
      )}
    </div>
  );
};

export default Logout;
