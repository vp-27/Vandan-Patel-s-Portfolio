import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Tuning knobs for last name sizing
const BASE_LAST_NAME_FONT_PX = 64;     // Starting size for last name
const MAX_LAST_NAME_FONT_PX = 120;     // Allow it to scale bigger to match first name
const MIN_LAST_NAME_FONT_PX = 24;      // Safety floor
const WIDTH_TARGET_RATIO = 1.0;        // Target last name width vs first name (1.0 = match)

const PhoneCallInterface = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [lastNameFontSize, setLastNameFontSize] = useState('6rem');

  useEffect(() => {
    const adjustLastNameSize = () => {
      if (firstNameRef.current && lastNameRef.current) {
        const firstNameWidth = firstNameRef.current.offsetWidth;
        const lastNameElement = lastNameRef.current;
        
        // Start with a base font size (configurable above)
        let fontSize = BASE_LAST_NAME_FONT_PX;
        lastNameElement.style.fontSize = fontSize + 'px';

        // Adjust font size to match target width of first name
        // Guard against infinite loops with a max iteration count
        let iterations = 0;
        const MAX_ITERS = 200;
        while (
          lastNameElement.offsetWidth > firstNameWidth * WIDTH_TARGET_RATIO &&
          fontSize > MIN_LAST_NAME_FONT_PX &&
          iterations++ < MAX_ITERS
        ) {
          fontSize -= 2;
          lastNameElement.style.fontSize = fontSize + 'px';
        }
        while (
          lastNameElement.offsetWidth < firstNameWidth * WIDTH_TARGET_RATIO &&
          fontSize < MAX_LAST_NAME_FONT_PX &&
          iterations++ < MAX_ITERS
        ) {
          fontSize += 1;
          lastNameElement.style.fontSize = fontSize + 'px';
        }
        
        setLastNameFontSize(fontSize + 'px');
      }
    };

    // Delay to ensure elements are rendered
    const timeoutId = setTimeout(adjustLastNameSize, 100);
    
    // Also adjust on window resize
    window.addEventListener('resize', adjustLastNameSize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', adjustLastNameSize);
    };
  }, []);

  return (
    <div className="date-time">
      <motion.div 
        layoutId="hero-name"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeInOut",
          layout: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <motion.div
          ref={firstNameRef}
          style={{
            // Glassy text only (no background blur container)
            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78) 55%, rgba(255,255,255,0.58))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '0.3px rgba(255,255,255,0.35)',
            fontSize: '5rem',
            margin: 0,
            padding: '0 10px',
            borderRadius: '5px',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 700,
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
            letterSpacing: '-0.01em',
            textShadow:
              '0 10px 26px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.18)',
            lineHeight: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          Vandan
        </motion.div>
        <motion.div
          ref={lastNameRef}
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78) 55%, rgba(255,255,255,0.58))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '0.3px rgba(255,255,255,0.35)',
            fontSize: lastNameFontSize,
            margin: 0,
            padding: '0 10px',
            borderRadius: '5px',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 700,
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
            letterSpacing: '-0.01em',
            textShadow:
              '0 10px 26px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.18)',
            lineHeight: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            marginTop: '-0.08em' // Slight overlap for better visual connection
          }}
        >
          Patel
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PhoneCallInterface;
