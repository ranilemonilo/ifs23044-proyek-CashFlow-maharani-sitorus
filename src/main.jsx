import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global.css";
import { ThemeProvider } from "@/context/ThemeContext"; // 🆕

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔄 Bungkus dengan Redux Provider dulu */}
    <Provider store={store}>
      {/* 🎨 Lalu bungkus dengan ThemeProvider */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
