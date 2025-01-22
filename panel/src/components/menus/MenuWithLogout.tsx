import Menu from "./Menu";
import styles from "./MenuWithLogout.module.css";
import Logout from "./elements/Logout";

const MenuWithLogout: React.FC = () => {
  return (
    <div className={styles.settings}>
      <Menu />
      <Logout />
    </div>
  );
};

export default MenuWithLogout;
