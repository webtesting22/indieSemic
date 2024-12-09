import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import "../../Styles/AboutContent.css"
import AboutContentVideo from "../../../public/Images/AboutContentVideo.mp4"
import { Row, Col } from "antd";
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BackImage from "./BackImage.jpeg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css/autoplay";
import "swiper/css/autoplay";

// Import Swiper styles
import 'swiper/css';

const AboutCompany = () => {
    const [offsetY, setOffsetY] = useState(0);
    const [startCount, setStartCount] = useState(false); // State to trigger count-up animation
    const sectionRef = useRef(null); // Ref for the observer

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Always trigger the counter reset each time the section is in view
                if (entry.isIntersecting) {
                    setStartCount(false);  // Reset the count
                    setTimeout(() => {
                        setStartCount(true);  // Start the count-up animation again
                    }, 0);  // Delay the start to ensure reset happens
                }
            },
            {
                threshold: 0.5, // Trigger when 50% of the element is visible
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef); // Observe the section
        }

        // Cleanup observer when component unmounts
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    // Update scroll position
    const handleScroll = () => {
        setOffsetY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const CompanyData = [
        {
            points: "Customers",
            numbers: 50
        },
        {
            points: "Awards",
            numbers: 75
        },
        {
            points: "Market Ready Modules",
            numbers: 100
        },
    ];

    const CarousalImages = [
        {
            image: "https://images.unsplash.com/photo-1726739819428-a8f250e60691?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            image: "https://images.unsplash.com/photo-1642229408339-572fa3328d10?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            image: '/Images/AboutImage3.jpg',
        }
        // {
        //     image: "https://plus.unsplash.com/premium_photo-1714618946021-8fbd6394d1a8?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // }
    ]
    return (
        <>
            <section id="AboutCompanyContainer" className="section_Padding">
                <div className="backGroundAttachment">

                </div>

                <div className="CompanyContentRow">

                    <Row>
                        {/* <Col lg={8}>
                            <div className="ListItemUl" ref={sectionRef}>
                                <ul>
                                    {CompanyData.map((item, index) => (
                                        <div key={index} className="statCard">
                                            {startCount && ( // Only render CountUp when in view
                                                <CountUp
                                                    start={0}
                                                    suffix="+"
                                                    end={item.numbers} // Target value
                                                    duration={5} // Animation duration
                                                    delay={0.3 * index} // Staggered delay for each card
                                                />
                                            )}
                                            <li>{item.points}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </Col> */}

                        <Col lg={12} md={24} xs={24}>
                            <div className="DesignedContainer">
                                <h1 data-aos="fade-up"  ><span style={{ fontSize: "50px" }}>IndieSemiC</span> <br /> <span style={{ color: "rgb(74, 144, 226)" }} >Making India's Way To Semiconductor</span></h1>
                                {/* <p data-aos="fade-up">Revolutionizing the future of technology with cutting-edge chip design and development.</p> */}
                            </div>
                            <div><br />
                                <div>
                                    <h2 >Empowering innovation and creativity through cutting-edge semiconductor design.</h2>

                                    <p>IndieSemiC specializes in semiconductor and embedded systems, with a focus on design and development of ASIC chipsets and RF modules. Our technology expertise spans BLE, WiFi, LoRa, GPS, Zigbee, and more.</p>
                                    <p>With a diverse clientele across Europe, the USA, and India, we are dedicated to delivering tailored solutions that drive technological advancements. At IndieSemiC, we strive to push the boundaries of the semiconductor industry while supporting our customers' growth and success on a global scale.</p>
                                    {/* <p>Our team is dedicated to crafting bespoke, thoughtful designs that not only reflect the individuality of your brand but also connect with your audience on a meaningful level. Every project we undertake is an opportunity to tell a unique story, blending strategy .</p> */}
                                    <br /><br />
                                    {/* <div className="SideContentContainer">
                                        <button data-aos="fade-left"
                                            data-aos-duration="1500">
                                            <ArrowRightAltIcon />
                                            Read More
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </Col>
                        <Col lg={1} md={0} xs={0} sm={0} />
                        <Col lg={11} md={24} xs={24}>
                            <div className="MiddleImageContainer">
                                {/* <Swiper
                                    loop={true}
                                    autoplay={{
                                        delay: 2500, // Delay between slides in milliseconds
                                        disableOnInteraction: false, // Allow autoplay to continue after user interaction
                                    }}

                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {CarousalImages.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={item.image} alt="" style={{
                                                transform: `translateY(${offsetY * 0.1}px)`,
                                            }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper> */}
                                {/* <img style={{
                                    transform: `translateY(${offsetY * 0.1}px)`,
                                }} src="https://images.unsplash.com/photo-1726739819428-a8f250e60691?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /> */}
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* <div className="AnimatedParallaxContainer">
                    <div >
                        <img
                            className="parallax-image"
                            style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed with the multiplier
                            }}
                            src="https://plus.unsplash.com/premium_photo-1683120974913-1ef17fdec2a8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        
                    </div>
                    <div>
                        <img
                            className="parallax-image"
                            style={{
                                transform: `translateY(${offsetY * 0.1}px)`, // Adjust speed for second image
                            }}
                            src="https://images.unsplash.com/photo-1639004643579-7286ae5a771d?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                        
                    </div>
                </div> */}
                {/* <div className="FixedImage" /> */}
                {/* <div style={{ position: "sticky" }}>
                    <Row>
                        <Col lg={12} md={24}>
                            <div className="AboutCompanyContent">
                                <div className="sectionHeading"><h2>Company Overview</h2></div>
                                <p>We are a leading provider of Design and Verification solutions.</p>
                                <p>
                                    Truechip, the Verification IP specialist, is a leading provider of
                                    Design and Verification solutions – which help you accelerate your
                                    design, lowering the cost and risks associated with the development
                                    of your ASIC, FPGA, and SOC. Truechip is a privately held company,
                                    with a global footprint and sales coverage across North America,
                                    Europe, and Asia.
                                </p>
                                <p>
                                    Truechip has been serving customers for the last 10 years in VLSI
                                    with strong and experienced leadership. Truechip provides the
                                    industry’s first 24x5 support model with specialization in VIP
                                    integration, customization, and SOC Verification.
                                </p>
                                <p>Get in Touch with us to learn about our Services.</p>
                            </div>
                        </Col>
                        <Col lg={12} md={24}>
                            <div className="VideoContainer">
                                <video
                                    className="BackgroundVideo"
                                    src={AboutContentVideo}
                                    autoPlay
                                    loop
                                    muted
                                />
                            </div>

                        </Col>
                    </Row>

                </div> */}
            </section>
        </>
    )
}
export default AboutCompany