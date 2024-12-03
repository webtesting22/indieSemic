import { useRef, useEffect, useState } from "react";
import "./NumbersComponent.css";
import { Row, Col } from "antd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import StoreSharpIcon from "@mui/icons-material/StoreSharp";

const NumbersComponent = () => {
    const [isInView, setIsInView] = useState(false); // Track visibility of the section
    const [counters, setCounters] = useState({
        customers: 0,
        awards: 0,
        marketReady: 0,
    });
    const sectionRef = useRef(null); // Ref for detecting visibility

    const AchivementvaluesData = [
        {
            icon: <SupervisorAccountIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "50+",
            text: "Customers",
            key: "customers",
            target: 50,
        },
        {
            icon: <EmojiEventsSharpIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "5+",
            text: "Awards",
            key: "awards",
            target: 5,
        },
        {
            icon: <StoreSharpIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "15+",
            text: "Market Ready Modules",
            key: "marketReady",
            target: 15,
        },
    ];

    // Check if section is in view
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                setIsInView(inView);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setCounters((prevCounters) => {
                    const newCounters = { ...prevCounters };
                    AchivementvaluesData.forEach((item) => {
                        if (newCounters[item.key] < item.target) {
                            newCounters[item.key] = Math.min(
                                newCounters[item.key] + 1,
                                item.target
                            );
                        }
                    });
                    return newCounters;
                });
            }, 50); // Adjust for smoother animation

            return () => clearInterval(interval);
        }
    }, [isInView]);

    return (
        <div ref={sectionRef} className="AchivementValuesContainer">
            <div className="OverlayContainer"></div>
            <Row>
                {AchivementvaluesData.map((item, index) => (
                    <Col lg={8} md={12} sm={24} key={index} style={{ width: "100%" }}>
                        <div className="CountersContainer">
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {item.icon}&nbsp;
                                <h1 style={{ color: "white" }}>
                                    {counters[item.key].toFixed(0)}+
                                </h1>
                            </div>
                            <p style={{ color: "white" }}>{item.text}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default NumbersComponent;
