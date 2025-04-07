import React from "react";
import { Routes, Route } from "react-router-dom";
import MegaNavigation from "../Components/MegaNavigation.jsx/MegaNavigation";
import HomeRoutes from "../HomeRoutes/HomeRoutes";
import IndieSemicProduct from "../StoreComponents/ProductPage/indieSemicProduct";
import Product from "../StoreComponents/ProductPage/Product";
import Footer from "../Components/Footer/Footer"
import Modules from "../Components/Modules/Modules";
import SOCModule from "../Components/SOCModule/SOCModule";
import SeparateProductPage from "../StoreComponents/ProductPage/SeparateProductpage";
const DynamicRoutes = () => {
    return (
        <>
            <MegaNavigation />
            <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<SeparateProductPage />} />
                <Route path="/Modules" element={<Modules />} />
                <Route path="/socmodule" element={<SOCModule />} />
            </Routes>
            <Footer />
        </>
    )
}

export default DynamicRoutes