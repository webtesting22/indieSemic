import { useEffect, useRef, useCallback, useState } from "react";
import { isIOSSafari } from "../utils/iosCompatibility.js";

// Custom hook for iOS Safari compatible intervals
export const useIOSSafeInterval = (callback, delay, dependencies = []) => {
  const intervalRef = useRef();
  const callbackRef = useRef(callback);
  const isActiveRef = useRef(true);
  const iterationCountRef = useRef(0);
  const MAX_ITERATIONS = 1000;

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clearIOSInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const startIOSInterval = useCallback(() => {
    if (!isActiveRef.current) return;

    clearIOSInterval();
    isActiveRef.current = true;
    iterationCountRef.current = 0;

    if (delay !== null && delay !== undefined) {
      intervalRef.current = setInterval(() => {
        if (!isActiveRef.current) return;

        // iOS Safari protection
        if (isIOSSafari()) {
          iterationCountRef.current++;
          if (iterationCountRef.current > MAX_ITERATIONS) {
            console.warn(
              "useIOSSafeInterval: Maximum iterations reached, clearing interval"
            );
            clearIOSInterval();
            return;
          }
        }

        callbackRef.current();
      }, delay);
    }
  }, [delay, clearIOSInterval]);

  useEffect(() => {
    startIOSInterval();
    return clearIOSInterval;
  }, [startIOSInterval, ...dependencies]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      clearIOSInterval();
    };
  }, [clearIOSInterval]);

  return { clearInterval: clearIOSInterval, restartInterval: startIOSInterval };
};

// Custom hook for iOS Safari compatible timeouts
export const useIOSSafeTimeout = (callback, delay, dependencies = []) => {
  const timeoutRef = useRef();
  const callbackRef = useRef(callback);
  const isActiveRef = useRef(true);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clearIOSTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const startIOSTimeout = useCallback(() => {
    if (!isActiveRef.current) return;

    clearIOSTimeout();
    isActiveRef.current = true;

    if (delay !== null && delay !== undefined) {
      timeoutRef.current = setTimeout(() => {
        if (!isActiveRef.current) return;
        callbackRef.current();
      }, delay);
    }
  }, [delay, clearIOSTimeout]);

  useEffect(() => {
    startIOSTimeout();
    return clearIOSTimeout;
  }, [startIOSTimeout, ...dependencies]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      clearIOSTimeout();
    };
  }, [clearIOSTimeout]);

  return { clearTimeout: clearIOSTimeout, restartTimeout: startIOSTimeout };
};

// Custom hook for iOS Safari compatible animation frames
export const useIOSSafeAnimationFrame = (callback, shouldAnimate = true) => {
  const animationRef = useRef();
  const callbackRef = useRef(callback);
  const isActiveRef = useRef(true);
  const frameCountRef = useRef(0);
  const MAX_FRAMES = 10000;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancelIOSAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    isActiveRef.current = false;
  }, []);

  const startIOSAnimation = useCallback(() => {
    if (!isActiveRef.current || !shouldAnimate) return;

    const animate = () => {
      if (!isActiveRef.current || !shouldAnimate) return;

      // iOS Safari protection
      if (isIOSSafari()) {
        frameCountRef.current++;
        if (frameCountRef.current > MAX_FRAMES) {
          console.warn(
            "useIOSSafeAnimationFrame: Maximum frames reached, stopping animation"
          );
          cancelIOSAnimation();
          return;
        }
      }

      const shouldContinue = callbackRef.current();

      if (shouldContinue !== false && isActiveRef.current && shouldAnimate) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    frameCountRef.current = 0;
    animationRef.current = requestAnimationFrame(animate);
  }, [shouldAnimate, cancelIOSAnimation]);

  useEffect(() => {
    if (shouldAnimate) {
      startIOSAnimation();
    } else {
      cancelIOSAnimation();
    }

    return cancelIOSAnimation;
  }, [shouldAnimate, startIOSAnimation, cancelIOSAnimation]);

  useEffect(() => {
    return () => {
      isActiveRef.current = false;
      cancelIOSAnimation();
    };
  }, [cancelIOSAnimation]);

  return {
    cancelAnimation: cancelIOSAnimation,
    restartAnimation: startIOSAnimation,
  };
};

// Custom hook for preventing infinite re-renders
export const useIOSSafeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const updateCountRef = useRef(0);
  const lastUpdateTimeRef = useRef(Date.now());
  const MAX_UPDATES_PER_SECOND = 60;

  const safeSetState = useCallback((newState) => {
    const now = Date.now();
    const timeDiff = now - lastUpdateTimeRef.current;

    // Reset counter every second
    if (timeDiff > 1000) {
      updateCountRef.current = 0;
      lastUpdateTimeRef.current = now;
    }

    updateCountRef.current++;

    // iOS Safari protection
    if (isIOSSafari() && updateCountRef.current > MAX_UPDATES_PER_SECOND) {
      console.warn(
        "useIOSSafeState: Too many state updates per second, throttling"
      );
      setTimeout(() => {
        setState(newState);
      }, 100);
      return;
    }

    setState(newState);
  }, []);

  return [state, safeSetState];
};

export default {
  useIOSSafeInterval,
  useIOSSafeTimeout,
  useIOSSafeAnimationFrame,
  useIOSSafeState,
};
