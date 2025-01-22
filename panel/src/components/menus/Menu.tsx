import ButtonComponent from "../buttons/ButtonComponent";
import moonImage from "../../assets/moon.png";
import sunImage from "../../assets/sun.png";
import { useTheme } from "../../context/ThemeContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Menu.module.css";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();
  const outerColor = "var(--grey-3)";
  const innerColor = "var(--grey-2)";
  const lineColor = "var(--grey-6)";

  const handleColorSwap = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLanguageChange = async () => {
    const lang = i18n.language == "en" ? "pl" : "en";
    const routes = i18n.getResourceBundle(i18n.language, "translation");

    const currentPathname = window.location.pathname.replace(/\/+$/, "");
    let currentRouteKey = undefined;

    for (const key in routes.urls) {
      if (routes.urls[key] === currentPathname) {
        currentRouteKey = key;
      }
    }

    await i18n.changeLanguage(lang);
    const newRoute = t(`urls.${currentRouteKey}`);

    navigate(newRoute);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <div className={styles.settings}>
      <ButtonComponent
        width={50}
        height={50}
        outerColor={outerColor}
        innerColor={innerColor}
        lineColor={lineColor}
        onClick={handleColorSwap}
      >
        <img
          src={theme === "dark" ? sunImage : moonImage}
          width={25}
          height={25}
          alt={theme === "dark" ? "darkmode" : "lightmode"}
        />
      </ButtonComponent>

      <ButtonComponent
        width={50}
        height={50}
        outerColor={outerColor}
        innerColor={innerColor}
        lineColor={lineColor}
        onClick={handleLanguageChange}
      >
        <span>{i18n.language == "en" ? "PL" : "EN"}</span>
      </ButtonComponent>
    </div>
  );
};

export default Menu;
