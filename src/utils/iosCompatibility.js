// iOS Compatibility Utilities
// React import removed - not needed for current functionality

// Enhanced iOS Safari detection for newer devices
export const isIOSSafari = () => {
  const ua = window.navigator.userAgent;
  const platform = window.navigator.platform;

  // Check multiple indicators for iOS
  const iOS = !!(
    ua.match(/iPad/i) ||
    ua.match(/iPhone/i) ||
    ua.match(/iPod/i) ||
    platform.match(/iPad/i) ||
    platform.match(/iPhone/i) ||
    platform.match(/iPod/i) ||
    // New iOS devices might use different platform strings
    (navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(platform))
  );

  const webkit = !!ua.match(/WebKit/i);
  const safari = !!ua.match(/Safari/i);

  // Not Chrome or Opera on iOS
  const notChrome = !ua.match(/CriOS/i) && !ua.match(/Chrome/i);
  const notOpera = !ua.match(/OPiOS/i) && !ua.match(/Opera/i);
  const notFirefox = !ua.match(/FxiOS/i) && !ua.match(/Firefox/i);
  const notEdge = !ua.match(/EdgiOS/i) && !ua.match(/Edge/i);

  const iOSSafari =
    iOS && webkit && safari && notChrome && notOpera && notFirefox && notEdge;

  // Enhanced detection for newer iOS versions and devices
  const isLikelyIOSSafari =
    iOS && webkit && !ua.includes("Chrome") && !ua.includes("FxiOS");

  // Additional check for newer iOS versions
  const hasIOSFeatures = !!(
    window.DeviceMotionEvent !== undefined ||
    window.DeviceOrientationEvent !== undefined ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0
  );

  const result = iOSSafari || (isLikelyIOSSafari && hasIOSFeatures);

  // Enhanced logging for debugging
  if (result) {
    console.log("🍎 iOS Safari Detection:", {
      userAgent: ua,
      platform: platform,
      iOS: iOS,
      webkit: webkit,
      safari: safari,
      maxTouchPoints: navigator.maxTouchPoints,
      result: result,
    });
  }

  return result;
};

// Fix for iOS Safari 100vh issue
export const fixIOSViewportHeight = () => {
  if (isIOSSafari()) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Update on resize
    window.addEventListener("resize", () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  }
};

// Fix for iOS Safari scroll issues
export const fixIOSScroll = () => {
  if (isIOSSafari()) {
    // Add touch-action to prevent unwanted scrolling
    const style = document.createElement("style");
    style.textContent = `
      * {
        -webkit-overflow-scrolling: touch !important;
      }
      body {
        -webkit-overflow-scrolling: touch !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Fix for iOS Safari input zoom
export const fixIOSInputZoom = () => {
  if (isIOSSafari()) {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.style.fontSize = "16px";
    });
  }
};

// Fix for iOS Safari position fixed
export const fixIOSPositionFixed = () => {
  if (isIOSSafari()) {
    const fixedElements = document.querySelectorAll(
      '[style*="position: fixed"], .fixed-element'
    );
    fixedElements.forEach((element) => {
      element.style.webkitTransform = "translateZ(0)";
      element.style.transform = "translateZ(0)";
    });
  }
};

// Fix for iOS Safari touch events
export const fixIOSTouchEvents = () => {
  if (isIOSSafari()) {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (event) => {
        const now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );

    // Fix for iOS Safari momentum scrolling
    const scrollableElements = document.querySelectorAll(
      '.scrollable-content, [style*="overflow"]'
    );
    scrollableElements.forEach((element) => {
      element.style.webkitOverflowScrolling = "touch";
    });
  }
};

// Legacy iOS fixes (kept for backward compatibility)
const initLegacyIOSFixes = () => {
  if (isIOSSafari()) {
    fixIOSViewportHeight();
    fixIOSScroll();
    fixIOSInputZoom();
    fixIOSPositionFixed();
    fixIOSTouchEvents();

    // Add CSS custom property for viewport height
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --vh: 1vh;
      }
      .full-height {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
      }
    `;
    document.head.appendChild(style);
  }
};

