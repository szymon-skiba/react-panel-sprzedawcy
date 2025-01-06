import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ShopSelectionPage from '../pages/ShopSelectionPage';
import DashboardPage from '../pages/DashboardPage';
import Layout from '../components/Layout';
import { useTheme } from '../ThemeContext';
import { useTranslation } from 'react-i18next';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { theme } = useTheme();
  const {t} = useTranslation();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout title={t('app-name')}/>}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/shop-selection" element={<PrivateRoute><ShopSelectionPage /></PrivateRoute>} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
