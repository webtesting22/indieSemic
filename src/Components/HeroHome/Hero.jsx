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
            image: "https://plus.unsplash.com/premium_photo-1683121716061-3faddf4dc504?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            , text: "Slide 1 Text"
        },
        {
            image: "https://images.unsplash.com/photo-1639004643319-a996b810d37e?q=80&w=3018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            , text: "Slide 1 Text"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1664301923554-fa1023546fd8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            , text: "Slide 1 Text"
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1714618993404-1c25dd17afb7?q=80&w=2921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            , text: "Slide 1 Text"
        }
    ]

    return (
        <>
            <section id="CarousalContainer">
                <div>
                    <Swiper
                        loop={true}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {CarousalImages.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="slideContent">
                                    <img src={item.image} alt={`Slide ${index + 1}`} />
                                    <div className={`slideText ${activeIndex === index ? "fade-in" : "fade-out"
                                        }`}>{item.text}</div>
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