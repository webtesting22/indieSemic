import React from "react";
import { Routes, Route } from "react-router-dom";
import MegaNavigation from "../Components/MegaNavigation.jsx/MegaNavigation";
import Hero from "../Components/HeroHome/Hero";
const DynamicRoutes = () => {
    return (
        <>
            <MegaNavigation />
            <Routes>
                <Route path="/" element={<Hero />} />
            </Routes>
        </>
    )
}

export default DynamicRoutes