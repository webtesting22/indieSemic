import React from "react";
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';

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
import TermsandConditions from "../Components/TermsAndConditionPages/TermsandConditions";
import PrivacyPolicy from "../Components/TermsAndConditionPages/PrivacyPolicy";
import ShippingDeliveryPolicy from "../Components/TermsAndConditionPages/ShippingandDeliveryPolicy";
import CancellationRefundPolicy from "../Components/TermsAndConditionPages/CancellationandRefundPolicy";
import ProductPurchaseVerificationModal from "../StoreComponents/ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification";
// import Dashboard from "../Components/Dashboard/Dashboard";
import DashboardWrapper from "../Components/Dashboard/DashboardWrapper";
const DynamicRoutes = () => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem("email") && localStorage.getItem("password");

    // ❗ Hide Nav/Footer on these pages
    const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/dashboard';

    return (
        <>
            {!isAuthPage && <NavigationWrap />}
            <Routes>
                <Route path="/" element={<HomeRoutes />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<IndividualProduct />} />
                <Route path="/Modules" element={<Modules />} />
                <Route path="/socmodule" element={<SOCModule />} />
                <Route path="/services" element={<Services />} />
                <Route path="/terms-and-conditions" element={<TermsandConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shipping-delivery-policy" element={<ShippingDeliveryPolicy />} />
                <Route path="/cancellation-refund-policy" element={<CancellationRefundPolicy />} />
                <Route path="/product-purchase-verification" element={<ProductPurchaseVerificationModal />} />
                <Route path="/dashboard" element={<DashboardWrapper />} />
            </Routes>
            {!isAuthPage && <Footer />}
        </>
    )
}

export default DynamicRoutes