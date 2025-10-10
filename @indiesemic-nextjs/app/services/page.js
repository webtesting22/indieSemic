"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(() =>
  import("../../components/MegaNavigation/MegaNavigationIndex")
);
const Services = dynamic(() => import("../../components/Services/Services"));
const Footer = dynamic(() => import("../../components/Footer/Footer"));

export default function ServicesPage() {
  return (
    <>
      <NavigationWrap />
      <Services />
      <Footer />
    </>
  );
}
