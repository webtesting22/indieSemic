import React from "react";
import "../../Styles/AboutContent.css"
import AboutContentVideo from "../../../public/Images/AboutContentVideo.mp4"
import { Row, Col } from "antd";
import MemoryIcon from '@mui/icons-material/Memory';
const AboutCompany = () => {
    return (
        <>
            <section id="AboutCompanyContainer" className="section_Padding">
                <div className="FixedImage" />
                <div style={{ position: "sticky" }}>
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

                </div>
            </section>
        </>
    )
}
export default AboutCompany