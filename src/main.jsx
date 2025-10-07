import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import EmergencyErrorBoundary from "./components/EmergencyErrorBoundary.jsx";
import { isIOSSafari } from "./utils/iosCompatibility.js";

// Simple iOS detection
const iOS =
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

console.log("📱 Device detection:", {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  maxTouchPoints: navigator.maxTouchPoints,
  iOS: iOS,
});

// Minimal iOS compatibility - only the essential fixes
if (iOS) {
  console.log("🍎 iOS detected - applying minimal compatibility fixes");

  // Only apply viewport height fix - nothing else that could cause recursion
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
}

const AppWrapper = () => {
  // Always use emergency error boundary for stack overflow protection
  const content = (
    <EmergencyErrorBoundary>
      <App />
    </EmergencyErrorBoundary>
  );

  // Disable StrictMode for iOS to prevent double rendering
  if (iOS) {
    console.log("🍎 iOS Safari: Rendering without StrictMode");
    return content;
  } else {
    return <StrictMode>{content}</StrictMode>;
  }
};

createRoot(document.getElementById("root")).render(<AppWrapper />);
