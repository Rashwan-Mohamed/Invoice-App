import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Invoice from "./components/Invoice.jsx";
import Home from "./components/Home.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />}></Route>
        <Route element={<Invoice />} path=":invoice"></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
