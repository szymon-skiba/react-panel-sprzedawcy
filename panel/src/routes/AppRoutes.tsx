import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ShopSelectionPage from '../pages/ShopSelectionPage';
import DashboardPage from '../pages/DashboardPage';
import Layout from '../components/layouts/Layout';
import { useTranslation } from 'react-i18next';
import PrivateRoute from './PrivateRoute';
import { UserContext } from '../context/UserContext';
import { isAuthenticated } from '../services/authService';
import UserService from '../services/userService';
import DashboardLayout from '../components/layouts/DashBoardLayout';
import SalesQualityPage from '../pages/OverviewPages/SalesQualityPage';
import OrdersPage from '../pages/OverviewPages/OrdersPage';

const AppRoutes: React.FC = () => {
  const {t} = useTranslation();
  const { setUser, setSelectedShopId } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated()) {
      const authToken = JSON.parse(localStorage.getItem('authToken') || '{}');
      const user = UserService.getUserByUsername(authToken.username);
      if (user) {
        setUser(user);
      }
      const shopId = JSON.parse(localStorage.getItem('shopId') || '{}');
      if(shopId){
        setSelectedShopId(shopId.shopId);
      }
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout title={t('app-name')} subtitle={t('pages.login-page.title')} />}>
          <Route path="/" element={<LoginPage />} />
          <Route path={t('urls.login')} element={<LoginPage />} />
        </Route>
        <Route element={<Layout title={t('app-name')} subtitle={t('pages.shop-select-page.title')}/>}>
          <Route path={t('urls.shop-selection')} element={<PrivateRoute><ShopSelectionPage /></PrivateRoute>} />
        </Route>
        <Route element={<DashboardLayout/>}>
          <Route path={t('urls.dashboard')} element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path={t('urls.sales-quality')} element={<PrivateRoute><SalesQualityPage /></PrivateRoute>} />
          <Route path={t('urls.orders')} element={<PrivateRoute><OrdersPage /></PrivateRoute>} />
          <Route path={t('urls.offers-listing')} element={<PrivateRoute><ShopSelectionPage /></PrivateRoute>} />
          <Route path={t('urls.customer-opinions')} element={<PrivateRoute><ShopSelectionPage /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
