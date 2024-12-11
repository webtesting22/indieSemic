import React from "react";
import Hero from "../Components/HeroHome/Hero";
import AboutCompany from "../Components/AboutCompany/AboutCompany";
import Achivement from "../Components/Achivement/Achivement";
import ContactHome from "../Components/ContactHome/ContactHome";
import { ScrollTop } from 'primereact/scrolltop';
import NumbersComponent from "../Components/NumbersComponent/NumbersComponent";
import Expertise from "../Components/OurExpertise/Expertise";
import ExpertiseCards from "../Components/OurExpertise/ExpertiseCards";
const HomeRoutes = () => {
    return (
        <>
            <ScrollTop style={{ zIndex: "1000000", backgroundColor: 'black' }} />
            <Hero />


            <AboutCompany />
            <Achivement />
            <Expertise />
            <ExpertiseCards/>
            <NumbersComponent />
            <ContactHome />
        </>
    )
}
export default HomeRoutes