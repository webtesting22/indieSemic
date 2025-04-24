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
                                <button>Get in Touch</button>
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
                    <div>
                        <h2 className="ContainerHeading">Engineered at the Edge—India’s Own RISC-V Microcontroller</h2>
                    </div>
                    <br /><br />
                    <div className="ImagesGalleryContainer">
                        <Row>
                            {ImageGalleryImages.map((item, index) => (
                                <Col lg={8} md={12} style={{ width: "100%" }} key={index} data-aos="fade-up" data-aos-animation="1200" data-aos-delay={index * 300}>
                                    <div>
                                        <img src={item.SocImage} alt="" />
                                    </div>
                                </Col>
                            ))}
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
                </div>
            </section>
        </>
    )
}
export default SOCModule