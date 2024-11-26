import React, { useState, useEffect, useRef } from "react";
import "../../Styles/Achivement.css";
import { Row, Col } from "antd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import Back from "./Back.jpeg"
const Achivement = () => {
    const [isInView, setIsInView] = useState(false); // Track visibility of the section
    const [offsetY, setOffsetY] = useState(0);
    const [counters, setCounters] = useState({
        customers: 0,
        awards: 0,
        marketReady: 0,
    });

    const AchivementvaluesData = [
        {
            icon: <SupervisorAccountIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "50+",
            text: "Customers",
            key: "customers",
            target: 50,
        },
        {
            icon: <EmojiEventsSharpIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "5+",
            text: "Awards",
            key: "awards",
            target: 5,
        },
        {
            icon: <StoreSharpIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "15+",
            text: "Market Ready Modules",
            key: "marketReady",
            target: 15,
        },
    ];

    const sectionRef = useRef(null);

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

    useEffect(() => {
        if (isInView) {
            const maxIterations = Math.max(
                AchivementvaluesData[0].target,
                AchivementvaluesData[1].target,
                AchivementvaluesData[2].target
            );
            // Start counting animation when in view
            const interval = setInterval(() => {
                setCounters((prevCounters) => {
                    const newCounters = { ...prevCounters };

                    AchivementvaluesData.forEach(item => {
                        // Sync the counters
                        if (newCounters[item.key] < item.target) {
                            newCounters[item.key] = Math.min(
                                newCounters[item.key] + (item.target / maxIterations),
                                item.target
                            );
                        }
                    });

                    return newCounters;
                });
            }, 100); // Adjust this to control speed of animation

            return () => clearInterval(interval); // Cleanup on unmount or when out of view
        } else {
            // Reset counters when out of view
            setCounters({
                customers: 0,
                awards: 0,
                marketReady: 0,
            });
        }
    }, [isInView]);


    // Update scroll position

    useEffect(() => {
        // Update the parallax offset only when the section is in view
        const handleScroll = () => {
            if (isInView) {
                const sectionTop = sectionRef.current.getBoundingClientRect().top;
                setOffsetY(sectionTop * 0.5); // Adjust the multiplier for the desired effect
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isInView]);


    return (
        <>

            <div className="section_Padding"></div>
            <section id="AchivementContainer" ref={sectionRef} className="section_Padding">
                <div >
                    <div className="DesignedContainer">
                        <h1>Empowering Innovation in Semiconductor Solutions</h1>
                        <p>Revolutionizing the future of technology with cutting-edge chip design and development.</p>
                    </div>
                </div>
                <div>
                    <div className="BoxEdit">
                        <div className="blackoverlay">

                        </div>
                        <div className="Content">
                            <div>
                                <h2>Build scalable web and mobile applications</h2>
                                <p>We accelerate the development with a dedicated team who extends the capabilities of any idea and the vision of any product.</p>
                            </div>
                            </div>
                        <img src={Back} alt="" style={{
                            transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                        }} />
                    </div>
                </div>
                {/* <div className="FixedImage" />

            <div className="AchivementValuesContainer">
                <div className="OverlayContainer">

                </div>
                <Row >
                    {AchivementvaluesData.map((item, index) => (
                        <Col lg={8} md={12} sm={24} key={index} style={{ width: "100%" }}>
                            <div className="CountersContainer">
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {item.icon}&nbsp;
                                    <h1 style={{ color: "white" }}>
                                       {counters[item.key].toFixed(0)}+

                                    </h1>
                                </div>
                                <p style={{ color: "white" }}>{item.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div> */}
            </section></>
    );
};

export default Achivement;
