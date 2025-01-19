import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { isAuthenticated, login } from "../services/authService";
import { UserContext } from "../context/UserContext";
import styles from "./LoginPage.module.css";
import ButtonComponent from "../components/buttons/ButtonComponent";
import eyeClosed from "../assets/eye_closed.png";
import eyeOpen from "../assets/eye_open.png";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const outerColor = "var(--grey-3)";
  const innerColor = "var(--grey-2)";
  const lineColor = "var(--grey-6)";

  const handleFormSubmit = () => {
    const success = login(username, password, setUser);

    if (success) {
      navigate(t("urls.shop-selection"));
    } else {
      alert(t("pages.login-page.alert"));
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleFormSubmit();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateToDashboard = () => {
    navigate(t("urls.shop-selection"));
  };

  return (
    <div className={styles.container}>
      {user && isAuthenticated() ? (
        <div className={styles.loggedInContainer}>
          <p>{t("pages.login-page.logged-in")}</p>
          <ButtonComponent
            outerColor={outerColor}
            innerColor={innerColor}
            lineColor={lineColor}
            width={120}
            height={50}
            onClick={handleNavigateToDashboard}
          >
            {t("pages.login-page.logged-in-button")}
          </ButtonComponent>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {t("pages.login-page.username-label")}
            </label>
            <input
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("pages.login-page.username-placeholder")}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {t("pages.login-page.password-label")}
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("pages.login-page.password-placeholder")}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
              >
                <img
                  src={showPassword ? eyeOpen : eyeClosed}
                  width={30}
                  height={30}
                  alt={showPassword ? "Hide password" : "Show password"}
                  className={styles.eyeIcon}
                />
              </button>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <ButtonComponent
              outerColor={outerColor}
              innerColor={innerColor}
              lineColor={lineColor}
              width={120}
              height={50}
              onClick={() => {
                formRef.current?.dispatchEvent(
                  new Event("submit", { bubbles: true, cancelable: true })
                );
              }}
              submitType={true}
            >
              {t("login")}
            </ButtonComponent>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
