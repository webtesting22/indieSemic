import React from "react";
import { Row, Col } from "antd";
import "./Services.css"
const Services = () => {


    const CardsData = [
        {
            icon: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/wt6HSLTbpXfHYLoXw3hk/WhatsApp Image 2025-05-16 at 10.25.03.jpeg",
            title: "Custom RF & Embedded Design Services",
            content: "Need something beyond our standard modules? We offer full-spectrum design services—from schematic to layout—for RF and embedded solutions. Whether it’s custom form factors, additional interfaces, or performance tuning, we’ve got you covered.",
            pointsTitle: "What We Offer",
            offerPoints: [
                "Tailored board designs based on our RF modules",
                "Integration with sensors, MCUs, or wireless protocols",
                "Prototyping and testing included"
            ]
        },
        {
            icon: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/inventoryManagement/BrD78HtcKhLJBHsbti2I/circuit-vector-icon-can-be-used-electrician-tools-iconset_717774-82672 (1).jpg",
            title: "Technical Support for Our Modules",
            content: "Already using our RF modules? We offer reliable technical support to help you bring your idea to life smoothly. From integration advice to debugging help—we’re with you all the way.",
            pointsTitle: "Support Includes",
            offerPoints: [
                "Datasheets, reference designs & sample code",
                "Email/portal support for debugging",
                "Help with antenna tuning, RF performance, firmware"
            ]
        }
    ]
    return (
        <>
            <div className="section_Padding">
                <div className="DesignedContainer">
                    <h1>Tailored Design. Trusted Support.</h1>
                    <p>At IndieSemic, we don’t just build cutting-edge tech—we help you build with it. Whether you're integrating our RF modules into your own products or need hands-on guidance, we’re here to help.</p>
                </div>
                <div className="AnimatedStackEffect">
                    {CardsData.map((item, index) => (
                        <div key={index} className="StickyContainerStack">
                            <Row>
                                <Col lg={8} md={12} style={{ width: "100%" }}>
                                    <div>
                                        <div className="CardIcon">
                                            <img src={item.icon} alt="" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={16} md={12} style={{ width: "100%" }}>
                                    <div>
                                        <div>
                                            <h2>{item.title}</h2>
                                            <p>{item.content}</p>
                                            <h4>{item.pointsTitle}</h4>
                                            <ul>
                                                {item.offerPoints.map((point, idx) => (
                                                    <li key={idx} style={{fontSize:"16px",marginBottom:"10px"}}>{point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default Services