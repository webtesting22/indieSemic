"use client";

import dynamic from "next/dynamic";

const NavigationWrap = dynamic(
  () => import("../../components/MegaNavigation/MegaNavigationIndex"),
  {
    loading: () => <Loading />,
  }
);
const Product = dynamic(
  () => import("../../components/StoreComponents/ProductPage/Product"),
  {
    loading: () => <Loading />,
  }
);
const Footer = dynamic(() => import("../../components/Footer/Footer"), {
  loading: () => <Loading />,
});

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

export default function IOTModulesPage() {
  return (
    <>
      <NavigationWrap />
      <Product />
      <Footer />
    </>
  );
}
