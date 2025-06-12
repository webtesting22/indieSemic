import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import "../../Styles/Expertise.css";
import { Row, Col } from 'antd';

import LeftSide from "./LeftSide.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Expertise = () => {
    const [visibleIndexes, setVisibleIndexes] = useState([]);
    const sectionRefs = useRef([]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = parseInt(entry.target.getAttribute("data-index"));
                    if (entry.isIntersecting) {
                        setVisibleIndexes((prev) => [...new Set([...prev, index])]);
                    } else {
                        setVisibleIndexes((prev) => prev.filter((i) => i !== index));
                    }
                });
            },
            { threshold: 0.5 }
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


    const MarqueeTagData = [
        "./Images/MarqueeLogos/1.png",
        "./Images/MarqueeLogos/2.png",
        "./Images/MarqueeLogos/3.png",
        "./Images/MarqueeLogos/4.png",
        "./Images/MarqueeLogos/5.png",
        "./Images/MarqueeLogos/6.png",
        "./Images/MarqueeLogos/7.png",
    ]

    // Create an array with 100 repetitions of the logos
    const repeatedLogos = Array(100).fill(MarqueeTagData).flat();

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
                <div className='MarqueeContainer'>
                    <div className='MarqueeContent'>
                        {repeatedLogos.map((item, index) => (
                            <img key={index} src={item} alt="" />
                        ))}
                    </div>
                </div>
                <img src="/Images/BackShapeImg.svg" alt="" className='Overlayimage' />
                <div className="DesignedContainer" id='Target'>
                    <h1 style={{ textAlign: "left" }}><span style={{ color: "rgb(74, 144, 226)" }}>Innovating Tomorrow's Chips</span> with Precision and Excellence Today</h1>
                    {/* <p>Revolutionizing the future of technology with cutting-edge chip design and development.</p> */}
                </div>

                <div className='ContentRow' style={{ overflow: "hidden" }}>
                    <Row>
                        <Col lg={12}>
                            <div className='imageContainer' data-aos="fade-right"
                                data-aos-duration="1500">
                                <img src={LeftSide} alt="Advancements Semiconductor Technology" />
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className='SideContentContainer'>
                                {/* <h3 data-aos="fade-up">Advancements in Semiconductor Technology</h3> */}
                                <h3 data-aos='fade-up'>Shaping Tomorrow's Semiconductor Landscape in India</h3>
                                <p style={{ fontSize: "18px" }}> IndieSemic aims to set a critical milestone by achieving a breakthrough in the Fail-Safe Secure Controller SoC and RF modules within the next five years.<br /><br />
                                    This milestone encompasses the development and launch of flagship SoCs and RF modules that not only surpass current market offerings in terms of range, power efficiency and data transmission rates; but also introduces novel chipset architecture that significantly reduces production costs and energy consumption.<br /><br />
                                    Success in these endeavors will position India as a leader in efficient SoC designing and development along with secure wireless communication technology, underscoring our commitment to innovation, and paving way for future advancements that will continue to challenge and redefine industry standards.
                                </p>    {/* <p data-aos="fade-up">Semiconductor technology is at the core of modern electronics, driving innovation in devices like smartphones, computers, and automotive systems. With the continuous evolution of fabrication techniques, semiconductors are becoming smaller, faster, and more efficient. These advancements are essential for powering cutting-edge technologies, from artificial intelligence to 5G networks, revolutionizing industries and enabling the next wave of digital transformation. </p> */}
                                <br />
                                {/* <button data-aos="fade-left"
                                    data-aos-duration="1500"><ArrowRightAltIcon /> Read More</button> */}
                            </div>
                        </Col>

                    </Row>

                </div>

            </div>

        </section>
    );
};

export default Expertise;