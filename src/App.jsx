import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Shell from "./components/Shell.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import HowTo from "./pages/HowTo.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dr-aktas" element={<About />} />
        <Route path="/urunler" element={<Products />} />
        <Route path="/urunler/:id" element={<ProductDetail />} />
        <Route path="/nasil-kullanilir" element={<HowTo />} />
        <Route path="/giris" element={<Login />} />
      </Routes>
      <SpeedInsights />
    </Shell>
  );
}