// Aggressive memory management for iOS Safari
export const aggressiveMemoryManagement = () => {
  const shouldApplyFixes = isIOSSafari() || forceIOSCompatibilityMode();

  if (shouldApplyFixes) {
    // Use dynamic configuration if available, otherwise use defaults
    const getConfig = () => {
      return (
        window.IOS_COMPATIBILITY_CONFIG || {
          MEMORY_CHECK_INTERVAL: 10000,
          MAX_MEMORY_MB: 100,
          AGGRESSIVE_CLEANUP_MB: 150,
        }
      );
    };

    // Force garbage collection periodically
    if (window.gc) {
      setInterval(() => {
        try {
          window.gc();
        } catch (e) {
          // gc not available, that's ok
        }
      }, 30000); // Every 30 seconds
    }

    // Monitor memory usage with dynamic thresholds
    let lastMemoryCheck = 0;
    const checkMemory = () => {
      const config = getConfig();
      if (performance.memory && performance.memory.usedJSHeapSize) {
        const memoryUsage = performance.memory.usedJSHeapSize / 1048576; // MB
        if (memoryUsage > config.MAX_MEMORY_MB) {
          console.warn(
            `High memory usage detected: ${memoryUsage.toFixed(
              2
            )}MB (threshold: ${config.MAX_MEMORY_MB}MB)`
          );

          // Force cleanup
          if (memoryUsage > config.AGGRESSIVE_CLEANUP_MB) {
            console.warn(
              `Triggering aggressive cleanup at ${memoryUsage.toFixed(2)}MB`
            );
            // Clear all intervals and timeouts
            let id = setTimeout(() => {}, 0);
            while (id--) {
              clearTimeout(id);
              clearInterval(id);
            }
          }
        }
      }
    };

    // Check memory using dynamic interval
    const startMemoryMonitoring = () => {
      const config = getConfig();
      setInterval(checkMemory, config.MEMORY_CHECK_INTERVAL);
    };

    startMemoryMonitoring();

    // Safer DOM cleanup - DISABLED aggressive DOM manipulation that was causing infinite recursion
    // The original DOM cleanup was causing infinite mutation events
    // Instead, we'll just clean up event listeners when the page unloads
    window.addEventListener("beforeunload", () => {
      // Clean up any remaining event listeners
      const allElements = document.querySelectorAll("*");
      allElements.forEach((element) => {
        // Remove all event listeners by cloning (only on page unload)
        if (element.parentNode) {
          const newElement = element.cloneNode(true);
          try {
            element.parentNode.replaceChild(newElement, element);
          } catch (e) {
            // Ignore errors during cleanup
          }
        }
      });
    });
  }
};

