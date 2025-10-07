import React, { useEffect, useState, Suspense } from "react";

// Lazy load all components for better performance and code splitting
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
const NumbersComponent = React.lazy(() =>
  import("../Components/NumbersComponent/NumbersComponent")
);
const Expertise = React.lazy(() =>
  import("../Components/OurExpertise/Expertise")
);
const ExpertiseCards = React.lazy(() =>
  import("../Components/OurExpertise/ExpertiseCards")
);

// Import ScrollTop normally as it's lightweight
import { ScrollTop } from "primereact/scrolltop";

// Simple loader component for Suspense fallbacks
const SectionLoader = ({ height = "200px" }) => (
  <div
    style={{
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      margin: "20px 0",
    }}
  >
    <div style={{ fontSize: "14px", color: "#666" }}>Loading...</div>
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
    <div>
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

      {/* Numbers component - load it last */}
      <Suspense fallback={<SectionLoader height="200px" />}>
        <NumbersComponent />
      </Suspense>

      {/* Contact form - load last */}
      <Suspense fallback={<SectionLoader height="400px" />}>
        <ContactHome />
      </Suspense>

      {/* Scroll to top button */}
      <ScrollTop />
    </div>
  );
};
export default HomeRoutes;
