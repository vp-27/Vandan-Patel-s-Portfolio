import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../images/pfp.png';

const TransitionHero = ({ isExpanded }) => {
  return (
    <div className="transition-hero">
      {/* Profile Image - moves to left */}
      <motion.div 
        className="hero-profile-image"
        initial={{ scale: 0, x: 0 }}
        animate={{ 
          scale: isExpanded ? 1 : 0,
          x: isExpanded ? -200 : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <img src={profileImage} alt="Vandan Patel" />
      </motion.div>

      {/* Name - moves to right and becomes hero text */}
      <motion.div 
        className="hero-name"
        initial={{ x: 0, y: 0 }}
        animate={{ 
          x: isExpanded ? 200 : 0,
          y: isExpanded ? -50 : 0
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h1
          animate={{
            fontSize: isExpanded ? '4rem' : '3.5rem',
            color: isExpanded ? '#fff' : 'rgba(255, 255, 255, 1)'
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Vandan<br/>Patel
        </motion.h1>
        {isExpanded && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ color: '#888', fontSize: '1.5rem', marginTop: '1rem' }}
          >
            Full-Stack Developer | Data Analyst
          </motion.h2>
        )}
      </motion.div>
    </div>
  );
};

export default TransitionHero;
