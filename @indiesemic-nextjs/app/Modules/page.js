"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const Modules = dynamic(() => import("../../components/Modules/Modules"));
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function ModulesPage() {
  return (
    <>
      <NavigationWrap />
      <Modules />
      <Footer />
    </>
  );
}
