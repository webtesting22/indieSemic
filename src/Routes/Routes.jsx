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
import IndividualProduct from "../StoreComponents/ProductPage/individualProduct";
import NavigationWrap from "../Components/MegaNavigation.jsx/MegaNavigatioIndex";
import Services from "../Components/Services/Services";
const DynamicRoutes = () => {
    return (
        <>
            <NavigationWrap />
            <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<IndividualProduct />} />
                <Route path="/Modules" element={<Modules />} />
                <Route path="/socmodule" element={<SOCModule />} />
                <Route path="/services" element={<Services />} />
            </Routes>
            <Footer />
        </>
    )
}

export default DynamicRoutes