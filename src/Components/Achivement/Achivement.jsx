import React, { useState, useEffect, useRef } from "react";
import "../../Styles/Achivement.css";
import Back2 from '/Images/AboutImage.jpg';
import Back from "/Images/soc.jpg"

const Achivement = () => {
    const sectionRef = useRef(null);
    const [offsetY, setOffsetY] = useState(0);
    useEffect(() => {
        // Intersection Observer to detect visibility of the section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    } else {
                        setIsInView(false);
                    }
                });
            },
            {
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);


    return (
        <>


            <section id="AchivementContainer" ref={sectionRef} className="section_Padding">
                <div >
                    <div className="DesignedContainer">
                        <h1 data-aos="fade-up"><span style={{ color: "rgb(74, 144, 226)" }}>Driving Innovation</span> in Semiconductor Technology</h1>
                        <p data-aos="fade-up">Shaping the Future of Technology Through Groundbreaking Semiconductor Design and Innovation.</p>
                    </div>
                </div>
                <div id="CardColumns">
                    <div>
                        <div className="BoxEdit">

                            <div className="blackoverlay">

                            </div>
                            <div className="Title">
                                <h1> SOC MODULES</h1>
                            </div>
                            <div className="Content">
                                <div>
                                    <h2>The Building Block of Modern Technology</h2>
                                    <p>Semiconductors are materials with electrical conductivity between that of a conductor and an insulator, making them essential in modern electronics.</p>
                                </div>
                            </div>

                            <img src={Back} alt="" style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                            }} />
                        </div>
                    </div>
                    <div>
                        <div className="BoxEdit">
                            <div className="blackoverlay">

                            </div>
                            <div className="Title">
                                <h1> RF MODULES</h1>
                            </div>
                            <div className="Content">
                                <div>
                                    <h2>The Building Block of Modern Technology</h2>
                                    <p>Semiconductors are materials with electrical conductivity between that of a conductor and an insulator, making them essential in modern electronics.</p>
                                </div>
                            </div>
                            <img src={Back2} alt="" style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                            }} />
                        </div>
                    </div>
                </div>
                <div className="FixedImage" />


            </section></>
    );
};

export default Achivement;
