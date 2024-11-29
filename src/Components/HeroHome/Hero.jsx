import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/Hero.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const CarousalImages = [
        {
            image: "/Images/Slider2.jpg",
            heading: "Innovating the Future of Semiconductors",
            tagline: "Powering breakthroughs in AI and IoT technology",
        },
        {
            image: "https://images.unsplash.com/photo-1639004643319-a996b810d37e?q=80&w=3018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            heading: "High-Performance Chips for Modern Devices",
            tagline: "Efficiency and speed in every transistor",
        },
        {
            image: "/Images/Slider1.webp",
            heading: "Driving Connectivity with Advanced SoCs",
            tagline: "Revolutionizing mobile and communication systems",
        },
        {
            image: "/Images/Slider3.jpg",
            heading: "Sustainable Semiconductor Solutions",
            tagline: "Eco-friendly innovation for a greener planet",
        }
    ];

    return (
        <>
            <section id="CarousalContainer">
                <div>
                    <Swiper
                        loop={true}
                        pagination={{
                            dynamicBullets: true,
                            clickable: true,
                        }}
                        speed={1000}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {CarousalImages.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="slideContent">
                                    <div className="imageOverlayContainer">
                                        <img src={item.image} alt={`Slide ${index + 1}`} />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className={`slideText `}>
                                        {item.heading}
                                    </div>
                                    <div className={`slideTagline ${activeIndex === index ? "slideText" : "slideText"}`}>
                                        <p>{item.tagline}</p>
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

            </section>
        </>
    )
}
export default Hero