import React from "react";
import SOCBackImahe from "./TryBanner.jpg"
import "./SOCModule.css"
import { Row, Col } from "antd";

const SOCModule = () => {

    const PointsData = [
        {
            SocCardTitle: "Efficiency",
            SocCardDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            SocCardImage: "",
        },
        {
            SocCardTitle: "Reliability",
            SocCardDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            SocCardImage: "",
        },
        {
            SocCardTitle: "Innovative",
            SocCardDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            SocCardImage: "",
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
                                <h1 data-aos="fade-up" data-aos-duration="1400">Empowering businesses with cutting-edge technology solutions</h1>
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
                        <h2>Innovative Problem-Solving for Your Business Needs</h2>
                        <p style={{ color: "rgb(74, 144, 226)" }}>Solutions</p>
                    </div>
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
                        <Row>
                            <Col lg={12} data-aos="fade-right" data-aos-animation="3000" >
                                <div className="fadeImage">
                                    <img
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
                                        alt="Smooth Fading Image"
                                    />
                                </div>
                            </Col>
                            <Col lg={12} data-aos="fade-left" data-aos-animation="3000" >
                                <div className="RightSideContentContainerAboutChip">
                                    <h2>Innovative Problem-Solving for Your Business Needs</h2>
                                    <p style={{ color: "rgb(74, 144, 226)" }}>Solutions</p>
                                    <div>
                                        {PointsData.map((item, index) => (
                                            <div key={index}>
                                                <h2>{item.SocCardTitle}</h2>
                                                <p>{item.SocCardDescription}</p>
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