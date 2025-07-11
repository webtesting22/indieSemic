import { useRef, useEffect, useState } from "react";
import "../../Styles/NumbersComponent.css";
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
    const wasInViewRef = useRef(false); // Ref to track previous state

    const AchivementvaluesData = [
        {
            icon: <SupervisorAccountIcon style={{ fontSize: "3rem", color: "white" }} />,
            values: "50+",
            text: "Customers",
            key: "customers",
            target: 60,
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
    
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
                const offset = isMobile ? 400 : 150; // Mobile offset vs. Desktop offset
                const wasInView = wasInViewRef.current;
                const currentlyInView = rect.top + offset >= 0 &&
                    rect.bottom - offset <= window.innerHeight;

                // If section goes out of view, reset counters
                if (wasInView && !currentlyInView) {
                    setCounters({
                        customers: 0,
                        awards: 0,
                        marketReady: 0,
                    });
                }

                // Update ref and state
                wasInViewRef.current = currentlyInView;
                setIsInView(currentlyInView);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Remove isInView dependency to prevent infinite loop
    
    const maxTarget = Math.max(...AchivementvaluesData.map(item => item.target));

    // Counter increment effect
    useEffect(() => {
        if (isInView) {
            const interval = setInterval(() => {
                setCounters((prevCounters) => {
                    const newCounters = { ...prevCounters };
                    let allReachedTarget = true;

                    AchivementvaluesData.forEach((item) => {
                        const incrementRate = item.target / maxTarget;
                        if (newCounters[item.key] < item.target) {
                            newCounters[item.key] = Math.min(
                                newCounters[item.key] + incrementRate,
                                item.target
                            );
                            allReachedTarget = false;
                        }
                    });

                    // Clear interval when all counters reach their target
                    if (allReachedTarget) {
                        clearInterval(interval);
                    }

                    return newCounters;
                });
            }, 30);

            return () => clearInterval(interval);
        }
    }, [isInView, maxTarget]);

    return (
        <div className="NumberComponentsContainer section_Padding" >
        <div ref={sectionRef} className="AchivementValuesContainer">
            <div className="OverlayContainer"></div>
            <Row style={{ width: "100%" }}>
                {AchivementvaluesData.map((item, index) => (
                    <Col lg={8} md={12} sm={24} key={index} style={{ width: "100%" }}>
                        <div className="CountersContainer">
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {item.icon}&nbsp;
                                <h1 style={{ color: "white" }}>
                                    {Math.floor(counters[item.key]).toFixed(0)}+
                                </h1>
                            </div>
                            <p style={{ color: "white" }}>{item.text}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
        </div>
    );
};

export default NumbersComponent;
