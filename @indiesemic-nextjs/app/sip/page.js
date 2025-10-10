"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const SIP = dynamic(() => import("../../components/SIP/SIP"));
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function SIPPage() {
  return (
    <>
      <NavigationWrap />
      <SIP />
      <Footer />
    </>
  );
}
