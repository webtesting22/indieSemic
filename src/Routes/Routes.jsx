import React from "react";
import { Routes, Route } from "react-router-dom";
import MegaNavigation from "../Components/MegaNavigation.jsx/MegaNavigation";
import HomeRoutes from "../HomeRoutes/HomeRoutes";
import IndieSemicProduct from "../StoreComponents/ProductPage/indieSemicProduct";
import Product from "../StoreComponents/ProductPage/Product";
const DynamicRoutes = () => {
    return (
        <>
            <MegaNavigation />
            <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/product" element={<Product />} />
            </Routes>
        </>
    )
}

export default DynamicRoutes