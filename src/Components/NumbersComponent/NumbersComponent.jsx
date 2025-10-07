import { useRef, useEffect, useState } from "react";
import "../../Styles/NumbersComponent.css";
import { Row, Col } from "antd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import StoreSharpIcon from "@mui/icons-material/StoreSharp";
import EmergencyErrorBoundary from "../../components/EmergencyErrorBoundary.jsx";

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
      icon: (
        <SupervisorAccountIcon style={{ fontSize: "3rem", color: "white" }} />
      ),
      values: "50+",
      text: "Customers",
      key: "customers",
      target: 60,
    },
    {
      icon: (
        <EmojiEventsSharpIcon style={{ fontSize: "3rem", color: "white" }} />
      ),
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
        const currentlyInView =
          rect.top + offset >= 0 && rect.bottom - offset <= window.innerHeight;

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

  const maxTarget = Math.max(
    ...AchivementvaluesData.map((item) => item.target)
  );

  // Counter increment effect - COMPLETELY REWRITTEN to be recursion-safe
  useEffect(() => {
    if (!isInView) return;

    console.log("🔢 Starting NumbersComponent animation");

    // Use a simple setInterval approach - much safer for iOS Safari
    const interval = setInterval(() => {
      setCounters((prevCounters) => {
        const newCounters = { ...prevCounters };
        let hasChanges = false;

        AchivementvaluesData.forEach((item) => {
          if (newCounters[item.key] < item.target) {
            const increment = Math.ceil(item.target / 20); // Simple increment
            newCounters[item.key] = Math.min(
              newCounters[item.key] + increment,
              item.target
            );
            hasChanges = true;
          }
        });

        // If no changes, we're done
        if (!hasChanges) {
          console.log("🔢 NumbersComponent animation completed");
        }

        return newCounters;
      });
    }, 150); // Update every 150ms - safe and smooth

    // Auto-cleanup after reasonable time to prevent infinite animation
    const cleanupTimeout = setTimeout(() => {
      clearInterval(interval);
      console.log("🔢 NumbersComponent animation auto-stopped");

      // Set final values to ensure completion
      setCounters(() => {
        const finalCounters = {};
        AchivementvaluesData.forEach((item) => {
          finalCounters[item.key] = item.target;
        });
        return finalCounters;
      });
    }, 5000); // Stop after 5 seconds max

    return () => {
      clearInterval(interval);
      clearTimeout(cleanupTimeout);
      console.log("🔢 NumbersComponent animation cleanup");
    };
  }, [isInView]); // Only depend on isInView - no other dependencies!

  return (
    <EmergencyErrorBoundary>
      <div className="NumberComponentsContainer section_Padding">
        <div ref={sectionRef} className="AchivementValuesContainer">
          <div className="OverlayContainer"></div>
          <Row style={{ width: "100%" }}>
            {AchivementvaluesData.map((item, index) => (
              <Col lg={8} md={12} sm={24} key={index} style={{ width: "100%" }}>
                <div className="CountersContainer">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}&nbsp;
                    <h1 style={{ color: "white" }}>
                      {Math.floor(counters[item.key] || 0).toFixed(0)}+
                    </h1>
                  </div>
                  <p style={{ color: "white" }}>{item.text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </EmergencyErrorBoundary>
  );
};

export default NumbersComponent;
