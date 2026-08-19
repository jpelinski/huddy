import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import MenuApp from "./MenuApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuApp />} />
        <Route path="/panel" element={<App />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
