import React, { Suspense } from "react";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import EmergencyErrorBoundary from "../components/EmergencyErrorBoundary.jsx";

// Lazy load all route components for better code splitting
const HomeRoutes = React.lazy(() => import("../HomeRoutes/HomeRoutes"));
const Product = React.lazy(() =>
  import("../StoreComponents/ProductPage/Product")
);
const Footer = React.lazy(() => import("../Components/Footer/Footer"));
const Modules = React.lazy(() => import("../Components/Modules/Modules"));
const SOCModule = React.lazy(() => import("../Components/SOCModule/SOCModule"));
const IndividualProduct = React.lazy(() =>
  import("../StoreComponents/ProductPage/individualProduct")
);
const NavigationWrap = React.lazy(() =>
  import("../Components/MegaNavigation.jsx/MegaNavigatioIndex")
);
const Services = React.lazy(() => import("../Components/Services/Services"));
const TermsandConditions = React.lazy(() =>
  import("../Components/TermsAndConditionPages/TermsandConditions")
);
const PrivacyPolicy = React.lazy(() =>
  import("../Components/TermsAndConditionPages/PrivacyPolicy")
);
const ShippingDeliveryPolicy = React.lazy(() =>
  import("../Components/TermsAndConditionPages/ShippingandDeliveryPolicy")
);
const CancellationRefundPolicy = React.lazy(() =>
  import("../Components/TermsAndConditionPages/CancellationandRefundPolicy")
);
const ProductPurchaseVerificationModal = React.lazy(() =>
  import(
    "../StoreComponents/ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification"
  )
);
const DashboardView = React.lazy(() =>
  import("../Components/Dashboard/DashboardView")
);
const SIP = React.lazy(() => import("../Components/SIP/SIP"));

// Simple loading component for iOS Safari
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
      fontSize: "18px",
      color: "#666",
    }}
  >
    <div>Loading...</div>
  </div>
);
const DynamicRoutes = () => {
  const location = useLocation();
  const isLoggedIn =
    localStorage.getItem("email") && localStorage.getItem("password");

  // ❗ Hide Nav/Footer on these pages
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/dashboard";

  return (
    <EmergencyErrorBoundary>
      {!isAuthPage && (
        <Suspense fallback={<PageLoader />}>
          <NavigationWrap />
        </Suspense>
      )}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomeRoutes />} />
          <Route path="/iot-modules" element={<Product />} />
          <Route path="/product/:id" element={<IndividualProduct />} />
          <Route path="/Modules" element={<Modules />} />
          <Route path="/socmodule" element={<SOCModule />} />
          <Route path="/services" element={<Services />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsandConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/shipping-delivery-policy"
            element={<ShippingDeliveryPolicy />}
          />
          <Route
            path="/cancellation-refund-policy"
            element={<CancellationRefundPolicy />}
          />
          <Route
            path="/product-purchase-verification"
            element={<ProductPurchaseVerificationModal />}
          />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/sip" element={<SIP />} />
        </Routes>
      </Suspense>

      {!isAuthPage && (
        <Suspense fallback={<PageLoader />}>
          <Footer />
        </Suspense>
      )}
    </EmergencyErrorBoundary>
  );
};

export default DynamicRoutes;
