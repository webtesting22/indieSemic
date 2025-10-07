import React, { useEffect, useState, Suspense } from "react";
import EmergencyErrorBoundary from "../Components/EmergencyErrorBoundary.jsx";

// Lazy load heavy components to reduce initial bundle size
const Hero = React.lazy(() => import("../Components/HeroHome/Hero"));
const AboutCompany = React.lazy(() =>
  import("../Components/AboutCompany/AboutCompany")
);
const Achivement = React.lazy(() =>
  import("../Components/Achivement/Achivement")
);
const ContactHome = React.lazy(() =>
  import("../Components/ContactHome/ContactHome")
);
const ScrollTop = React.lazy(() =>
  import("primereact/scrolltop").then((module) => ({
    default: module.ScrollTop,
  }))
);
const NumbersComponent = React.lazy(() =>
  import("../Components/NumbersComponent/NumbersComponent")
);
const Expertise = React.lazy(() =>
  import("../Components/OurExpertise/Expertise")
);
const ExpertiseCards = React.lazy(() =>
  import("../Components/OurExpertise/ExpertiseCards")
);

// Lightweight loading component for home page sections
const SectionLoader = ({ height = "100px" }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: height,
      backgroundColor: "rgba(0,0,0,0.02)",
      borderRadius: "8px",
      margin: "10px 0",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #007AFF",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    ></div>
    <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
  </div>
);
const HomeRoutes = () => {
  const [showLoader, setShowLoader] = useState(true);

  const handleVideoEnd = () => {
    setShowLoader(false);
  };

  const handleVideoError = () => {
    // If video fails to load, hide loader after 3 seconds
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };
  return (
    <EmergencyErrorBoundary>
      <div className="main-content">
        {/* Load ScrollTop first as it's lightweight */}
        <Suspense fallback={null}>
          <ScrollTop style={{ zIndex: "1000000", backgroundColor: "black" }} />
        </Suspense>

        {/* Hero section - load first as it's above the fold */}
        <Suspense fallback={<SectionLoader height="400px" />}>
          <Hero />
        </Suspense>

        {/* About section */}
        <Suspense fallback={<SectionLoader height="300px" />}>
          <AboutCompany />
        </Suspense>

        {/* Expertise section */}
        <Suspense fallback={<SectionLoader height="250px" />}>
          <Expertise />
        </Suspense>

        {/* Achievement section */}
        <Suspense fallback={<SectionLoader height="200px" />}>
          <Achivement />
        </Suspense>

        {/* Expertise cards */}
        <Suspense fallback={<SectionLoader height="300px" />}>
          <ExpertiseCards />
        </Suspense>

        {/* Numbers component - the problematic one, load it last */}
        <Suspense fallback={<SectionLoader height="200px" />}>
          <NumbersComponent />
        </Suspense>

        {/* Contact form - load last */}
        <Suspense fallback={<SectionLoader height="400px" />}>
          <ContactHome />
        </Suspense>
      </div>
    </EmergencyErrorBoundary>
  );
};
export default HomeRoutes;
