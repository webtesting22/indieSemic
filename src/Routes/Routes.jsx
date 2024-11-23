import React from "react";
import { Routes, Route } from "react-router-dom";
import MegaNavigation from "../Components/MegaNavigation.jsx/MegaNavigation";
import HomeRoutes from "../HomeRoutes/HomeRoutes";
const DynamicRoutes = () => {
    return (
        <>
            <MegaNavigation />
            <Routes>
                <Route path="/" element={<HomeRoutes />} />
            </Routes>
        </>
    )
}

export default DynamicRoutes