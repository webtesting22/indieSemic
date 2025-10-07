import React, { useState, useRef, useEffect } from "react";

// Safe background image component for iOS Safari
// Replaces problematic CSS background-attachment: fixed
const SafeBackgroundImage = ({
  src,
  className = "",
  style = {},
  children,
  overlay = false,
  overlayOpacity = 0.5,
  fallbackColor = "#f0f0f0",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading earlier for background images
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload the image
  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
    img.src = src;
  }, [isInView, src]);

  const containerStyle = {
    position: "relative",
    overflow: "hidden",
    backgroundColor: fallbackColor,
    ...style,
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: isLoaded && !hasError ? 1 : 0,
    transition: "opacity 0.5s ease-in-out",
    zIndex: 1,
  };

  const overlayStyle = overlay
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
        zIndex: 2,
      }
    : {};

  const contentStyle = {
    position: "relative",
    zIndex: 3,
    width: "100%",
    height: "100%",
  };

  return (
    <div
      ref={containerRef}
      className={`safe-background-image ${className}`}
      style={containerStyle}
      {...props}
    >
      {/* Background Image */}
      {isInView && src && (
        <img
          src={src}
          alt=""
          style={imageStyle}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Overlay */}
      {overlay && <div style={overlayStyle} />}

      {/* Content */}
      <div style={contentStyle}>{children}</div>
    </div>
  );
};

export default SafeBackgroundImage;

