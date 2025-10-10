import { useMemo, lazy, Suspense } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

// Lazy load all components
const HomeRoutes = lazy(() => import("../HomeRoutes/HomeRoutes"));
const Footer = lazy(() => import("../Components/Footer/Footer"));
const NavigationWrap = lazy(() =>
  import("../Components/MegaNavigation.jsx/MegaNavigatioIndex")
);
const Product = lazy(() => import("../StoreComponents/ProductPage/Product"));
const IndividualProduct = lazy(() =>
  import("../StoreComponents/ProductPage/individualProduct")
);
const Modules = lazy(() => import("../Components/Modules/Modules"));
const SOCModule = lazy(() => import("../Components/SOCModule/SOCModule"));
const Services = lazy(() => import("../Components/Services/Services"));
const TermsandConditions = lazy(() =>
  import("../Components/TermsAndConditionPages/TermsandConditions")
);
const PrivacyPolicy = lazy(() =>
  import("../Components/TermsAndConditionPages/PrivacyPolicy")
);
const ShippingDeliveryPolicy = lazy(() =>
  import("../Components/TermsAndConditionPages/ShippingandDeliveryPolicy")
);
const CancellationRefundPolicy = lazy(() =>
  import("../Components/TermsAndConditionPages/CancellationandRefundPolicy")
);
const ProductPurchaseVerificationModal = lazy(() =>
  import(
    "../StoreComponents/ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification"
  )
);
const DashboardView = lazy(() =>
  import("../Components/Dashboard/DashboardView")
);
const SIP = lazy(() => import("../Components/SIP/SIP"));

// Simple loading component
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontSize: "1.5rem",
      color: "#666",
    }}
  >
    Loading...
  </div>
);
const DynamicRoutes = () => {
  const location = useLocation();

  // ❗ Hide Nav/Footer on these pages
  const isAuthPage = useMemo(() => {
    return (
      location.pathname === "/sign-in" || location.pathname === "/dashboard"
    );
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      {!isAuthPage && <NavigationWrap />}
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/iot-modules" element={<Product />} />
        <Route path="/product/:id" element={<IndividualProduct />} />
        <Route path="/Modules" element={<Modules />} />
        <Route path="/socmodule" element={<SOCModule />} />
        <Route path="/services" element={<Services />} />
        <Route path="/terms-and-conditions" element={<TermsandConditions />} />
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
      {!isAuthPage && <Footer />}
    </Suspense>
  );
};

export default DynamicRoutes;
