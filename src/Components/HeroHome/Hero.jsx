import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../Styles/Hero.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const CarousalImages = [
        {
            image: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://plus.unsplash.com/premium_photo-1714618993404-1c25dd17afb7?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
                        }}
                        speed={1000}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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
                                    <div className={`slideText ${activeIndex === index ? "fade-in" : "fade-out"
                                        }`}>{item.heading}</div>
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