// Prevent maximum depth exceeded errors in iOS Safari
export const preventMaxDepthError = () => {
  const shouldApplyFixes = isIOSSafari() || forceIOSCompatibilityMode();

  if (shouldApplyFixes) {
    // Override console methods to prevent recursive logging
    const originalConsole = { ...console };

    // Use dynamic configuration if available, otherwise use defaults
    const getConfig = () => {
      return (
        window.IOS_COMPATIBILITY_CONFIG || {
          MAX_RECURSION_DEPTH: 25,
          MAX_RENDERS: 50,
          MAX_CONSECUTIVE_RENDERS: 10,
          MAX_ITERATIONS: 1000,
        }
      );
    };

    // More aggressive limits for iOS Safari
    let recursionDepth = 0;

    // Wrap potentially problematic functions
    const wrapFunction = (fn, name) => {
      return function (...args) {
        const config = getConfig();
        if (recursionDepth >= config.MAX_RECURSION_DEPTH) {
          console.warn(
            `Maximum recursion depth (${config.MAX_RECURSION_DEPTH}) reached for ${name}, preventing stack overflow`
          );
          return;
        }

        recursionDepth++;
        try {
          return fn.apply(this, args);
        } finally {
          recursionDepth--;
        }
      };
    };

    // Override setTimeout and setInterval to prevent runaway timers
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    const originalClearTimeout = window.clearTimeout;
    const originalClearInterval = window.clearInterval;

    const activeTimeouts = new Set();
    const activeIntervals = new Set();

    window.setTimeout = function (callback, delay, ...args) {
      // Don't wrap if callback is already wrapped (prevent double wrapping)
      const isAlreadyWrapped = callback && callback._isIOSWrapped;

      let finalCallback = callback;
      if (!isAlreadyWrapped && typeof callback === "function") {
        finalCallback = wrapFunction(callback, "setTimeout callback");
        finalCallback._isIOSWrapped = true;
      }

      const timeoutId = originalSetTimeout.call(
        this,
        (...callbackArgs) => {
          activeTimeouts.delete(timeoutId);
          if (finalCallback && typeof finalCallback === "function") {
            finalCallback(...callbackArgs);
          }
        },
        delay,
        ...args
      );
      activeTimeouts.add(timeoutId);
      return timeoutId;
    };

    window.setInterval = function (callback, delay, ...args) {
      // Don't wrap if callback is already wrapped (prevent double wrapping)
      const isAlreadyWrapped = callback && callback._isIOSWrapped;

      let finalCallback = callback;
      if (!isAlreadyWrapped && typeof callback === "function") {
        finalCallback = wrapFunction(callback, "setInterval callback");
        finalCallback._isIOSWrapped = true;
      }

      const intervalId = originalSetInterval.call(
        this,
        finalCallback,
        delay,
        ...args
      );
      activeIntervals.add(intervalId);
      return intervalId;
    };

    window.clearTimeout = function (timeoutId) {
      activeTimeouts.delete(timeoutId);
      return originalClearTimeout.call(this, timeoutId);
    };

    window.clearInterval = function (intervalId) {
      activeIntervals.delete(intervalId);
      return originalClearInterval.call(this, intervalId);
    };

    // Clean up all timers on page unload
    window.addEventListener("beforeunload", () => {
      activeTimeouts.forEach((id) => originalClearTimeout(id));
      activeIntervals.forEach((id) => originalClearInterval(id));
      activeTimeouts.clear();
      activeIntervals.clear();
    });

    // More aggressive React render loop prevention using dynamic config
    let renderCount = 0;
    let consecutiveRenders = 0;
    let lastRenderTime = Date.now();
    const RENDER_TIME_WINDOW = 1000; // 1 second

    // Monitor React state updates with more aggressive throttling
    // DISABLED: React setState overriding was causing more issues than it solved
    // The setState override can interfere with React's internal operations and cause recursion

    // Instead, we'll rely on the IOSSafeWrapper component to catch and handle depth errors
    console.log(
      "🍎 React setState monitoring disabled to prevent recursion issues"
    );

    // Original setState monitoring code is commented out to prevent interference:
    /*
    const originalSetState = React.Component.prototype.setState;
    if (originalSetState && false) { // Disabled
      React.Component.prototype.setState = function (partialState, callback) {
        // ... setState monitoring code ...
      };
    }
    */

    // More aggressive render count reset
    setInterval(() => {
      renderCount = Math.max(0, renderCount - 3);
      consecutiveRenders = Math.max(0, consecutiveRenders - 1);
    }, 500);
  }
};

// React-dependent functions removed to prevent React internals errors
// Using EmergencyErrorBoundary component instead

// Force iOS compatibility mode for all mobile devices
export const forceIOSCompatibilityMode = () => {
  const ua = window.navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Force iOS compatibility for all mobile devices as fallback
  if (isMobile || hasTouch) {
    console.log(
      "📱 Mobile device detected - applying iOS-style fixes as fallback"
    );
    return true;
  }
  return false;
};

