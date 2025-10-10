"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const ProductPurchaseVerificationModal = dynamic(() =>
  import(
    "../../components/StoreComponents/ProductPage/ProductPurchesVerficationModal/ProductPurchaseVerification"
  )
);
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function VerificationPage() {
  return (
    <>
      <NavigationWrap />
      <ProductPurchaseVerificationModal />
      <Footer />
    </>
  );
}
