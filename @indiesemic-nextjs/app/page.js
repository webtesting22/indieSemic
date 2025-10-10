"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load components with dynamic imports
const NavigationWrap = dynamic(
  () => import("../components/MegaNavigation/MegaNavigationIndex"),
  {
    loading: () => <Loading />,
  }
);
const Hero = dynamic(() => import("../components/HeroHome/Hero"), {
  loading: () => <Loading />,
});
const AboutCompany = dynamic(
  () => import("../components/AboutCompany/AboutCompany"),
  {
    loading: () => <Loading />,
  }
);
const Expertise = dynamic(
  () => import("../components/OurExpertise/Expertise"),
  {
    loading: () => <Loading />,
  }
);
const Achivement = dynamic(
  () => import("../components/Achivement/Achivement"),
  {
    loading: () => <Loading />,
  }
);
const ExpertiseCards = dynamic(
  () => import("../components/OurExpertise/ExpertiseCards"),
  {
    loading: () => <Loading />,
  }
);
const NumbersComponent = dynamic(
  () => import("../components/NumbersComponent/NumbersComponent"),
  {
    loading: () => <Loading />,
  }
);
const ContactHome = dynamic(
  () => import("../components/ContactHome/ContactHome"),
  {
    loading: () => <Loading />,
  }
);
const Footer = dynamic(() => import("../components/Footer/Footer"), {
  loading: () => <Loading />,
});

import { ScrollTop } from "primereact/scrolltop";

// Simple loading component
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

export default function Home() {
  return (
    <>
      <NavigationWrap />
      <main>
        <Hero />
        <AboutCompany />
        <Expertise />
        <Achivement />
        <ExpertiseCards />
        <NumbersComponent />
        <ContactHome />
        <ScrollTop />
      </main>
      <Footer />
    </>
  );
}
