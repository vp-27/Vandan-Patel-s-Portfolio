import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, LayoutGroup, animate } from 'framer-motion';
import { Phone } from 'lucide-react';
import WebsiteContent from './WebsiteContent';
import InteractiveBackground from './InteractiveBackground'; 
import PhoneCallInterface from './PhoneCallInterface';
import profileImage from '../images/pfp.png';
import './AppleStyleWebsite.css';

const AppleStyleWebsite = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpansionComplete, setIsExpansionComplete] = useState(false);
  const constraintsRef = useRef(null);
  const slideBarRef = useRef(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 100], [1, 0]);
  const autoUnlockTimer = useRef(null);
  const slideDistance = useRef(0);
  const maxSlideDistance = useRef(0);

  useEffect(() => {
    // Get slide bar width for calculations
    if (slideBarRef.current) {
      const slideBarWidth = slideBarRef.current.offsetWidth;
      const dragCircleWidth = 55; // Approximate width of the drag circle
      maxSlideDistance.current = slideBarWidth - dragCircleWidth - 15; // Subtract padding
    }
  }, []);

  // Auto unlock timer with animation
  useEffect(() => {
    autoUnlockTimer.current = setTimeout(() => {
      // Animate the slider before unlocking
      if (!isUnlocked) {
        animate(x, maxSlideDistance.current, {
          type: "spring",
          duration: 0.8,
          onComplete: () => {
            setIsUnlocked(true);
          }
        });
      }
    }, 10000);
    
    return () => clearTimeout(autoUnlockTimer.current);
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      // Start expansion immediately when unlocked for smooth transition
      setIsExpanded(true);
    }
  }, [isUnlocked]);

  useEffect(() => {
    // Clear timer once unlocked
    if (isUnlocked && autoUnlockTimer.current) {
      clearTimeout(autoUnlockTimer.current);
    }
  }, [isUnlocked]);

  useEffect(() => {
    // Handle scroll event - animate slide then unlock
    const handleGlobalWheel = (event) => {
      if (!isUnlocked) {
        // Prevent default scroll behavior
        event.preventDefault();
        
        // Calculate slide progress based on scroll amount
        const scrollAmount = event.deltaY * 0.5; // Scale down the scroll effect
        slideDistance.current += scrollAmount;
        
        // Clamp the slide distance
        slideDistance.current = Math.max(0, Math.min(slideDistance.current, maxSlideDistance.current));
        
        // Animate the slider to the new position
        x.set(slideDistance.current);
        
        // If scrolled enough, trigger unlock after a small delay
        if (slideDistance.current > maxSlideDistance.current * 0.7) {
          setTimeout(() => {
            animate(x, maxSlideDistance.current, {
              type: "spring",
              duration: 0.3,
              onComplete: () => {
                setIsUnlocked(true);
              }
            });
          }, 200);
        }
      }
    };
    
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, [isUnlocked]);

  const handleDragStart = () => {
    // Clear auto unlock timer when user starts dragging
    if (autoUnlockTimer.current) {
      clearTimeout(autoUnlockTimer.current);
    }
  };

  const handleDrag = (event, info) => {
    // Update our slide distance tracker during drag
    slideDistance.current = info.point.x;
  };

  const handleDragEnd = (event, info) => {
    // Check if dragged past unlock threshold (70% of max distance)
    if (info.offset.x > maxSlideDistance.current * 0.7) {
      // Animate to the end position before unlocking
      animate(x, maxSlideDistance.current, {
        type: "spring",
        duration: 0.3,
        onComplete: () => {
          setIsUnlocked(true);
        }
      });
    } else {
      // Spring back to start if not dragged far enough
      animate(x, 0, {
        type: "spring",
        stiffness: 500,
        damping: 30
      });
      slideDistance.current = 0;
    }
  };

  const phoneVariants = {
    initial: { width: '375px', height: '812px', borderRadius: '60px' },
    expanded: { 
      width: '100vw', 
      height: '100vh', 
      borderRadius: '0px', 
      transition: { 
        duration: 0.3, // Faster duration to match other transitions
        ease: 'easeInOut',
        onComplete: () => setIsExpansionComplete(true)
      } 
    }
  };

  return (
    <div className="mega-container">
      {/* Hide interactive background after unlock to avoid double backgrounds */}
      {!isUnlocked && <InteractiveBackground />}
      <LayoutGroup>
        <motion.div
          className={`phone-container ${isExpanded ? "phone-expanded" : "phone-initial"} ${isUnlocked ? 'web-mode' : 'call-mode'}`}
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
                {/* Full-screen call background image with shared element transition */}
                <motion.img 
                  src={profileImage} 
                  alt="Call Background"
                  className="call-bg-img"
                  layoutId="hero-photo"
                />
                
                <div className="status-bar">
                  <motion.div
                    className="dynamic-island"
                    layoutId="header"
                    initial={{ borderRadius: 20, width: '35%', height: 25, top: 10 }}
                    animate={{
                      borderRadius: isExpanded ? 50 : 20,
                      width: isExpanded ? 'calc(100% - 40px)' : '35%',
                      height: isExpanded ? 60 : 25,
                      top: 10
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 400, 
                      damping: 35,
                      duration: 0.3 // Match the exit animation duration
                    }}
                  />
                </div>

                <PhoneCallInterface />

                <div className="lock-bar">
                  <motion.div 
                    className="slide-bar" 
                    ref={slideBarRef}
                  >
                    <motion.div 
                      className="slide-track" 
                      ref={constraintsRef}
                    >
                      <motion.div
                        className="drag-circle"
                        drag="x"
                        dragConstraints={constraintsRef}
                        dragElastic={0}
                        dragMomentum={false}
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ scale: 1.1 }}
                        animate={{ 
                          boxShadow: isUnlocked 
                            ? "0px 0px 15px 5px rgba(52, 199, 89, 0.6)" 
                            : "0px 0px 10px 2px rgba(255, 255, 255, 0.3)"
                        }}
                        style={{ x }}
                      >
                        <Phone className="phone-icon" size={35} />
                      </motion.div>
                    </motion.div>
                    <motion.p className="unlock-text" style={{ opacity }}>
                      Slide to answer
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="website-content"
                initial={{ opacity: 0 }}
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
                  overflowY: isExpansionComplete ? 'auto' : 'hidden' // Only allow scrolling after expansion is complete
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