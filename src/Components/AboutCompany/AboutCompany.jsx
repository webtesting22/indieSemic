import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import "../../Styles/AboutContent.css"
import AboutContentVideo from "../../../public/Images/AboutContentVideo.mp4"
import { Row, Col } from "antd";
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BackImage from "./BackImage.jpeg"
const AboutCompany = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [startCount, setStartCount] = useState(false); // State to trigger count-up animation
    const sectionRef = useRef(null); // Ref for the observer

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartCount(true); // Trigger count-up when in view
                } else {
                    setStartCount(false); // Reset count when out of view
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    // Update scroll position
    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const CompanyData = [
        {
            points: "Customers",
            numbers: 50
        },
        {
            points: "Awards",
            numbers: 75
        },
        {
            points: "Market Ready Modules",
            numbers: 100
        },
    ];
    return (
        <>
            <section id="AboutCompanyContainer" className="section_Padding">
                <div className="backGroundAttachment">
                    
                </div>
                <div className="DesignedContainer">
                    <h1 data-aos="fade-up"><span style={{ color: "rgb(74, 144, 226)" }} >Empowering Innovation</span> in Semiconductor Solutions</h1>
                    <p data-aos="fade-up">Revolutionizing the future of technology with cutting-edge chip design and development.</p>
                </div>
                <div className="CompanyContentRow">
                    
                    <Row>
                        <Col lg={8}>
                            <div className="ListItemUl" ref={sectionRef}>
                                <ul>
                                    {CompanyData.map((item, index) => (
                                        <div key={index} className="statCard">
                                            {startCount && ( // Only render CountUp when in view
                                                <CountUp
                                                    start={0}
                                                    suffix="+"
                                                    end={item.numbers} // Target value
                                                    duration={5} // Animation duration
                                                    delay={0.3 * index} // Staggered delay for each card
                                                />
                                            )}
                                            <li>{item.points}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="MiddleImageContainer">
                                <img style={{
                                    transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                                }} src="https://images.unsplash.com/photo-1726739819428-a8f250e60691?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                                <div>
                                    <h2 >We are a dynamic design studio driven by a deep passion for creativity and innovation.</h2>
                                    <p>Our team is dedicated to crafting bespoke, thoughtful designs that not only reflect the individuality of your brand but also connect with your audience on a meaningful level. Every project we undertake is an opportunity to tell a unique story, blending strategy .</p>
                                    <br /><br />
                                    <div className="SideContentContainer">
                                        <button data-aos="fade-left"
                                            data-aos-duration="1500">
                                            <ArrowRightAltIcon />
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* <div className="AnimatedParallaxContainer">
                    <div >
                        <img
                            className="parallax-image"
                            style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                            }}
                            src="https://plus.unsplash.com/premium_photo-1683120974913-1ef17fdec2a8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        
                    </div>
                    <div>
                        <img
                            className="parallax-image"
                            style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed for second image
                            }}
                            src="https://images.unsplash.com/photo-1639004643579-7286ae5a771d?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        
                    </div>
                </div> */}
                {/* <div className="FixedImage" /> */}
                {/* <div style={{ position: "sticky" }}>
                    <Row>
                        <Col lg={12} md={24}>
                            <div className="AboutCompanyContent">
                                <div className="sectionHeading"><h2>Company Overview</h2></div>
                                <p>We are a leading provider of Design and Verification solutions.</p>
                                <p>
                                    Truechip, the Verification IP specialist, is a leading provider of
                                    Design and Verification solutions – which help you accelerate your
                                    design, lowering the cost and risks associated with the development
                                    of your ASIC, FPGA, and SOC. Truechip is a privately held company,
                                    with a global footprint and sales coverage across North America,
                                    Europe, and Asia.
                                </p>
                                <p>
                                    Truechip has been serving customers for the last 10 years in VLSI
                                    with strong and experienced leadership. Truechip provides the
                                    industry’s first 24x5 support model with specialization in VIP
                                    integration, customization, and SOC Verification.
                                </p>
                                <p>Get in Touch with us to learn about our Services.</p>
                            </div>
                        </Col>
                        <Col lg={12} md={24}>
                            <div className="VideoContainer">
                                <video
                                    className="BackgroundVideo"
                                    src={AboutContentVideo}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>

                        </Col>
                    </Row>

                </div> */}
            </section>
        </>
    )
}
export default AboutCompany