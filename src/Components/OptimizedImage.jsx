import React, { useState, useRef, useEffect } from "react";

// Optimized image component for iOS Safari
const OptimizedImage = ({
  src,
  alt,
  className = "",
  style = {},
  placeholder = "/Images/loading-placeholder.svg",
  lowQualitySrc = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Progressive loading: placeholder -> low quality -> high quality
  useEffect(() => {
    if (!isInView) return;

    const loadImage = (imageSrc) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imageSrc);
        img.onerror = reject;
        img.src = imageSrc;
      });
    };

    const loadSequentially = async () => {
      try {
        // If we have a low quality version, load it first
        if (lowQualitySrc && !isLoaded) {
          const lowQualityLoaded = await loadImage(lowQualitySrc);
          setCurrentSrc(lowQualityLoaded);
        }

        // Then load the full quality image
        const fullQualityLoaded = await loadImage(src);
        setCurrentSrc(fullQualityLoaded);
        setIsLoaded(true);
      } catch (error) {
        console.warn("Failed to load image:", src);
        setHasError(true);
        // Keep the last successfully loaded image
      }
    };

    loadSequentially();
  }, [isInView, src, lowQualitySrc, isLoaded]);

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
        rootMargin: "50px", // Start loading 50px before the image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={`optimized-image ${className} ${
        isLoaded ? "loaded" : "loading"
      }`}
      style={{
        transition: "opacity 0.3s ease-in-out",
        opacity: hasError ? 0.5 : 1,
        ...style,
      }}
      loading="lazy" // Native lazy loading as fallback
      decoding="async" // Don't block rendering
      {...props}
    />
  );
};

export default OptimizedImage;

