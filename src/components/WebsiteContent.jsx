// WebsiteContent.jsx - Clean Minimal Version
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import './WebsiteContent.css';
import profileImage from '../images/pfp.png';
import orogenieLogo from '../images/orogenie-logo.jpg'
import bluPrint from '../images/bluprint.png'
import finder from '../images/finder.png'
import resume from '../documents/resume.pdf'
import Dock from './Dock';
import './Dock.css';

// Header Component with Hamburger for Mobile
function Header({ toggleTheme, darkMode, activeSection, onHeaderClick }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const headerRef = useRef(null);
  const menuContentRef = useRef(null);
  const tlRef = useRef(null);

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Get current section title for mobile display
  const getCurrentSectionTitle = () => {
    switch(activeSection) {
      case 'home': return 'Home';
      case 'about': return 'About';
      case 'contact': return 'Contact';
      default: return 'Home';
    }
  };

  // Calculate expanded height for mobile menu
  const calculateHeight = () => {
    const headerEl = headerRef.current;
    if (!headerEl || !isMobile) return 56;

    if (menuContentRef.current) {
      const topBar = 56;
      const padding = 32;
      const contentHeight = 200; // Fixed height for our simple menu
      return topBar + contentHeight + padding;
    }
    return 56;
  };

  // Create GSAP timeline for smooth expansion
  const createTimeline = () => {
    const headerEl = headerRef.current;
    const menuEl = menuContentRef.current;
    if (!headerEl || !menuEl || !isMobile) return null;

    gsap.set(headerEl, { height: 56, overflow: 'hidden' });
    gsap.set(menuEl, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });

    tl.to(headerEl, {
      height: calculateHeight(),
      duration: 0.5,
      ease: "power3.out"
    });

    tl.to(menuEl, { 
      opacity: 1, 
      y: 0, 
      duration: 0.4, 
      ease: "power3.out" 
    }, '-=0.2');

    return tl;
  };

  // Initialize timeline
  useLayoutEffect(() => {
    if (isMobile) {
      const tl = createTimeline();
      tlRef.current = tl;

      return () => {
        tl?.kill();
        tlRef.current = null;
      };
    }
  }, [isMobile]);

  // Handle menu toggle with smooth animation
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl || !isMobile) return;

    if (!isExpanded) {
      setMenuOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setMenuOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleDynamicIslandClick = (e) => {
    // Only trigger animation if clicking the island itself, not buttons inside
    if (e.target === e.currentTarget || e.target.closest('.header-content')) {
      setIsAnimating(true);
      
      // Add a subtle haptic feedback effect
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <AnimatePresence>
      {!isMobile && (
        <motion.header 
          className={`header ${isAnimating ? 'animating' : ''}`}
          layoutId="header"
          onClick={handleDynamicIslandClick}
          style={{ cursor: 'pointer' }}
          animate={isAnimating ? {
            scaleX: [1, 1.08, 0.96, 1.04, 1]
          } : {}}
          transition={{ 
            duration: isAnimating ? 0.6 : 0.4, 
            ease: isAnimating ? [0.25, 0.46, 0.45, 0.94] : "easeInOut",
            layout: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="header-content"
            initial={{ opacity: 1, y: 0 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isAnimating ? [1, 0.98, 1.01, 1] : 1
            }}
            transition={{ 
              duration: isAnimating ? 0.6 : 0.5,
              ease: isAnimating ? [0.25, 0.46, 0.45, 0.94] : "easeOut"
            }}
          >
            <nav>
              <ul>
                <li>
                  <motion.a 
                    href="#home" 
                    className={activeSection === 'home' ? 'active' : ''} 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick(e, 'home');
                    }}
                    animate={{
                      fontSize: activeSection === 'home' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'home' ? 700 : 500,
                      scale: activeSection === 'home' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#about" 
                    className={activeSection === 'about' ? 'active' : ''} 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick(e, 'about');
                    }}
                    animate={{
                      fontSize: activeSection === 'about' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'about' ? 700 : 500,
                      scale: activeSection === 'about' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    About
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#contact" 
                    className={activeSection === 'contact' ? 'active' : ''} 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick(e, 'contact');
                    }}
                    animate={{
                      fontSize: activeSection === 'contact' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'contact' ? 700 : 500,
                      scale: activeSection === 'contact' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </nav>
          </motion.div>
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent island bounce
              toggleTheme();
            }}
            className="theme-toggle"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.header>
      )}
      {/* Mobile Header - Improved Dynamic Island with GSAP */}
      {isMobile && (
        <header 
          ref={headerRef}
          className={`header mobile-dynamic-island ${isExpanded ? 'expanded' : ''} ${isAnimating ? 'animating' : ''}`}
          onClick={!isExpanded ? handleDynamicIslandClick : undefined}
          style={{ 
            cursor: !isExpanded ? 'pointer' : 'default',
            position: 'fixed', 
            top: 12, 
            left: 20, 
            right: 20, 
            width: 'calc(100vw - 40px)',
            height: isExpanded ? 'auto' : '56px',
            minHeight: '56px',
            zIndex: 1000,
            borderRadius: isExpanded ? '20px' : '28px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85), rgba(17,17,17,0.85))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            transition: isExpanded ? 'none' : 'all 0.3s ease'
          }}
        >
          {/* Top Bar - Always Visible */}
          <div className="header-top-bar" style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            position: 'relative',
            zIndex: 2,
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Hamburger Menu - Disappears when expanded */}
            <motion.button
              className="hamburger-menu-gsap"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                borderRadius: '50%', 
                padding: '10px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                flexShrink: 0
              }}
              animate={{
                opacity: isExpanded ? 0 : 1,
                scale: isExpanded ? 0.8 : 1,
                pointerEvents: isExpanded ? 'none' : 'auto'
              }}
              whileHover={{ scale: isExpanded ? 0.8 : 1.05 }}
              whileTap={{ scale: isExpanded ? 0.8 : 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Menu size={20} />
            </motion.button>

            {/* Current Section Title - Stays visible and flows to menu position */}
            {!isExpanded && (
              <motion.div 
                className="current-section-title"
                layoutId={`section-title-${activeSection}`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#007AFF',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  textTransform: 'capitalize'
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {getCurrentSectionTitle()}
              </motion.div>
            )}

            {/* Theme Toggle - Disappears when expanded */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="theme-toggle"
              aria-label="Toggle theme"
              style={{ 
                background: 'none',
                border: 'none', 
                color: darkMode ? '#34C759' : '#FF9500',
                borderRadius: '50%', 
                padding: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                flexShrink: 0
              }}
              animate={{
                opacity: isExpanded ? 0 : 1,
                scale: isExpanded ? 0.8 : 1,
                pointerEvents: isExpanded ? 'none' : 'auto'
              }}
              whileHover={{ scale: isExpanded ? 0.8 : 1.1 }}
              whileTap={{ scale: isExpanded ? 0.8 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>

          {/* Expanded Menu Content */}
          <div 
            ref={menuContentRef}
            className="mobile-menu-content" 
            style={{
              padding: '20px 0 0 0',
              opacity: 0,
              visibility: isExpanded ? 'visible' : 'hidden',
              pointerEvents: isExpanded ? 'auto' : 'none',
              position: 'absolute',
              top: '0px',
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <nav style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <ul style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '16px', 
                margin: 0, 
                padding: 0,
                listStyle: 'none'
              }}>
                {['home', 'about', 'contact'].map((section, index) => {
                  const isActive = activeSection === section;
                  
                  return (
                    <li key={section} style={{ order: index }}>
                      <motion.a 
                        href={`#${section}`}
                        layoutId={isActive ? `section-title-${section}` : undefined}
                        onClick={(e) => { 
                          onHeaderClick(e, section); 
                          toggleMenu(); 
                        }}
                        style={{ 
                          fontSize: '1.4rem',
                          color: isActive ? '#007AFF' : 'white',
                          fontWeight: isActive ? 700 : 500, 
                          textDecoration: 'none',
                          textTransform: 'capitalize',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          background: isActive ? 'rgba(0, 122, 255, 0.15)' : 'transparent',
                          border: isActive ? '1px solid rgba(0, 122, 255, 0.3)' : '1px solid transparent',
                          transition: 'all 0.3s ease',
                          display: 'block',
                          textAlign: 'center',
                          minWidth: '120px',
                          cursor: 'pointer',
                          boxShadow: isActive ? '0 0 20px rgba(0, 122, 255, 0.2)' : 'none'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: isActive ? 'rgba(0, 122, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {section}
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            {/* Close button at the bottom */}
            <motion.button
              onClick={toggleMenu}
              style={{
                marginTop: 'auto',
                marginBottom: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: '50%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: '44px',
                height: '44px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={20} />
            </motion.button>
          </div>
        </header>
      )}
    </AnimatePresence>
  );
}


// Hero Content Component
const HeroContent = () => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Listen for theme changes
  useEffect(() => {
    const detectTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'light';
      setCurrentTheme(theme);
    };

    detectTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Helper function to get theme-aware text styling
  const getTextStyle = (fontSize, padding = '0 10px 0 0') => {
    const baseStyle = {
      fontSize: fontSize,
      margin: 0,
      padding: padding,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 700,
      WebkitFontSmoothing: 'antialiased',
      textRendering: 'optimizeLegibility',
      letterSpacing: '-0.01em',
      lineHeight: 1,
      textAlign: 'left',
      whiteSpace: 'nowrap'
    };

    if (currentTheme === 'dark') {
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,.5) 55%, rgba(255,255,255,1))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0px 0px rgba(255, 255, 255, 0.35), 0 0px 12px rgba(255, 255, 255, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.18)'
      };
    } else {
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(180deg, rgba(30,30,30,1), rgba(30,30,30,.7) 55%, rgba(30,30,30,1))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0px 0px rgba(30, 30, 30, 0.35), 0 0px 12px rgba(30, 30, 30, 0.25), 0 1px 2px rgba(255, 255, 255, 0.35), 0 0 1px rgba(30, 30, 30, 0.18)'
      };
    }
  };

  return (
    <section id="home" className="hero-content-section">
      <div className="hero-text">
        <motion.div 
          layoutId="hero-name"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            originY: 0
          }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
            layout: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          <motion.div style={getTextStyle('5rem')}>
            Vandan
          </motion.div>
          <motion.div
            style={{
              ...getTextStyle('5rem'),
              marginTop: '-0.08em'
            }}
          >
            Patel
          </motion.div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Full-Stack Developer | Financial Analyst
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          "Everything's a passion project"
        </motion.p>
      </div>
    </section>
  );
};

// About Content Component
const AboutContent = ({ aboutRef }) => {
  return (
    <section id="about" className="about-content-section" ref={aboutRef}>
      <motion.div 
        className="about-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          I'm a passionate full-stack developer and financial analyst with a love for creating 
          beautiful, functional digital experiences. My journey spans from building intuitive 
          web applications to analyzing complex financial data.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          When I'm not coding, you'll find me exploring new technologies, working on personal 
          projects, or diving deep into market analysis. I believe that every project is an 
          opportunity to learn something new and push the boundaries of what's possible.
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          My approach combines technical expertise with creative problem-solving, always 
          striving to deliver solutions that are both elegant and effective.
        </motion.p>
      </motion.div>
    </section>
  );
};

// Main Component
const WebsiteContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);
  const aboutRef = useRef(null);

  const dockItems = [
    {
      icon: <img src={finder} alt="Resume" loading="lazy" />,
      label: 'Find My Resume',
      onClick: () => window.open(resume, '_blank'),
    },
    {
      icon: <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" alt="GitHub" />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/vp-27', '_blank'),
    },
    {
      icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedIn" />,
      label: 'LinkedIn',
      onClick: () => window.open('https://www.linkedin.com/in/vandan-patel-vp/', '_blank'),
    },
    {
      icon: <img src="https://thumbs.dreamstime.com/b/logo-icon-vector-logos-icons-set-social-media-flat-banner-vectors-svg-eps-jpg-jpeg-paper-texture-glossy-emblem-wallpaper-210442689.jpg" alt="Email" />,
      label: 'Email',
      onClick: () => window.location.href = 'mailto:vrp77@scarletmail.rutgers.edu',
    },
    {
      icon: <img src="https://images.freeimages.com/fic/images/icons/2443/bunch_of_cool_bluish_icons/512/reload.png" alt="Portfolio" />,
      label: 'Portfolio',
      onClick: () => window.open('https://vandan-patel.vercel.app/', '_blank'),
    },
    {
      icon: <img src={orogenieLogo} alt="OroGenie" loading="lazy" />,
      label: 'OroGenie',
      onClick: () => window.open('https://orogenie.vercel.app', '_blank'),
    },
    {
      icon: <img src={bluPrint} alt="BluPrint" loading="lazy" />,
      label: 'BluPrint',
      onClick: () => window.open('https://bluprint-orpin.vercel.app', '_blank'),
    },
  ];

  useEffect(() => {
    // Don't override system theme - let AppleStyleWebsite handle it
    // Just check what's already set and sync our state
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) {
      setDarkMode(currentTheme === 'dark');
    }

    // Listen for theme changes set by the parent component
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setDarkMode(newTheme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Track active section
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  // Track About in view (optional: for hero fade if desired)
  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => setAboutInView(e.isIntersecting)),
      { rootMargin: '0px 0px -60% 0px', threshold: [0, 0.2] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // (Removed older section-only observer; consolidated above)

  // Responsive breakpoint: show only first 4 dock items on small screens
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsSmallScreen(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const handleHeaderClick = (e, sectionId) => {
    e.preventDefault();
    
    const section = document.getElementById(sectionId);
    if (section) {
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 60; // Fallback height
      
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = sectionTop - headerHeight;
      
      window.scrollTo({ 
        top: scrollToPosition, 
        behavior: 'smooth' 
      });
    } else if (sectionId === 'home') {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  return (
  <div className={`website-container ${aboutInView ? 'about-in-view' : ''}`}>
      {/* Move header outside of scrollable content so it is always fixed to viewport */}
      <Header 
        toggleTheme={toggleTheme} 
        darkMode={darkMode} 
        activeSection={activeSection} 
        onHeaderClick={handleHeaderClick} 
      />
      <div className="website-content">
        <main>
          {/* Container that spans hero + about for sticky to work */}
          <div className="hero-about-wrapper">
            <div className="sticky-pfp-container">
              <motion.div 
                className="sticky-pfp" 
                layoutId="hero-photo"
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut",
                  layout: { duration: 0.4, ease: "easeInOut" }
                }}
              >
                <motion.img 
                  src={profileImage} 
                  alt="Vandan Patel" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    filter: 'brightness(1)'
                  }} 
                />
              </motion.div>
            </div>
            <div className="content-column">
              <HeroContent />
              <AboutContent aboutRef={aboutRef} />
            </div>
          </div>
          
          {/* Contact Section with Footer */}
          <section id="contact" className="contact-section">
            <div className="contact-content-wrapper">
              <motion.div 
                className="contact-text-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2>Get in Touch</h2>
                <p>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Whether you have a question or just want to say hi, my inbox is always open.
                </p>
                <p>
                  Feel free to reach out through any of the platforms below.
                </p>
              </motion.div>
              <div className="contact-dock-container">
                <Dock items={isSmallScreen ? dockItems.slice(0, 4) : dockItems} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WebsiteContent;
