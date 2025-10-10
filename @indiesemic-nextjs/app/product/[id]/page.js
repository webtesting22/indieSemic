"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const NavigationWrap = dynamic(
  () => import("../../../components/MegaNavigation/MegaNavigationIndex"),
  {
    loading: () => <Loading />,
  }
);
const IndividualProduct = dynamic(
  () =>
    import("../../../components/StoreComponents/ProductPage/individualProduct"),
  {
    loading: () => <Loading />,
  }
);
const Footer = dynamic(() => import("../../../components/Footer/Footer"), {
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

export default function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <NavigationWrap />
      <IndividualProduct />
      <Footer />
    </>
  );
}
