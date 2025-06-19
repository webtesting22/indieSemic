import React, { useState } from "react";
import SOCBackImage from "./TryBanner.jpg";
import "./SOCModule.css";
import { Row, Col, Modal } from "antd";
import { Link } from "react-router-dom";
import { IoArrowRedoCircle, IoHardwareChip, IoFlash, IoShield, IoCog } from "react-icons/io5";
import ContactHome from '../ContactHome/ContactHome';

const SOCModule = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const microcontrollerFeatures = [
        {
            title: "Single-core 32-bit RISC-V based MCU",
            icon: <IoHardwareChip />,
        },
        {
            title: "Successfully taped out our first iteration",
            icon: <IoFlash />,
        },
        {
            title: "Ongoing development for defence and medical applications",
            icon: <IoCog />,
        },
        {
            title: "Paving the path for custom silicon innovation at scale",
            icon: <IoShield />,
        },
    ];

    const vajraFeatures = [
        {
            title: "Targets next-gen Automotive & Surveillance systems",
        },
        {
            title: "Integrated support for Radar, Lidar, Camera feeds",
        },
        {
            title: "On-chip AI acceleration – for real-time vision compute",
        },
        {
            title: "Optimized for neural net inferencing at the edge",
        },
        {
            title: "Secure, modular, scalable—designed for critical safety",
        },
    ];

    const positioningData = [
        {
            title: "Sovereign Tech",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
        {
            title: "Custom for Bharat",
            icon: "/Images/SOCIcons/CustomforBharat.svg",
            description: "Tuned for Indian terrains, use-cases & costs"
        },
        {
            title: "Global Standards",
            icon: "/Images/SOCIcons/GlobalStandards copy.svg",
            description: "Built with automotive-grade reliability & ISO compliance"
        },
        {
            title: "Scalable IP",
            icon: "/Images/SOCIcons/GlobalStandards copy.svg",
            description: "Core architecture extendable from smart sensors to autonomous vehicles"
        },
    ];


    const MarqueeDate = Array(50).fill({ text: "Coming Soon" });

    // Repeat MarqueeDate to reach 150 items
    const repeatedMarqueeData = Array.from({ length: 150 }, (_, i) => ({
        ...MarqueeDate[i % MarqueeDate.length],
        id: i,
    }));
    return (
        <div className="soc-module">
            {/* Hero Section */}
            <section className="soc-hero">
                <div className="soc-hero-background">
                    <div className="soc-hero-overlay"></div>
                    <img src="/Images/SOCBack.jpeg" alt="Semiconductor Innovation" />
                </div>
                <div className="soc-hero-content">
                    <div className="soc-hero-text">
                        <h1 className="soc-main-heading">
                            India's Silicon Breakthrough: IndieSemic's RISC-V Revolution
                        </h1>
                        <p className="soc-hero-subtitle">
                            From microcontroller to multi-core AI—empowering industries with homegrown precision.
                        </p>
                        {/* <button className="soc-cta-button">Get in Touch</button> */}
                    </div>
                    <div className="soc-hero-info">
                        <h2>Transforming Businesses with Cutting-Edge Solutions (OK)</h2>
                        <p>Leading technology company specializing in innovative semiconductor solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Microcontroller Section */}
            <section className="soc-section backset">
                <div className="soc-container">
                    <div className="soc-content-block">
                        <h2 className="soc-section-heading">
                            India’s own RISC-V based controller for Defence, Medical, Robotics, & UAVs.
                        </h2>
                        <Row gutter={[32, 32]} align="middle">
                            <Col lg={12} md={24}>
                                <div className="soc-features-list">
                                    {microcontrollerFeatures.map((item, index) => (
                                        <div key={index} className="soc-feature-item">
                                            <div className="soc-feature-icon">
                                                {item.icon}
                                            </div>
                                            <h3>{item.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col lg={12} md={24}>
                                <div className="soc-image-container">
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/UBDwOQMdOlLiZ0JHGzCf/6.jpg"
                                        alt="RISC-V Microcontroller"
                                        className="soc-feature-image"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>

            {/* Vajra Project Section */}
            <section className="soc-section soc-dark-section">
                <div className="marquee-wrapper">
                    <div className="marquee-content">
                        <ul>
                            {MarqueeDate.map((item, index) => (
                                <li key={index}>
                                    {item.text}!
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
                <br /><br />
                <div className="soc-container" style={{ background: "transparent" }}>
                    <div className="soc-content-block">
                        <div className="soc-section-header">
                            <h2 className="soc-section-heading">
                                Introducing Project "ISC-R1": India's Quad-Core AI Processor
                            </h2>
                            <p className="soc-section-subtitle">
                                Designed for vision. Built for autonomy. Powered by RISC-V.
                            </p>
                        </div>
                        <Row gutter={[32, 32]} align="middle">
                            <Col lg={12} md={24} style={{ minHeight: "500px" }}>
                                <div className="soc-image-container" style={{ height: "500px", width: "90%", borderRadius: "20px", paddingRight: "20px" }}>
                                    {/* <img
                                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/UBDwOQMdOlLiZ0JHGzCf/6.jpg"
                                        alt="Vajra AI Processor"
                                        className="soc-feature-image soc-glow-effect"
                                    /> */}
                                    <video
                                        className="loader-video"
                                        autoPlay
                                        muted
                                        // onEnded={handleVideoEnd}
                                        // onError={handleVideoError}
                                        playsInline
                                        style={{ height: "100%", width: "100%", borderRadius: "20px" }}
                                    >
                                        <source src="/Images/NewVideo.mp4" type="video/mp4" />
                                        {/* Fallback if video doesn't load */}
                                        <div className="video-fallback">
                                            <div className="fallback-loader">
                                                <div className="spinner"></div>
                                                <p>Loading...</p>
                                            </div>
                                        </div>
                                    </video>
                                </div>
                            </Col>
                            <Col lg={12} md={24}>
                                <div className="soc-features-list">
                                    {vajraFeatures.map((item, index) => (
                                        <div key={index} className="soc-feature-item soc-feature-highlight">
                                            <div className="soc-feature-icon">
                                                <IoArrowRedoCircle />
                                            </div>
                                            <h3>{item.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>

            {/* Positioning Cards Section */}
            <section className="soc-section">
                <div className="soc-container">
                    <div className="soc-section-header">
                        <h2 className="soc-section-heading">
                            Our Strategic Positioning
                        </h2>
                    </div>
                    <div className="soc-cards-grid">
                        <Row gutter={[24, 24]}>
                            {positioningData.map((feature, index) => (
                                <Col lg={6} md={12} sm={24} key={index} style={{ width: "100%" }}>
                                    <div className="soc-positioning-card">
                                        <div className="soc-card-icon">
                                            <img src={feature.icon} alt={feature.title} />
                                        </div>
                                        <h3 className="soc-card-title">{feature.title}</h3>
                                        <p className="soc-card-description">{feature.description}</p>
                                        <div className="soc-card-glow"></div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="soc-action-buttons">
                        {/* <button className="soc-cta-button soc-primary">Download Tech Brief</button> */}
                        <button className="soc-cta-button soc-secondary" onClick={showModal}>Get in Touch with Our Team</button>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="soc-cta-section">
                <div className="soc-container" style={{ background: "transparent" }}>
                    <div className="soc-cta-content">
                        <h1 className="soc-cta-heading">
                            Be a Part of India's Semiconductor Future
                        </h1>
                        <p className="soc-cta-text">
                            We're partnering with Tier-1s, OEMs, and Innovators to redefine compute in motion.
                        </p>
                        <p className="soc-cta-quote">
                            <strong><em>"Join our journey. Let's make India the brain of the machines that move the world."</em></strong>
                        </p>
                    </div>
                </div>
            </section>

            <Modal
                title="Contact Us"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <ContactHome />
            </Modal>
        </div>
    );
};

export default SOCModule;