import React, { useEffect, useState } from "react";
import Hero from "../Components/HeroHome/Hero";
import AboutCompany from "../Components/AboutCompany/AboutCompany";
import Achivement from "../Components/Achivement/Achivement";
import ContactHome from "../Components/ContactHome/ContactHome";
import { ScrollTop } from 'primereact/scrolltop';
import NumbersComponent from "../Components/NumbersComponent/NumbersComponent";
import Expertise from "../Components/OurExpertise/Expertise";
import ExpertiseCards from "../Components/OurExpertise/ExpertiseCards";
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
        <>
            {showLoader && (
                <div className="video-loader-container">
                    <video
                        className="loader-video"
                        autoPlay
                        muted
                        onEnded={handleVideoEnd}
                        onError={handleVideoError}
                        playsInline
                    >
                        <source src="/Images/HomePageLogoLoader.MOV" type="video/mp4" />
                        {/* Fallback if video doesn't load */}
                        <div className="video-fallback">
                            <div className="fallback-loader">
                                <div className="spinner"></div>
                                <p>Loading...</p>
                            </div>
                        </div>
                    </video>
                </div>
            )}
            <div className={`main-content ${showLoader ? 'content-hidden' : 'content-visible'}`}>
                <ScrollTop style={{ zIndex: "1000000", backgroundColor: 'black' }} />
                <Hero />
                <AboutCompany />
                <Achivement />
                <Expertise />
                <ExpertiseCards />
                <NumbersComponent />
                <ContactHome />
            </div>
        </>
    )
}
export default HomeRoutes