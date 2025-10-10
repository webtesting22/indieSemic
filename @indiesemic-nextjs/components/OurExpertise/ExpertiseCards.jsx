"use client";

import React from "react";
import Robotics from "./Robotics.jpeg"
import HealthCare from "./HealthCare.jpeg"
import IOTNetwork from "./IOTNetwork.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
const ExpertiseCards = () => {
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
            // image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            image: "/Images/Consumer electronics.jpg",
            title: "Consumer Electronics",
            description: "Empowering Lives, One Innovation at a Time.",
            // description: " Developing systems to safeguard data and ensure privacy."
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Security",
            description: " Developing systems to safeguard data and ensure privacy."
        },

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
        <div className='section_Padding' id='ScrollingAnimation'>
<hr style={{height:"2px",color:"rgb(74, 144, 226)",opacity:"1"}}/>
<br />
            <div className='StickyComponent'>
                <div className="DesignedContainer" id='Target'>
                    <h1 style={{ textAlign: "left" }}><span style={{ color: "rgb(74, 144, 226)" }}>Revolutionizing Technology</span> with cutting-edge chip design</h1>
                    <p>From consumer electronics to industrial automation, our products transform ideas into reality, shaping the modern technological landscape.</p>
                </div>
                {/* <br /> */}
                {/* <br /> */}
                <div className='ExpertiseCardsContainer' >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        loop={true}
                        speed={1000}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                        }}
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
    )
};
export default ExpertiseCards;