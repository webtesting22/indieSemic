import React from "react";
import "../../Styles/Achivement.css";
import { Row, Col } from "antd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiEventsSharpIcon from '@mui/icons-material/EmojiEventsSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';

const Achivement = () => {
    const AchivementvaluesData = [
        {
            icon: <SupervisorAccountIcon style={{ fontSize: "30px", color: "white" }} />,
            values: "1.50+",
            text: "Customers",
        },
        {
            icon: <EmojiEventsSharpIcon style={{ fontSize: "30px", color: "white" }} />,
            values: "2.5+",
            text: "Awards",
        },
        {
            icon: <StoreSharpIcon style={{ fontSize: "30px", color: "white" }} />,
            values: "3.15+",
            text: "Market Ready Modules",
        },
    ];

    return (
        <section id="AchivementContainer" className="section_Padding">

            <div className="AchivementValuesContainer">
                <div className="OverlayContainer">

                </div>
                <Row >
                    {AchivementvaluesData.map((item, index) => (
                        <Col lg={8} md={12} sm={24} key={index} style={{width:"100%"}}>
                            <div className="CountersContainer">
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {item.icon} &nbsp;
                                    <h1 style={{ color: "white" }}>{item.values}</h1>
                                </div>
                                <p style={{ color: "white" }}>{item.text}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};

export default Achivement;
