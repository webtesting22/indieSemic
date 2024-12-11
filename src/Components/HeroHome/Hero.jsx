import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/Hero.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import BackBanner from "/Images/SliderImage.png"
import TryBanner from "/Images/TryBanner.jpeg"
import ChipVideo from "/Images/ChipVideo.mp4"
import CarouselVideo from "/Images/Cutting edge RF modules.mp4"
import MobileBanner from "/Images/Carousel for mobile.png"; // Image for Mobile
import newbanner from "/Images/Indiesemic_Mockup (9).jpg";
const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef([]);

    const CarousalImages = [

        {
            image: isMobile ? MobileBanner : BackBanner,
        },
        {
            image: CarouselVideo,
            // header:"Coming Soon!",
            // image: "https://images.unsplash.com/photo-1639004643319-a996b810d37e?q=80&w=3018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            // heading: "High-Performance Chips for Modern Devices",
            // tagline:"Efficiency and speed in every transistor",
        },
        // {
        //     image: "/Images/Slider1.webp",
        //     heading: "Driving Connectivity with Advanced SoCs",
        //     tagline: "Revolutionizing mobile and communication systems",
        // },
        // {
        //     image: "/Images/Slider3.jpg",
        //     heading: "Sustainable Semiconductor Solutions",
        //     tagline: "Eco-friendly innovation for a greener planet",
        // },

    ];
    useEffect(() => {
        const updateScreenSize = () => {
            setIsMobile(window.innerWidth <= 768); // Mobile if screen width <= 768px
        };

        updateScreenSize(); // Initial check
        window.addEventListener("resize", updateScreenSize); // Listen for resize events

        return () => window.removeEventListener("resize", updateScreenSize); // Cleanup
    }, []);
    const isImage = (src) => /\.(jpg|jpeg|png|gif|webp)$/i.test(src);
    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);

        videoRefs.current.forEach((video, index) => {
            if (video) {
                if (index === swiper.realIndex) {
                    video.play(); // Play video in active slide
                } else {
                    video.pause(); // Pause video in other slides
                    video.currentTime = 0; // Reset video
                }
            }
        });
    };
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
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        // onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        modules={[Autoplay, Pagination]}
                        onSlideChange={handleSlideChange}

                        className="mySwiper"
                    >
                        {CarousalImages.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="slideContent">
                                    <div className="imageOverlayContainer">
                                        {isImage(item.image) ? (
                                            <img src={item.image} alt={`Slide ${index + 1}`} />
                                        ) : (
                                            <video
                                                ref={(el) => (videoRefs.current[index] = el)} // Assign ref to each video
                                                src={item.image}
                                                autoPlay
                                                loop
                                                muted
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: isMobile ? "fill" : "cover",
                                                }}
                                            />
                                        )}
                                        <div className="overlay"></div>
                                    </div>
                                    {/* <div className="imageOverlayContainer">
                                        <img src={item.image} alt={`Slide ${index + 1}`} />
                                        <video
                                            src={ChipVideo}
                                            autoPlay
                                            loop
                                            muted
                                            style={{
                                                // transform: `translateY(${offsetY * 0.1}px)`,
                                                width: '100%',
                                                height: 'auto',
                                                objectFit:"cover"
                                            }}
                                        />
                                        <div className="overlay"></div>
                                    </div> */}
                                    <div className={'Heading'}>
                                        {item.header}
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