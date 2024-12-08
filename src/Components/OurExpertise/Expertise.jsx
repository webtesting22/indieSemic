import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@mui/material';
import "../../Styles/Expertise.css";
import { Row, Col } from 'antd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BackShapeImg from "./BackShapeImg.svg"
import RightSideBack from "./RightSideBack.jpg"
import Robotics from "./Robotics.jpeg"
import HealthCare from "./HealthCare.jpeg"
import IOTNetwork from "./IOTNetwork.jpg"
import LeftSide from "./LeftSide.jpeg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
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
    const expertiseCards = [
        {
            image: "https://images.unsplash.com/photo-1676288176918-232f7caadfee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Automotive",
            description: "Advancing smart vehicles with enhanced safety and performance."
        },
        {
            image: IOTNetwork,
            title: "IOT Networks",
            description: "Connecting devices for seamless data sharing and automation."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Consumer Eletronics",
            description: " Developing systems to safeguard data and ensure privacy."
        },
        // {
        //     image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        //     title: "Security",
        //     description: " Developing systems to safeguard data and ensure privacy."
        // },

        {
            image: HealthCare,
            title: "Health Care",
            description: "Innovating medical technology for improved diagnostics and patient care."
        },
        {
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Communication",
            description: "Enabling fast and reliable data exchange across networks."
        },
        {
            image: Robotics,
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
                    <h1 style={{ textAlign: "left" }}><span style={{ color: "rgb(74, 144, 226)" }}>Innovating Tomorrow’s Chips</span> with Precision and Excellence Today</h1>
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
                <div className='ContentRow' id='ScrollingAnimation'>

                    <div className='StickyComponent'>
                        <div className="DesignedContainer" id='Target'>
                            <h1 style={{ textAlign: "left" }}><span style={{ color: "rgb(74, 144, 226)" }}>Revolutionizing Technology</span> with cutting-edge chip design</h1>
                            <p>From consumer electronics to industrial automation, our semiconductors transform ideas into reality, shaping the modern technological landscape.</p>
                        </div>
                        {/* <br /> */}
                        {/* <br /> */}
                        <div className='ExpertiseCardsContainer' >
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                spaceBetween={30}
                                breakpoints={{
                                    440: { slidesPerView: 1 }, // On small screens, show 1 slide
                                    768: { slidesPerView: 2 }, // On medium screens, show 2 slides
                                    1024: { slidesPerView: 3 }, // On large screens, show 3 slides
                                }}
                            >
                                {expertiseCards.map((item, index) => (
                                    <SwiperSlide key={index}>

                                        <div key={index} className="ExpertiseCards">
                                            <div data-aos="fade-up"
                                                data-aos-delay={index * 100}>
                                                <div className='SmallText'>
                                                    <p>00{index + 1} </p>
                                                </div>
                                                <div className='HeightContainer'>
                                                    <div className='ExpertiseImageContainer'>
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <br />
                                                    <div className='hoverContainer'>
                                                        <h2>{item.title}</h2>
                                                        <p>{item.description}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>

                                ))}
                            </Swiper>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Expertise;