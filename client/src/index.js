import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SearchContextProvider } from "./context/search/searchContext";
import { AuthContextProvider } from "./context/auth/authContext";
import { DarkModeProvider } from "./context/darkMode/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <AuthContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthContextProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
