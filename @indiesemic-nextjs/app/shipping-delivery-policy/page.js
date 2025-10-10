"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const ShippingDeliveryPolicy = dynamic(() =>
  import("../../components/TermsAndConditionPages/ShippingandDeliveryPolicy")
);
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function ShippingPolicyPage() {
  return (
    <>
      <NavigationWrap />
      <ShippingDeliveryPolicy />
      <Footer />
    </>
  );
}
