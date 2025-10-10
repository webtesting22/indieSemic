"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const SOCModule = dynamic(() => import("../../components/SOCModule/SOCModule"));
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function SOCModulePage() {
  return (
    <>
      <NavigationWrap />
      <SOCModule />
      <Footer />
    </>
  );
}
