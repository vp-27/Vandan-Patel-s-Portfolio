import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, LayoutGroup, animate } from 'framer-motion';
import { Phone } from 'lucide-react';
import WebsiteContent from './WebsiteContent';
import DotGrid from './DotGrid';
import PhoneCallInterface from './PhoneCallInterface';
import ShinyText from './ShinyText';
import profileImage from '../images/pfp.png';
import './AppleStyleWebsite.css';

const AppleStyleWebsite = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpansionComplete, setIsExpansionComplete] = useState(false);
  const [systemTheme, setSystemTheme] = useState('light');
  const constraintsRef = useRef(null);
  const slideBarRef = useRef(null);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 100], [1, 0]);
  const autoUnlockTimer = useRef(null);
  const slideDistance = useRef(0);
  const maxSlideDistance = useRef(0);

  useEffect(() => {
    // Detect system theme preference
    const detectSystemTheme = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setSystemTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setSystemTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    // Initial detection
    detectSystemTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      if (e.matches) {
        setSystemTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        setSystemTheme('light');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    };

    mediaQuery.addEventListener('change', handleThemeChange);
    return () => mediaQuery.removeEventListener('change', handleThemeChange);
  }, []);

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
      // Start border expansion immediately when unlocked
      setIsExpanding(true);
      // After border expands, start the full expansion
      setTimeout(() => {
        setIsExpanded(true);
      }, 150); // Match the expanding animation duration
    }
  }, [isUnlocked]);

  useEffect(() => {
    // Clear timer once unlocked
    if (isUnlocked && autoUnlockTimer.current) {
      clearTimeout(autoUnlockTimer.current);
    }
  }, [isUnlocked]);

  // Add a class to body once the expansion transition is complete.
  // Dock uses this to smoothly pop up afterwards.
  useEffect(() => {
    let timer;
    if (isExpansionComplete) {
      timer = setTimeout(() => {
        document.body.classList.add('site-ready');
      }, 75); // slight delay after onComplete for smoother feel
    } else {
      document.body.classList.remove('site-ready');
    }
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('site-ready');
    };
  }, [isExpansionComplete]);

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
    initial: { 
      width: '375px', 
      height: '812px', 
      borderRadius: '60px',
      borderWidth: '5px',
      borderColor: 'rgba(0, 0, 0, 1)',
      scale: 1
    },
    expanding: {
      borderWidth: '15px', // First expand the border width
      borderColor: 'rgba(0, 0, 0, 0.8)',
      scale: 1.02,
      transition: { 
        duration: 0.15,
        ease: 'easeOut'
      }
    },
    expanded: { 
      width: '100vw', 
      height: '100vh', 
      borderRadius: '0px',
      borderWidth: '0px',
      borderColor: 'rgba(0, 0, 0, 0)',
      scale: 1,
      transition: { 
        duration: 0.25,
        ease: 'easeInOut',
        onComplete: () => setIsExpansionComplete(true)
      } 
    }
  };

  return (
    <div className="mega-container" style={{
      backgroundColor: systemTheme === 'dark' ? 'rgba(0, 0, 0, 0.95)' : 'rgba(245, 245, 247, 0.95)'
    }}>
      {/* Always-present DotGrid background - covers entire viewport */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2, // Behind everything
        }}
      >
        <DotGrid
          style={{ width: '100%', height: '100%' }}
          dotSize={10}
          gap={15}
          baseColor={systemTheme === 'dark' ? "#4A90E2" : "#5227FF"}
          activeColor={systemTheme === 'dark' ? "#6BB6FF" : "#7B68EE"}
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      
      {/* Overlay for smooth transitions */}
      <AnimatePresence>
        {!isExpansionComplete && (
          <motion.div
            key="bg-overlay"
            initial={{ opacity: 0.3 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.6, ease: "easeOut" }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: systemTheme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)',
              zIndex: -1,
            }}
          />
        )}
      </AnimatePresence>
      <LayoutGroup>
        <motion.div
          className={`phone-container ${isExpanded ? "phone-expanded" : "phone-initial"} ${isUnlocked ? 'web-mode' : 'call-mode'}`}
          variants={phoneVariants}
          initial="initial"
          animate={
            isExpanded ? "expanded" : 
            isExpanding ? "expanding" : 
            "initial"
          }
        >
          <AnimatePresence mode="sync">
            {!isUnlocked ? (
              <motion.div
                key="phone-content"
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: isExpanding ? 0.9 : 1, // Very subtle fade to maintain continuity
                  scale: 1 // Remove scaling to avoid interference
                }}
                exit={{ 
                  opacity: 0, 
                  transition: { duration: 0.25, ease: "easeOut" }
                }}
                className="phone-content"
              >
                {/* Full-screen call background image with shared element transition */}
                {/* Full-screen call background image with shared element transition */}
                <motion.img
                  layoutId="hero-photo"
                  src={profileImage} 
                  alt="Call Background"
                  className="call-bg-img"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                
                <div className="status-bar">
                  <motion.div
                    className="dynamic-island"
                    layoutId="header"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>

                <PhoneCallInterface />                <div className="lock-bar">
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
                    <motion.div style={{ opacity, position: 'absolute', width: '100%', textAlign: 'center', zIndex: 1, pointerEvents: 'none' }}>
                      <ShinyText text="Slide to answer" speed={3} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="website-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }} // Slight delay to let expansion start
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