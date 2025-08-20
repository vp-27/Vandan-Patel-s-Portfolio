import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PhoneCallInterface = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [lastNameFontSize, setLastNameFontSize] = useState('3.5rem');

  useEffect(() => {
    const adjustLastNameSize = () => {
      if (firstNameRef.current && lastNameRef.current) {
        const firstNameWidth = firstNameRef.current.offsetWidth;
        const lastNameElement = lastNameRef.current;
        
        // Start with a base font size
        let fontSize = 56; // 3.5rem = 56px
        lastNameElement.style.fontSize = fontSize + 'px';
        
        // Adjust font size to match first name width
        while (lastNameElement.offsetWidth > firstNameWidth && fontSize > 20) {
          fontSize -= 2;
          lastNameElement.style.fontSize = fontSize + 'px';
        }
        
        // If it's too small, increase it
        while (lastNameElement.offsetWidth < firstNameWidth * 0.95 && fontSize < 80) {
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
            color: 'rgba(255, 255, 255, 1)',
            fontSize: '3.5rem',
            margin: 0,
            padding: '0 10px',
            borderRadius: '5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
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
            color: 'rgba(255, 255, 255, 1)',
            fontSize: lastNameFontSize,
            margin: 0,
            padding: '0 10px',
            borderRadius: '5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            lineHeight: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            marginTop: '-0.1em' // Slight overlap for better visual connection
          }}
        >
          Patel
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PhoneCallInterface;
