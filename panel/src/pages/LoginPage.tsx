import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'password') {
      localStorage.setItem('authToken', 'mockToken');
      navigate('/shop-selection');
    }
  };

  return (
    <div>
        <div>{t('login-page.label')}</div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('login-page.placeholder')} />
        <div><button onClick={handleLogin}>{t('login')}</button></div>
    </div>
  );
};

export default LoginPage;
