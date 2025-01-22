import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { t } = useTranslation();
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to={t("urls.login")} />;
};

export default PrivateRoute;
