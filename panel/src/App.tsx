import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './ThemeContext';
import './i18n'; 

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;