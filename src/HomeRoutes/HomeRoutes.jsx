import React from "react";
import Hero from "../Components/HeroHome/Hero";
import AboutCompany from "../Components/AboutCompany/AboutCompany";
import Achivement from "../Components/Achivement/Achivement";
import ContactHome from "../Components/ContactHome/ContactHome";
import { ScrollTop } from 'primereact/scrolltop';

import Expertise from "../Components/OurExpertise/Expertise";
const HomeRoutes = () => {
    return (
        <>
            <ScrollTop style={{ zIndex: "1000000", backgroundColor: 'black' }} />
            <Hero />


            <AboutCompany />
            <Achivement />
            <Expertise />
            {/* <ContactHome /> */}
        </>
    )
}
export default HomeRoutes