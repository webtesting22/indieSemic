import React from "react";
import SOCBackImahe from "./TryBanner.jpg"
import "./SOCModule.css"
import { Row, Col } from "antd";
const SOCModule = () => {
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
                                <h1>Empowering businesses with cutting-edge technology solutions
                                </h1>
                            </div>
                            <div className="BottomContentContainer">
                                <div>
                                    <h2>Transforming Businesses with Cutting-Edge Solutions</h2>
                                </div>
                                <div>
                                    <p>FINETECH© is a leading technology company specializing in providing innovative software solutions and IT services</p>
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
                            <Col lg={8} md={12}>
                                <div>
                                    <img src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp" alt="" />
                                </div>
                            </Col>
                            <Col lg={8} md={12}>
                                <div>
                                    <img src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp" alt="" />
                                </div>
                            </Col>
                            <Col lg={8} md={12}>
                                <div>
                                    <img src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805077_service_3-2.webp" alt="" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="ChiprelatedDescriptionContainer">
                        <Row>
                            <Col lg={12}>
                                <div className="fadeImage">
                                    <img
                                        src="https://cdn.prod.website-files.com/673df36634025fb6cd805026/673df36634025fb6cd805094_FIN_Service_02-min.jpg"
                                        alt="Smooth Fading Image"
                                    />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div className="RightSideContentContainerAboutChip">
                                    <h2>Innovative Problem-Solving for Your Business Needs</h2>
                                    <p style={{ color: "rgb(74, 144, 226)" }}>Solutions</p>
                                    <div>
                                        <div>
                                            <h2>Efficiency</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                        </div>
                                        <div>
                                            <h2>Reliability</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                        </div>
                                        <div>
                                            <h2>Innovative</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                        </div>
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