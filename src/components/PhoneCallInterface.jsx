import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../images/pfp.png';

const PhoneCallInterface = () => {
  return (
    <div className="date-time">
      <motion.div className="call-avatar" layoutId="hero-photo">
        <img src={profileImage} alt="Vandan Patel" />
      </motion.div>
      <motion.h2 layoutId="hero-name">Vandan<br/>Patel</motion.h2>
    </div>
  );
};

export default PhoneCallInterface;
