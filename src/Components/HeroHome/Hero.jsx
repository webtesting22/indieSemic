import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../Styles/Hero.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import BackBanner from "/Images/Cutting edge RF modules (1) (2).png"
import TryBanner from "/Images/TryBanner.jpeg"
import ChipVideo from "/Images/ChipVideo.mp4"
import CarouselVideo from "/Images/Cutting edge RF modules.mp4"
import MobileBanner from "/Images/Carousel for mobile (1).png"; // Image for Mobile
import newbanner from "/Images/Indiesemic_Mockup (9).jpg";
const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRefs = useRef([]);

    const CarousalImages = [
        {
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/1. Modules.png",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/2. SiP.png",
        },
        {
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/3. SoC.gif"
        }
       
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
                                                playsInline
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