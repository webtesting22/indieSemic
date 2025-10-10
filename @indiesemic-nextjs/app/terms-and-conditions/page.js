"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const TermsandConditions = dynamic(() =>
  import("../../components/TermsAndConditionPages/TermsandConditions")
);
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function TermsPage() {
  return (
    <>
      <NavigationWrap />
      <TermsandConditions />
      <Footer />
    </>
  );
}
