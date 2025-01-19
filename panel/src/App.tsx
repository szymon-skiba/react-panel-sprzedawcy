import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import { UserContextProvider } from "./context/UserContext";

const App: React.FC = () => {
  return (
      <UserContextProvider>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </UserContextProvider>
  );
};

export default App;
