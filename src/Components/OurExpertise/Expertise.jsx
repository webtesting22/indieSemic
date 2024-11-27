import React, { useState, useEffect,useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import "../../Styles/Expertise.css";
import { Row, Col } from 'antd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BackShapeImg from "./BackShapeImg.svg"
const Expertise = () => {
    const [visibleIndexes, setVisibleIndexes] = useState([]); // Track visible cards
    const sectionRefs = useRef([]); // Ref array for all cards
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute("data-index"));
                    if (entry.isIntersecting) {
                        // Add the index to visibleIndexes when the card is in view
                        setVisibleIndexes((prev) => [...new Set([...prev, index])]);
                    } else {
                        // Remove the index from visibleIndexes when the card exits the view
                        setVisibleIndexes((prev) => prev.filter((i) => i !== index));
                    }
                });
            },
            { threshold: 0.5 } // Trigger animation when 50% is visible
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);
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
            {/* <div className="expertise-header">
                <div className="sectionHeading"> */}
            {/* <div className="expertise-header">
                <div className="expertise-heading">
>>>>>>> Stashed changes
                    <h2>What We Excel </h2>
                </div>

                <div className="expertise-description">
                    <p>
                        We specialize in advanced semiconductor solutions, delivering high-performance chips, integrated circuits,
                        and energy-efficient systems tailored for industries like telecommunications, automotive, and electronics.
                        Our precision engineering and sustainable practices drive innovation for a smarter, connected future.
                    </p>
                </div>
            </div> */}

            {/* <div className="expertise-cards">
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
                        </Row> */}
            {/* <div className="expertise-cards">
                {expertiseCards.map((card, index) => (
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
                ))}
            </div> */}

            {/* </div>
                </div> */}
            <div className='ExpertiseCardContainer'>
                <img src={BackShapeImg} alt="" className='Overlayimage' />
                <div className="DesignedContainer" id='Target'>
                    <h1 style={{ textAlign: "left" }}>Innovating Tomorrow’s Chips with Precision and Excellence Today</h1>
                    {/* <p>Revolutionizing the future of technology with cutting-edge chip design and development.</p> */}
                </div>

                <div className='ContentRow'>
                    <Row>
                        <Col lg={12}>
                            <div className='imageContainer'>
                                <img src="https://plus.unsplash.com/premium_photo-1664301926600-5d25b8af1fca?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className='SideContentContainer'>
                                <h3>Why should you redesign your website?</h3>
                                <p>Redesigning your website can be a powerful tool for improving a brand's online presence and reaching a wider audience. A fresh well-designed website is a new asset that companies have discovered.

                                </p>
                                <button><ArrowRightAltIcon /> Read More</button>
                            </div>
                        </Col>

                    </Row>

                </div>
                <div className='ContentRow' id='ScrollingAnimation'>
                    <div className='StickyComponent'>
                        <div>
                            <h2>Revolutionizing Industries with Semiconductor Excellence</h2>
                            <p>From consumer electronics to industrial automation, our semiconductors transform ideas into reality, shaping the modern technological landscape.</p>
                        </div>
                        <br /><br />
                        {expertiseCards.map((item, index) => (
                            <div key={index} className={`ExpertiseCards ${visibleIndexes.includes(index) ? "fade-in" : "hidden"
                                }`}
                                data-index={index}
                                ref={(el) => (sectionRefs.current[index] = el)}>
                                <div className='SmallText'>
                                    <p>00{index + 1} Expertise - {item.title}</p>
                                </div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>{item.description}</p>
                                    <div className='ExpertiseImageContainer'>
                                        <img src={item.image} alt="" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='ImagesContainer'>
                        <div>
                            {/* <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;