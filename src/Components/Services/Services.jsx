import React, { useState } from 'react';
import { Row, Col, Modal } from "antd";
import "./Services.css";
import { IoCheckmarkCircle, IoRocket, IoSettings } from "react-icons/io5";
import { Link } from "react-router-dom";
import ContactHome from '../ContactHome/ContactHome';

const Services = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const CardsData = [
        {
            icon: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/wt6HSLTbpXfHYLoXw3hk/WhatsApp Image 2025-05-16 at 10.25.03.jpeg",
            title: "Embedded Design Services",
            content: "Need something beyond our modules? We offer full-spectrum design services—from schematic layout to PCBA—for embedded products. Whether it's custom form factors, additional interfaces, firmware development, if it's based on our modules,we've got you covered.",
            pointsTitle: "What we offer:",
            offerPoints: [
                "Hardware engineering",
                "Embedded engineering",
                "Mechanical design Engineering",
                "Firmware engineering",
                "Manufacturing"
            ],
            gradient: "linear-gradient(135deg, rgba(63, 125, 196, 0.1) 0%, rgba(74, 144, 226, 0.05) 100%)",
            // accentIcon: <IoRocket />
        },
        {
            icon: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/BrD78HtcKhLJBHsbti2I/circuit-vector-icon-can-be-used-electrician-tools-iconset_717774-82672 (1).jpg",
            title: "Technical Support",
            content: "Already using our Modules? We offer reliable technical support to help you bring your idea to life smoothly. From integration advice to debugging help—we're with you all the way.",
            pointsTitle: "Supports includes",
            offerPoints: [
                "⁠Detasheets, reference designs, and sample codes",
                "Email and call support for debugging",
            ],
            gradient: "linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(63, 125, 196, 0.05) 100%)",
            // accentIcon: <IoSupport />
        }
    ];

    return (
        <>
            <div className="services-module">
                
                <section className="services-section">
                <img src="/Images/BackShapeImg.svg" alt="" className='Overlayimage' />
                    <div className="services-container">
                        {/* Header Section */}
                        <div className="services-header">
                            <h1 className="services-main-heading">
                                Tailored Design. Trusted Support.
                            </h1>
                            <p className="services-description">
                                At IndieSemiC, we don't just build cutting-edge tech—we help you build with it. 
                                Whether you're integrating our RF modules into your own products or need hands-on guidance, 
                                we're here to help.
                            </p>
                        </div>

                        {/* Stacked Cards Section */}
                        <div className="services-stack-container">
                            {CardsData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="services-stack-card"
                                    style={{ 
                                        '--stack-index': index,
                                        '--card-gradient': item.gradient 
                                    }}
                                >
                                    <div className="services-card-glow"></div>
                                    <div className="services-card-accent"></div>
                                    
                                    <Row gutter={[32, 32]} align="middle">
                                        <Col lg={8} md={12} sm={24}>
                                            <div className="services-icon-container">
                                                <div className="services-icon-wrapper">
                                                    <img src={item.icon} alt={item.title} />
                                                    <div className="services-accent-icon">
                                                        {item.accentIcon}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={16} md={12} sm={24}>
                                            <div className="services-content">
                                                <h2 className="services-card-title">
                                                    {item.title}
                                                </h2>
                                                <p className="services-card-description">
                                                    {item.content}
                                                </p>
                                                <h4 className="services-points-title">
                                                    {item.pointsTitle}
                                                </h4>
                                                <ul className="services-points-list">
                                                    {item.offerPoints.map((point, idx) => (
                                                        <li key={idx} className="services-point-item">
                                                            <IoCheckmarkCircle className="services-check-icon" />
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </div>

                        {/* Call to Action */}
                        <div className="services-cta">
                            <div className="services-cta-content">
                                <h3>Ready to Get Started?</h3>
                                <p>Let's discuss how we can help bring your products to life.</p>
                                <div className="services-cta-buttons">
                                    {/* <button className="services-cta-button services-primary">
                                        <IoSettings />
                                        Start Custom Design
                                    </button> */}
                                    <button className="services-cta-button services-secondary" onClick={showModal}>
                                        {/* <IoSupport /> */}
                                        GET IN TOUCH WITH OUR TEAM
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>

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
        </>
    );
};

export default Services;