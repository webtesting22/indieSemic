import React from "react";
import SOCBackImahe from "./TryBanner.jpg"
import "./SOCModule.css"
import { Row, Col } from "antd";

const SOCModule = () => {
    const PointsData = [
        {
            SocCardTitle: "- Targets next-gen Automotive & ADAS systems",
        },
        {
            SocCardTitle: "- Integrated support for Radar, Lidar, Camera feeds",
        },
        {
            SocCardTitle: "- On-chip AI acceleration – for real-time vision compute",
        },
        {
            SocCardTitle: "- Optimized for neural net inferencing at the edge",
        },
        {
            SocCardTitle: "- Secure, modular, scalable—designed for critical safety",
        },
    ]


    const ImageGalleryImages = [
        {
            SocImage: "https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp",
        },
        {
            SocImage: "https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp",
        },
        {
            SocImage: "https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp",
        },

    ]



    const OurPositioningData = [
        {
            title: "Sovereign Tech",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
        {
            title: "Custom for Bharat",
            icon: "/Images/SOCIcons/CustomforBharat.svg",
            description: "Tuned for Indian terrains, use-cases & costs"
        },
        {
            title: "Global Standards",
            icon: "/Images/SOCIcons/GlobalStandards.svg",
            description: "Built with automotive-grade reliability & ISO compliance"
        },
        {
            title: "Scalable IP",
            icon: "/Images/SOCIcons/ScalableIP.svg",
            description: "Core architecture extendable from smart sensors to autonomous vehicles"
        },
    ]


    const OurPositioningData2 = [
        {
            SocCardTitle: "- Single-core 32-bit RISC-V MCU – Successfully taped out",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
        {
            SocCardTitle: "- Designed for embedded, low-power smart systems",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
        {
            SocCardTitle: "- Developed with a lean, agile silicon team in India",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
        {
            SocCardTitle: "- Paving the path for custom silicon innovation at scale",
            icon: "/Images/SOCIcons/SovereignTech.svg",
            description: "Independence from global IP silos"
        },
    ]
    return (
        <>
            <section>
                <div className="HeighContainer">
                    <div>
                        <div className="OverlaySeparationback">

                        </div>
                        <img src={SOCBackImahe} alt="" />
                    </div>
                    <div className="AbsoluteContentContainer">
                        <div>
                            <div>
                                <h1 data-aos="fade-up" data-aos-duration="1400" className="ContainerHeading" style={{ color: "white" }}>India's Silicon Breakthrough: IndieSemic’s RISC-V Revolution</h1>
                                <p style={{ color: "white" }}>From microcontroller to multi-core AI—empowering automotive and surveillance systems with homegrown precision.</p>
                                <br />
                                <button className="SOCButton">Get in Touch</button>
                            </div>
                            <div className="BottomContentContainer">
                                <div>
                                    <h2 data-aos="fade-up" data-aos-duration="1400">Transforming Businesses with Cutting-Edge Solutions</h2>
                                </div>
                                <div>
                                    <p data-aos="fade-up" data-aos-duration="1400">FINETECH© is a leading technology company specializing in providing innovative software solutions and IT services</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_Padding" id="SOCMainContainer">
                    <br /><br />
                    <div className="ChiprelatedDescriptionContainer" style={{ overflow: "hidden" }}>
                        <div>
                            <h2 className="ContainerHeading">Engineered at the Edge—India’s Own RISC-V Microcontroller</h2>
                            {/* <p>Designed for vision. Built for autonomy. Powered by RISC-V.</p> */}
                        </div>
                        <br /><br />
                        <Row>
                            <Col lg={12} data-aos="fade-left" data-aos-animation="3000" data-aos-delay="800" >
                                <div className="RightSideContentContainerAboutChip" style={{ margin: "0px" }}>
                                    <div>
                                        {OurPositioningData2.map((item, index) => (
                                            <div key={index}>
                                                <h2>{item.SocCardTitle}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} data-aos="fade-right" data-aos-animation="3000" data-aos-delay="400" >
                                <div className="fadeImage">
                                    <img
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
                                        alt="Smooth Fading Image"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="ChiprelatedDescriptionContainer" style={{ overflow: "hidden" }}>
                        <div>
                            <h2 className="ContainerHeading">Introducing Project “Vajra”: India’s Quad-Core AI Processor</h2>
                            <p>Designed for vision. Built for autonomy. Powered by RISC-V.</p>
                        </div>
                        <br /><br />
                        <Row>
                            <Col lg={12} data-aos="fade-right" data-aos-animation="3000" data-aos-delay="400" >
                                <div className="fadeImage">
                                    <img
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
                                        alt="Smooth Fading Image"
                                    />
                                </div>
                            </Col>
                            <Col lg={12} data-aos="fade-left" data-aos-animation="3000" data-aos-delay="800" >
                                <div className="RightSideContentContainerAboutChip">
                                    <div>
                                        {PointsData.map((item, index) => (
                                            <div key={index}>
                                                <h2>{item.SocCardTitle}</h2>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="AnimatedCardsContainerEdit">
                        <div className="sensor-tech-section">
                            <h2 className="ContainerHeading text-center">
                                Engineered at the Edge—India’s Own RISC-V Microcontroller
                            </h2>
                            <div className="sensor-features-container">
                                <Row gutter={24}>
                                    {OurPositioningData.map((feature, index) => (
                                        <Col lg={12} md={24} sm={24} key={index}>
                                            <div className="sensor-feature-card" data-aos="fade-up" data-aos-delay={index * 200}>
                                                <img src={feature.icon} alt="Indiesemic Microcontroller Cards Images" />
                                                <h3>{feature.title}</h3>
                                                <p style={{ margin: "0px" }}>{feature.description}</p>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                            <button className="SOCButton">Download Tech Brief</button>
                            <button className="SOCButton">Get in Touch with Our Team</button>
                        </div>
                    </div>
                    <br /><br />

                </div>
                <div className="ImageStickyContainer">
                    <div>
                        <h1 className="ContainerHeading">Be a Part of India’s Semiconductor Future</h1>
                        <p>We’re partnering with Tier-1s, OEMs, and Innovators to redefine compute in motion.</p>
                        <p><b><i>“Join our journey. Let’s make India the brain of the machines that move the world.”</i></b></p>
                    </div>
                </div>

            </section>
        </>
    )
}
export default SOCModule