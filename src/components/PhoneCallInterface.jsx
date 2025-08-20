import React from 'react';
import { motion } from 'framer-motion';

const PhoneCallInterface = () => {
  return (
  <div className="date-time">
      <motion.h2 
        layoutId="hero-name"
        style={{
          color: 'rgba(255, 255, 255, 1)',
          fontSize: '3.5rem',
          margin: 0,
          padding: '5px 10px',
          borderRadius: '5px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontWeight: 300
        }}
        transition={{ duration: 0.3 }}
      >
        Vandan<br/>Patel
      </motion.h2>
    </div>
  );
};

export default PhoneCallInterface;
