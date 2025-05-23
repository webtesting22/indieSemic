import React from "react";
import SOCBackImage from "./TryBanner.jpg";
import "./SOCModule.css";
import { Row, Col } from "antd";
import { IoArrowRedoCircle, IoHardwareChip, IoFlash, IoShield, IoCog } from "react-icons/io5";
const GlobalStandardsIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
        <path d="M24 4 L26 10 L24 16 L22 10 Z" fill="currentColor"/>
        <path d="M44 24 L38 26 L32 24 L38 22 Z" fill="currentColor"/>
        <path d="M24 44 L22 38 L24 32 L26 38 Z" fill="currentColor"/>
        <path d="M4 24 L10 22 L16 24 L10 26 Z" fill="currentColor"/>
        <circle cx="24" cy="24" r="3" fill="currentColor"/>
        <path d="M15 15 L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M33 15 L29 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 33 L19 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M33 33 L29 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const ScalableIPIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="16" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="12" y="20" width="6" height="6" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="21" y="20" width="6" height="6" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="30" y="20" width="6" height="6" rx="1" fill="currentColor" opacity="0.4"/>
        <rect x="12" y="28" width="6" height="4" rx="1" fill="currentColor" opacity="0.6"/>
        <rect x="21" y="28" width="6" height="4" rx="1" fill="currentColor" opacity="0.4"/>
        <rect x="30" y="28" width="6" height="4" rx="1" fill="currentColor" opacity="0.2"/>
        <path d="M24 6 L28 10 L24 14 L20 10 Z" fill="currentColor"/>
        <path d="M24 14 L24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 36 L24 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 38 L28 42 L24 46 L20 42 Z" fill="currentColor"/>
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="36" cy="12" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="12" cy="36" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.7"/>
        <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M36 12 L32 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M12 36 L16 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <path d="M36 36 L32 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
);
const SOCModule = () => {
    const microcontrollerFeatures = [
        {
            title: "Single-core 32-bit RISC-V MCU – Successfully taped out",
            icon: <IoHardwareChip />,
        },
        {
            title: "Designed for embedded, low-power smart systems",
            icon: <IoFlash />,
        },
        {
            title: "Developed with a lean, agile silicon team in India",
            icon: <IoCog />,
        },
        {
            title: "Paving the path for custom silicon innovation at scale",
            icon: <IoShield />,
        },
    ];

    const vajraFeatures = [
        {
            title: "Targets next-gen Automotive & ADAS systems",
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

    return (
        <div className="soc-module">
            {/* Hero Section */}
            <section className="soc-hero">
                <div className="soc-hero-background">
                    <div className="soc-hero-overlay"></div>
                    <img src={SOCBackImage} alt="Semiconductor Innovation" />
                </div>
                <div className="soc-hero-content">
                    <div className="soc-hero-text">
                        <h1 className="soc-main-heading">
                            India's Silicon Breakthrough: IndieSemic's RISC-V Revolution
                        </h1>
                        <p className="soc-hero-subtitle">
                            From microcontroller to multi-core AI—empowering automotive and surveillance systems with homegrown precision.
                        </p>
                        <button className="soc-cta-button">Get in Touch</button>
                    </div>
                    <div className="soc-hero-info">
                        <h2>Transforming Businesses with Cutting-Edge Solutions</h2>
                        <p>Leading technology company specializing in innovative semiconductor solutions and IT services</p>
                    </div>
                </div>
            </section>

            {/* Microcontroller Section */}
            <section className="soc-section">
                <div className="soc-container">
                    <div className="soc-content-block">
                        <h2 className="soc-section-heading">
                            Engineered at the Edge—India's Own RISC-V Microcontroller
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
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
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
                <div className="soc-container">
                    <div className="soc-content-block">
                        <div className="soc-section-header">
                            <h2 className="soc-section-heading">
                                Introducing Project "Vajra": India's Quad-Core AI Processor
                            </h2>
                            <p className="soc-section-subtitle">
                                Designed for vision. Built for autonomy. Powered by RISC-V.
                            </p>
                        </div>
                        <Row gutter={[32, 32]} align="middle">
                            <Col lg={12} md={24}>
                                <div className="soc-image-container">
                                    <img
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
                                        alt="Vajra AI Processor"
                                        className="soc-feature-image soc-glow-effect"
                                    />
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
                                <Col lg={12} md={12} sm={24} key={index}>
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
                        <button className="soc-cta-button soc-primary">Download Tech Brief</button>
                        <button className="soc-cta-button soc-secondary">Get in Touch with Our Team</button>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="soc-cta-section">
                <div className="soc-container">
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
        </div>
    );
};

export default SOCModule;