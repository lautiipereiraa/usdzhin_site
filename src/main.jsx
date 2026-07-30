import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@store/store";
import { ThemeProvider } from "./context/ThemeContext";
import App from "./App";
import "./index.css";
import ReactGA from "react-ga4";

// Sin measurement ID, react-ga4 falla al inicializar y se cae el arranque.
// La guarda permite correr en desarrollo sin analytics.
if (import.meta.env.VITE_GA_ID) {
  ReactGA.initialize(import.meta.env.VITE_GA_ID);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