// Initialize all iOS fixes including depth error prevention
export const initIOSCompatibility = () => {
  const shouldApplyFixes = isIOSSafari() || forceIOSCompatibilityMode();

  if (shouldApplyFixes) {
    const ua = window.navigator.userAgent;
    const deviceInfo = {
      userAgent: ua,
      platform: window.navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
    };

    console.log("🍎 iOS Safari detected - initializing compatibility fixes");
    console.log("📱 Device Info:", deviceInfo);

    // Detect newer iPhone models (iPhone 12+, including iPhone 16)
    const isNewerIPhone =
      ua.includes("iPhone") &&
      (window.screen.width >= 390 || // iPhone 12 Pro and newer
        window.screen.height >= 844 || // iPhone 12 and newer
        window.devicePixelRatio >= 3);

    if (isNewerIPhone) {
      console.log("📱 Newer iPhone detected - applying enhanced fixes");

      // More aggressive limits for newer devices
      window.IOS_COMPATIBILITY_CONFIG = {
        MAX_RECURSION_DEPTH: 15, // Even more aggressive for iPhone 16
        MAX_RENDERS: 25,
        MAX_CONSECUTIVE_RENDERS: 5,
        MAX_ITERATIONS: 500,
        MEMORY_CHECK_INTERVAL: 5000, // Check memory every 5 seconds
        MAX_MEMORY_MB: 80, // Lower memory threshold for newer devices
        AGGRESSIVE_CLEANUP_MB: 120,
      };
    } else {
      window.IOS_COMPATIBILITY_CONFIG = {
        MAX_RECURSION_DEPTH: 25,
        MAX_RENDERS: 50,
        MAX_CONSECUTIVE_RENDERS: 10,
        MAX_ITERATIONS: 1000,
        MEMORY_CHECK_INTERVAL: 10000,
        MAX_MEMORY_MB: 100,
        AGGRESSIVE_CLEANUP_MB: 150,
      };
    }

    console.log(
      "⚙️ iOS Compatibility Config:",
      window.IOS_COMPATIBILITY_CONFIG
    );

    // Apply all iOS fixes
    initLegacyIOSFixes();
    preventMaxDepthError();
    aggressiveMemoryManagement();

    // Enhanced error handling for newer iOS versions
    window.addEventListener("error", (event) => {
      const errorTypes = ["depth", "stack", "recursion", "range", "memory"];
      const hasDepthError = errorTypes.some(
        (type) => event.message && event.message.toLowerCase().includes(type)
      );

      if (hasDepthError) {
        console.error("🚨 iOS Safari depth/memory error detected:", {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          deviceInfo: deviceInfo,
        });

        // Immediate aggressive cleanup
        setTimeout(() => {
          console.log("🔄 Attempting immediate recovery from depth error...");

          // Clear all timers more aggressively
          for (let i = 0; i < 10000; i++) {
            clearTimeout(i);
            clearInterval(i);
          }

          // Cancel all animation frames
          let rafId = requestAnimationFrame(() => {});
          while (rafId--) {
            cancelAnimationFrame(rafId);
          }

          // Force garbage collection if available
          if (window.gc) {
            try {
              window.gc();
              console.log("♻️ Forced garbage collection");
            } catch (e) {
              // Ignore
            }
          }

          // Clear caches if available
          if ("caches" in window) {
            caches
              .keys()
              .then((names) => {
                names.forEach((name) => {
                  caches.delete(name);
                });
              })
              .catch(() => {});
          }

          // Last resort - reload page
          setTimeout(() => {
            console.log("💥 Reloading page to recover from error");
            window.location.reload();
          }, 1000);
        }, 500); // Faster response
      }
    });

    // Enhanced promise rejection handling
    window.addEventListener("unhandledrejection", (event) => {
      if (event.reason && event.reason.message) {
        const errorTypes = ["depth", "stack", "recursion", "range", "memory"];
        const hasDepthError = errorTypes.some((type) =>
          event.reason.message.toLowerCase().includes(type)
        );

        if (hasDepthError) {
          console.error(
            "🚨 iOS Safari promise rejection with depth error:",
            event.reason
          );
          event.preventDefault(); // Prevent default error handling
        }
      }
    });

    // Page visibility handling for better cleanup
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        console.log("📴 Page hidden - performing cleanup");

        // Cleanup when page is hidden
        if (window.gc) {
          try {
            window.gc();
          } catch (e) {
            // Ignore
          }
        }
      }
    });

    console.log("✅ iOS Safari compatibility fixes initialized");
  } else {
    console.log("🖥️ Desktop browser detected - iOS fixes not applied");
  }
};

// Export default function for easy import
export default initIOSCompatibility;
