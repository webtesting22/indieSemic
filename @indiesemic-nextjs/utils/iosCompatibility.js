// iOS Compatibility Utilities

// Detect iOS Safari
export const isIOSSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/OPiOS/i);
  return iOSSafari;
};

// Fix for iOS Safari 100vh issue
export const fixIOSViewportHeight = () => {
  if (isIOSSafari()) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
};

// Fix for iOS Safari scroll issues
export const fixIOSScroll = () => {
  if (isIOSSafari()) {
    // Add touch-action to prevent unwanted scrolling
    const style = document.createElement('style');
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
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.style.fontSize = '16px';
    });
  }
};

// Fix for iOS Safari position fixed
export const fixIOSPositionFixed = () => {
  if (isIOSSafari()) {
    const fixedElements = document.querySelectorAll('[style*="position: fixed"], .fixed-element');
    fixedElements.forEach(element => {
      element.style.webkitTransform = 'translateZ(0)';
      element.style.transform = 'translateZ(0)';
    });
  }
};

// Fix for iOS Safari touch events
export const fixIOSTouchEvents = () => {
  if (isIOSSafari()) {
    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    // Fix for iOS Safari momentum scrolling
    const scrollableElements = document.querySelectorAll('.scrollable-content, [style*="overflow"]');
    scrollableElements.forEach(element => {
      element.style.webkitOverflowScrolling = 'touch';
    });
  }
};

// Initialize all iOS fixes
export const initIOSCompatibility = () => {
  if (isIOSSafari()) {
    fixIOSViewportHeight();
    fixIOSScroll();
    fixIOSInputZoom();
    fixIOSPositionFixed();
    fixIOSTouchEvents();
    
    // Add CSS custom property for viewport height
    const style = document.createElement('style');
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

// Export default function for easy import
export default initIOSCompatibility; 