import React from 'react';
import { Card, CardContent } from '@mui/material';
import "../../Styles/Expertise.css";
import { Row, Col } from 'antd';
const Expertise = () => {
    const expertiseCards = [
        {
            image: "https://plus.unsplash.com/premium_vector-1683129606388-a140556ced13?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "IOT Networks",
            description: "Connecting devices for seamless data sharing and automation."
        },
        {
            image: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Automotive",
            description: "Advancing smart vehicles with enhanced safety and performance."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Security",
            description: " Developing systems to safeguard data and ensure privacy."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1698421947098-d68176a8f5b2?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Health Care",
            description: "Innovating medical technology for improved diagnostics and patient care."
        },
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Communication",
            description: "Enabling fast and reliable data exchange across networks."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1680509034814-e733c5f873ac?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Robotics",
            description: "Designing intelligent machines to automate tasks and enhance efficiency."
        }
    ];

    return (
        <section id='expertise-page' className="section_Padding">
            <div className="expertise-header">
                <div className="sectionHeading">
                    <h2>What We Excel </h2>
                </div>

                <div className="expertise-description">
                    <p>
                        We specialize in advanced semiconductor solutions, delivering high-performance chips, integrated circuits,
                        and energy-efficient systems tailored for industries like telecommunications, automotive, and electronics.
                        Our precision engineering and sustainable practices drive innovation for a smarter, connected future.
                    </p>
                </div>
            </div>

            <div className="expertise-cards">
                <Row gutter={[16, 16]}>
                    {expertiseCards.map((card, index) => (
                        <Col lg={8} md={12} xs={24}>
                            <Card key={index} className="expertise-card">
                                <div className="card-image-wrapper">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="card-image"
                                    />
                                    <div className="card-image-overlay"></div>
                                </div>

                                <CardContent>
                                    <h3 className="card-title">{card.title}</h3>
                                    <p className="card-description">{card.description}</p>
                                </CardContent>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default Expertise;