import React, { useEffect } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Button from './ButtonComponent';
import moonImage from '../assets/moon.png';
import sunImage from '../assets/sun.png';
import { useTheme } from '../ThemeContext';
import { useTranslation } from 'react-i18next';


interface LayoutProps {
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ title }) => {
  const outerColor = 'var(--grey-3)'
  const innerColor = 'var(--grey-2)'
  const lineColor = 'var(--grey-6)'

  const {theme, setTheme} = useTheme();
  const { i18n } = useTranslation();

  const handleColorSwap = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLanguageChange = () => {
    const lang = i18n.language=='en'?'pl':'en'
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);


  return (
    <div className={styles.layout}>
      <div className={styles.title}>{title}</div>
      
      <div className={`${styles.ornament} ${styles['top-left']}`} />
      <div className={`${styles.ornament} ${styles['top-right']}`} />
      <div className={`${styles.ornament} ${styles['bottom-left']}`} />
      <div className={`${styles.ornament} ${styles['bottom-right']}`} />

      <Outlet/>
      <div className={styles.settings}  >
        <div >
          <Button width={50} height={50} outerColor={outerColor} innerColor={innerColor} lineColor={lineColor} onClick={handleColorSwap}>
            <img src={theme === 'dark' ? sunImage : moonImage} width={30} height={30} alt={theme === 'dark' ? 'darkmode' : 'lightmode'} />
          </Button>
        </div>
        <div>
        <Button width={50} height={50} outerColor={outerColor} innerColor={innerColor} lineColor={lineColor} onClick={handleLanguageChange}>
          <span>{i18n.language=='en'?'PL':'EN'}</span>
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
