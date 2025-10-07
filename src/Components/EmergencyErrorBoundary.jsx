import React, { Component } from "react";

// Ultra-simple error boundary for iOS Safari depth errors
// No complex logic, no state updates that could cause recursion
class EmergencyErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorCount = 0;
  }

  static getDerivedStateFromError(error) {
    // Only catch stack overflow errors
    const isStackError =
      error.message &&
      (error.message.includes("Maximum call stack") ||
        error.message.includes("stack size exceeded") ||
        error.message.includes("RangeError") ||
        error.message.includes("too much recursion"));

    if (isStackError) {
      console.error(
        "🚨 Emergency Error Boundary caught stack overflow:",
        error.message
      );
      return { hasError: true };
    }

    return null; // Let other errors bubble up
  }

  componentDidCatch(error, errorInfo) {
    this.errorCount++;

    console.error("🚨 Stack overflow detected:", {
      error: error.message,
      count: this.errorCount,
      component: errorInfo.componentStack,
    });

    // If too many errors, reload the page
    if (this.errorCount > 2) {
      console.error("💥 Too many stack overflows, reloading...");
      // Use setTimeout to avoid any potential recursion in reload
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fee",
            border: "2px solid #f00",
            borderRadius: "8px",
            margin: "20px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2 style={{ color: "#d00", margin: "0 0 10px 0" }}>
            🚨 Stack Overflow Detected
          </h2>
          <p style={{ margin: "0 0 15px 0", fontSize: "14px" }}>
            The app encountered a stack overflow error. This is common on iOS
            Safari.
          </p>
          <button
            onClick={() => {
              // Simple recovery - just reload
              window.location.reload();
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007AFF",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default EmergencyErrorBoundary;

