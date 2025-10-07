import React, { Component, Suspense } from "react";
import { isIOSSafari } from "../utils/iosCompatibility.js";

// iOS Safari-safe component wrapper
class IOSSafeWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorBoundaryCount: 0,
    };

    this.renderCount = 0;
    this.lastRender = Date.now();
  }

  static getDerivedStateFromError(error) {
    // Check for depth-related errors
    const isDepthError =
      error.message &&
      (error.message.includes("Maximum call stack") ||
        error.message.includes("Maximum depth exceeded") ||
        error.message.includes("too much recursion") ||
        error.message.includes("RangeError") ||
        error.stack?.includes("RangeError"));

    if (isDepthError && isIOSSafari()) {
      return {
        hasError: true,
        error,
        // Fix: Don't use function syntax here - this was causing infinite recursion!
      };
    }

    // Let other errors bubble up
    return null;
  }

  componentDidCatch(error, errorInfo) {
    if (this.state.hasError && isIOSSafari()) {
      console.error("🍎 IOSSafeWrapper caught depth error:", {
        error: error.message,
        componentStack: errorInfo.componentStack,
        renderCount: this.renderCount,
        timeSinceLastRender: Date.now() - this.lastRender,
      });

      // Increment error count and attempt recovery after a delay
      const newErrorCount = (this.state.errorBoundaryCount || 0) + 1;

      setTimeout(() => {
        if (newErrorCount < 3) {
          console.log("🔄 IOSSafeWrapper attempting recovery...");
          this.setState({
            hasError: false,
            error: null,
            errorBoundaryCount: newErrorCount,
          });
        } else {
          console.error("💥 Too many errors, reloading page...");
          window.location.reload();
        }
      }, 1000);
    }
  }

  render() {
    const now = Date.now();

    // Track render frequency for iOS Safari
    if (isIOSSafari()) {
      this.renderCount++;

      // Reset render count every 5 seconds
      if (now - this.lastRender > 5000) {
        this.renderCount = 0;
        this.lastRender = now;
      }

      // Prevent rapid re-renders
      if (this.renderCount > 50) {
        console.warn("🍎 IOSSafeWrapper: Too many renders, throttling...");
        return (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#fff3cd",
              border: "1px solid #ffeaa7",
              borderRadius: "8px",
              margin: "10px",
            }}
          >
            <p>⚠️ Component is rendering too frequently. Please wait...</p>
            <button
              onClick={() => {
                this.renderCount = 0;
                this.forceUpdate();
              }}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </div>
        );
      }
    }

    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            margin: "10px",
          }}
        >
          <h3>🍎 iOS Safari Error Detected</h3>
          <p>This component encountered a depth-related error.</p>
          <details style={{ marginTop: "10px", textAlign: "left" }}>
            <summary>Error Details</summary>
            <pre
              style={{
                background: "#f8f9fa",
                padding: "10px",
                borderRadius: "4px",
                fontSize: "12px",
                overflow: "auto",
              }}
            >
              {this.state.error?.message}
            </pre>
          </details>
          <div style={{ marginTop: "15px" }}>
            <button
              onClick={() => {
                this.setState({
                  hasError: false,
                  error: null,
                  errorBoundaryCount: 0,
                });
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    // Wrap children in Suspense for iOS Safari
    if (isIOSSafari()) {
      return (
        <Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#e2e3e5",
                borderRadius: "8px",
              }}
            >
              <p>🍎 Loading iOS Safari optimized content...</p>
            </div>
          }
        >
          {this.props.children}
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default IOSSafeWrapper;
