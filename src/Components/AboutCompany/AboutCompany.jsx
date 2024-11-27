import React, { useState, useEffect } from "react";
import "../../Styles/AboutContent.css"
import AboutContentVideo from "../../../public/Images/AboutContentVideo.mp4"
import { Row, Col } from "antd";
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
const AboutCompany = () => {
    const [offsetY, setOffsetY] = useState(0);

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
    return (
        <>
            <section id="AboutCompanyContainer" className="section_Padding">
                <div className="DesignedContainer">
                    <h1>Empowering Innovation in Semiconductor Solutions</h1>
                    <p>Revolutionizing the future of technology with cutting-edge chip design and development.</p>
                </div>
                <div className="AnimatedParallaxContainer">
                    <div >
                        <img
                            className="parallax-image"
                            style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                            }}
                            src="https://plus.unsplash.com/premium_photo-1683120974913-1ef17fdec2a8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        <div className="text-field">
                            <div className="text-icon">
                                <MemoryRoundedIcon />
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.</p>
                        </div>
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
                        <div className="text-field">
                            <div className="text-icon">
                                <DeveloperBoardIcon />
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.</p>
                        </div>
                    </div>
                </div>
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