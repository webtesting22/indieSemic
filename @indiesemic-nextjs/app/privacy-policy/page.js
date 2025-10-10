"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const PrivacyPolicy = dynamic(() =>
  import("../../components/TermsAndConditionPages/PrivacyPolicy")
);
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function PrivacyPage() {
  return (
    <>
      <NavigationWrap />
      <PrivacyPolicy />
      <Footer />
    </>
  );
}
