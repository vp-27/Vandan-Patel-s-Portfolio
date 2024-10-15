import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, LayoutGroup, color } from 'framer-motion';
import { Phone } from 'lucide-react';
import WebsiteContent from './WebsiteContent';
import InteractiveBackground from './InteractiveBackground'; // Import the new component
import AppleLockScreenClock from './AppleLockScreenClock';
import './AppleStyleWebsite.css';

const AppleStyleWebsite = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 100], [1, 0]);

  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => setIsExpanded(true), 500);
    }
  }, [isUnlocked]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setIsUnlocked(true);
    } else {
      x.set(0);
    }
  };

  const phoneVariants = {
    initial: { width: '375px', height: '812px', borderRadius: '60px' },
    expanded: { 
      width: '100vw', 
      height: '100vh', 
      borderRadius: '0px', 
      transition: { duration: 0.5, ease: 'easeInOut' } 
    }
  };

  return (
    <div className="mega-container">
      <InteractiveBackground /> {/* Add the InteractiveBackground here */}
      <LayoutGroup>
        <motion.div
          className={`phone-container ${isExpanded ? "phone-expanded" : "phone-initial"}`}
          variants={phoneVariants}
          initial="initial"
          animate={isExpanded ? "expanded" : "initial"}
        >
          <AnimatePresence mode="sync">
            {!isUnlocked ? (
              <motion.div
                key="phone-content"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="phone-content"
              >
                
                <div className="status-bar">
                  <motion.div
                    className="dynamic-island"
                    layoutId="header"
                    initial={{ borderRadius: '20px' }}
                    animate={{ borderRadius: isExpanded ? '20px 20px 0 0' : '20px' }}
                  />
                </div>

                <AppleLockScreenClock />

                <div className="lock-bar">
                  <motion.div className="slide-bar" ref={constraintsRef}>
                    <motion.div
                      className="drag-circle"
                      drag="x"
                      dragConstraints={constraintsRef}
                      dragElastic={0.1}
                      onDragEnd={handleDragEnd}
                      whileDrag={{ scale: 1.1 }}
                      style={{ x }}
                    >
                      <Phone className="phone-icon" size={35} />
                    </motion.div>
                    <motion.p className="unlock-text" style={{ opacity }}>
                      Slide to unlock
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="website-content"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="website-content-container"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  overflowY: 'auto' 
                }}
              >
                <WebsiteContent />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
};

export default AppleStyleWebsite;