
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import App from "./App.jsx";
import About from "./About.jsx";
import Solutions from "./solutions.jsx";
import SolarSimulator from "./SolarSimulator.jsx";
import SolarBackground from "./components/SolarBackground";
import Products from "./Products";
import SiteFooter from "./components/SiteFooter";
import SunnyChatbot from "./components/SunnyChatbot";
import SolarPageLoader from "./components/SolarPageLoader";

import "./index.css";

function AppLayout() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/simulator" && <SolarBackground />}

      <SolarPageLoader />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/simulator" element={<SolarSimulator />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <SunnyChatbot />
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>
);
