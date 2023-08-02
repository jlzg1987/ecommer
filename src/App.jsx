import { useState } from "react";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Product from "./pages/Product";
import Register from "./pages/Register";
import Purchases from "./pages/Purchases";
import AppNavbar from "./componet/AppNavbar";
import LoadingScreen from "./componet/LoadingScreen";
import { useSelector } from "react-redux";
import ProtectdRoutes from "./componet/ProtectdRoutes";

function App() {
  const isLoading = useSelector(state => state.isLoading);
  return (
    <HashRouter>
      <AppNavbar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectdRoutes/>}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App
