import React from "react";
import Hero from "../Components/HeroHome/Hero";
import AboutCompany from "../Components/AboutCompany/AboutCompany";
import Achivement from "../Components/Achivement/Achivement";
// import ContactHome from "../Components/ContactHome/ContactHome";
import NumbersComponent from "../Components/NumbersComponent/NumbersComponent";
import Expertise from "../Components/OurExpertise/Expertise";
import ExpertiseCards from "../Components/OurExpertise/ExpertiseCards";
import { ScrollTop } from "primereact/scrolltop";

const HomeRoutes = () => {
  return (
    <div>
      {/* Hero section - load first as it's above the fold */}
      <Hero />

      {/* About section */}
      <AboutCompany />

      {/* Expertise section */}
      <Expertise />

      {/* Achievement section */}
      <Achivement />

      {/* Expertise cards */}
      <ExpertiseCards />

      {/* Numbers component - load it last */}
      <NumbersComponent />

      {/* Contact form - load last */}
      {/* <ContactHome /> */}

      {/* Scroll to top button */}
      <ScrollTop />
    </div>
  );
};
export default HomeRoutes;
