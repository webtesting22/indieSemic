"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const CancellationRefundPolicy = dynamic(() =>
  import("../../components/TermsAndConditionPages/CancellationandRefundPolicy")
);
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function RefundPolicyPage() {
  return (
    <>
      <NavigationWrap />
      <CancellationRefundPolicy />
      <Footer />
    </>
  );
}
