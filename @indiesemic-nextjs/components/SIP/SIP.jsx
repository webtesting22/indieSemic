"use client";

import React, { useState } from "react";
import "./SIP.css";
import { Row, Col, Modal } from "antd";
import Link from "next/link";
import { IoArrowRedoCircle, IoHardwareChip, IoFlash, IoShield, IoCog, IoWifi, IoLockClosed, IoResize, IoSync } from "react-icons/io5";
import ContactHome from '../ContactHome/ContactHome';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SIP = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const sipFeatures = [
        {
            title: "Compact Form factor: Max efficiency in a small package",
            icon: <IoResize />,
        },
        {
            title: "Supports Bluetooth® 6.0 – LE Audio, Channel Sounding, Long Range",
            icon: <IoWifi />,
        },
        {
            title: "Multiprotocol Support: Thread, Matter, Zigbee, 2.4GHz proprietary",
            icon: <IoSync />,
        },
        {
            title: "TrustZone® security, AES-128, and on-chip encryption",
            icon: <IoLockClosed />,
        },
        {
            title: "Tailored for advanced applications",
            icon: <IoCog />,
        },
    ];

    const applications = [
        {
            title: "Smart Wearables",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Smart Wearables.png",
            points: [
                "Fitness bands, smart rings, hearables",
                "Body temperature and sleep trackers"
            ]
        },
        {
            title: "Healthcare & Medical",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Healthcare and Medical.png",
            points: [
                "Portable diagnostics, hearing aids",
                "Wireless patient monitoring"
            ]
        },
        {
            title: "IoT & Industrial",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/IoT and Industrial.png",
            points: [
                "Smart meters, condition monitors",
                "Predictive maintenance sensors"
            ]
        },
        {
            title: "Consumer Electronics",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Consumer Electronics.png",
            points: [
                "Remote controls, gaming controllers",
                "Touch and gesture input devices"
            ]
        },
    ];

    const marqueeText = "Coming Soon";

    return (
        <div className="sip-module">
            {/* Hero Section */}
            <section className="sip-hero">
                <div>
                    <div className="sip-hero-background">
                        <div className="sip-hero-overlay"></div>
                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Hero image.png" alt="SiP Module Innovation" />
                    </div>
                    <div className="sip-hero-content">
                        <div className="sip-hero-text">
                            <h1 className="sip-main-heading">
                                Integrated SiP Modules Designed for the Future of Wireless Innovation
                            </h1>
                            <p className="sip-hero-subtitle">
                                India's first System in Package - proudly designed and developed in India
                            </p>
                            <p className="sip-hero-subheadline">
                                Advanced Bluetooth® 6.0 System-in-Package modules delivering unmatched performance, ultra-low power, and compact integration for next-gen IoT and wearable designs.
                            </p>
                        </div>
                        <div className="sip-hero-info">
                            <h2>Transforming Connectivity with Ultra-Compact Solutions</h2>
                            <p>Leading the revolution in wireless technology with our advanced SiP modules.
                            </p>
                        </div>

                    </div>

                    {/* <section className="sip-marquee-section">
                    <div className="sip-coming-soon-marquee">
                        <div className="sip-marquee-track">
                            <span className="sip-marquee-text">Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • </span>
                            <span className="sip-marquee-text">Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • Coming Soon • </span>
                        </div>
                    </div>
                </section> */}

                </div>
                <div className="marquee-wrapper">
                    <div className="marquee-content">
                        <div className="marquee-track">
                            <span className="marquee-text">{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <div className="marquee-track">
                            <span className="marquee-text">{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{marqueeText}!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="sip-main-banner">
                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Main banner.png" alt="Main Banner" />
                </div>
            </section>
            <br />
            {/* <br /> */}
            {/* Series Overview Section */}
            <section className="sip-section backset">
                <div className="sip-container">
                    {/* <br /> */}
                    <div className="sip-content-block">
                        <p style={{ fontSize: "30px" }}><b>Coming Soon!</b></p>
                        <h2 className="sip-section-heading">
                            ISC-nRF54L-SiP Series: Ultra-Compact SiP Modules for High-Performance BLE Applications
                        </h2>
                        <p className="sip-section-description">
                            The ISC-nRF54L-SiP Series offers highly integrated System-in-Package (SiP) modules built on Nordic's nRF54L family.
                        </p>
                        <Row gutter={[32, 32]} align="middle">
                            <Col lg={14} md={24}>
                                <div className="sip-features-list">
                                    {sipFeatures.map((item, index) => (
                                        <div key={index} className="sip-feature-item">
                                            <div className="sip-feature-icon">
                                                {item.icon}
                                            </div>
                                            <h3>{item.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col lg={10} md={24}>
                                <div className="sip-image-container">
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Card Image 1.png"
                                        alt="ISC-nRF54L SiP Module"
                                        className="sip-feature-image"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>

            {/* Main Banner Section */}

            {/* Applications Section */}
            <section className="sip-section">
                <div className="sip-container">
                    <div className="sip-section-header">
                        <h2 className="sip-section-heading">
                            Applications & Use Cases
                        </h2>
                        <p className="sip-section-subtitle">
                            Empowering diverse industries with advanced wireless connectivity
                        </p>
                    </div>
                    <div className="sip-cards-grid">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={3}
                            navigation={true}
                            speed={800}
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 24,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                            className="applications-swiper"
                        >
                            {applications.map((app, index) => (
                                <SwiperSlide key={index}>
                                    <div className="sip-application-card">
                                        {/* Image at top */}
                                        <div className="sip-card-image">
                                            <img src={app.image} alt={app.title} />
                                        </div>

                                        {/* Title and points at bottom */}
                                        <div className="sip-card-content">
                                            <h3 className="sip-card-title">{app.title}</h3>
                                            <ul className="sip-points-list">
                                                {app.points.map((point, idx) => (
                                                    <li key={idx} className="sip-point-item">
                                                        <span className="sip-point-bullet">•</span>
                                                        <span className="sip-point-text">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="sip-card-glow"></div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="sip-action-buttons">
                        <button className="sip-cta-button sip-secondary" onClick={showModal}>
                            Get in Touch with Our Team
                        </button>
                    </div>
                </div>
            </section>

            {/* Coming Soon Marquee Section */}

            {/* Call to Action Section */}
            <section className="sip-cta-section">
                <div className="sip-container" style={{ background: "transparent" }}>
                    <div className="sip-cta-content">
                        <h1 className="sip-cta-heading">
                            Partner with India's SiP Innovation Leader
                        </h1>
                        <p className="sip-cta-text">
                            Join us in revolutionizing wireless connectivity with our advanced SiP modules.
                        </p>
                        <p className="sip-cta-quote">
                            <strong><em>"Experience the future of compact, powerful, and secure wireless solutions."</em></strong>
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

export default SIP;