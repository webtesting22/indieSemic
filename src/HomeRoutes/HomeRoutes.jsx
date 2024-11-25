import React from "react";
import Hero from "../Components/HeroHome/Hero";
import AboutCompany from "../Components/AboutCompany/AboutCompany";
import Achivement from "../Components/Achivement/Achivement";
import SingleProductPage from "../Components/SingleProductPage/SingleProduct";
import ContactHome from "../Components/ContactHome/ContactHome";
const HomeRoutes = () => {
    return (
        <>

        <Hero/>
        <AboutCompany/>
        <Achivement/>
        <SingleProductPage/>
        <ContactHome/>
        </>
    )
}
export default HomeRoutes