// WebsiteContent.jsx - Clean Minimal Version
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
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

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

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
      {/* Mobile Header and Dynamic Island Menu */}
      {isMobile && !menuOpen && (
        <motion.header 
          className={`header ${isAnimating ? 'animating' : ''}`}
          layoutId="header"
          onClick={handleDynamicIslandClick}
          animate={isAnimating ? {
            scaleX: [1, 1.06, 0.98, 1.03, 1]
          } : {}}
          transition={{
            animate: { 
              duration: isAnimating ? 0.6 : 0.4, 
              ease: isAnimating ? [0.25, 0.46, 0.45, 0.94] : "easeOut" 
            },
            exit: { duration: 0.4, ease: "easeIn" },
            layout: { duration: 0.4, ease: "easeInOut" }
          }}
          style={{ 
            cursor: 'pointer',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            position: 'fixed', 
            top: 12, 
            left: 20, 
            right: 20, 
            width: 'calc(100vw - 40px)',
            height: '56px',
            zIndex: 1000,
            padding: '8px 20px',
            borderRadius: '28px'
          }}
        >
          <motion.button
            className="hamburger-menu"
            aria-label="Open menu"
            onClick={(e) => {
              e.stopPropagation(); // Prevent island bounce
              setMenuOpen(true);
            }}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 1002,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              width: '44px',
              height: '44px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={22} />
          </motion.button>
          <motion.div style={{ flex: 1 }} />
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent island bounce
              toggleTheme();
            }}
            className="theme-toggle"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              width: '44px',
              height: '44px'
            }}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </motion.header>
      )}
      {isMobile && menuOpen && (
        <motion.header
          className="header dynamic-island-menu"
          layoutId="header"
          initial={{ 
            borderRadius: '28px', 
            width: 'calc(100vw - 40px)', 
            left: 20, 
            top: 12,
            height: '56px'
          }}
          animate={{ 
            borderRadius: '24px', 
            width: 'calc(100vw - 24px)', 
            left: 12, 
            top: 12,
            height: 'auto',
            minHeight: '220px'
          }}
          exit={{ 
            borderRadius: '28px', 
            width: 'calc(100vw - 40px)', 
            left: 20, 
            top: 12,
            height: '56px'
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94], // Same smooth easing for both directions
            layout: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          style={{
            position: 'fixed',
            background: 'linear-gradient(135deg, #000000, #111111)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: 1001,
            padding: '32px 20px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <nav style={{ width: '100%', marginBottom: '24px' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', margin: 0, padding: 0 }}>
              <li>
                <motion.a 
                  href="#home" 
                  className={activeSection === 'home' ? 'active' : ''} 
                  onClick={(e) => { onHeaderClick(e, 'home'); setMenuOpen(false); }}
                  style={{ 
                    fontSize: activeSection === 'home' ? '1.6rem' : '1.3rem', 
                    color: 'white', 
                    fontWeight: activeSection === 'home' ? 700 : 600, 
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  animate={{
                    scale: activeSection === 'home' ? 1.1 : 1,
                    opacity: activeSection === 'home' ? 1 : 0.8
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
                  onClick={(e) => { onHeaderClick(e, 'about'); setMenuOpen(false); }}
                  style={{ 
                    fontSize: activeSection === 'about' ? '1.6rem' : '1.3rem', 
                    color: 'white', 
                    fontWeight: activeSection === 'about' ? 700 : 600, 
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  animate={{
                    scale: activeSection === 'about' ? 1.1 : 1,
                    opacity: activeSection === 'about' ? 1 : 0.8
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
                  onClick={(e) => { onHeaderClick(e, 'contact'); setMenuOpen(false); }}
                  style={{ 
                    fontSize: activeSection === 'contact' ? '1.6rem' : '1.3rem', 
                    color: 'white', 
                    fontWeight: activeSection === 'contact' ? 700 : 600, 
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  animate={{
                    scale: activeSection === 'contact' ? 1.1 : 1,
                    opacity: activeSection === 'contact' ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </nav>
          <motion.button
            className="close-menu"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontSize: '1rem',
              borderRadius: '50%',
              padding: '14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              width: '48px',
              height: '48px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={24} />
          </motion.button>
        </motion.header>
      )}
    </AnimatePresence>
  );
}


// Landing Hero to receive shared element transition
const LandingHero = () => {
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
      // White gradient for dark theme (original styling)
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
      // Dark gradient for light theme
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
    <section id="home" className="hero-receiver">
      <div className="hero-receiver-inner">
        <motion.div 
          className="hero-receiver-photo" 
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
        
        <div className="hero-text-content">
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
                marginTop: '-0.08em' // Slight overlap for better visual connection
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
      </div>
    </section>
  );
};



// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <motion.div 
          className="about-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm a passionate full-stack developer and financial analyst with a love for creating 
            beautiful, functional digital experiences. My journey spans from building intuitive 
            web applications to analyzing complex financial data.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            When I'm not coding, you'll find me exploring new technologies, working on personal 
            projects, or diving deep into market analysis. I believe that every project is an 
            opportunity to learn something new and push the boundaries of what's possible.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My approach combines technical expertise with creative problem-solving, always 
            striving to deliver solutions that are both elegant and effective.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="about-image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src={profileImage} alt="Vandan Patel - About" />
        </motion.div>
      </div>
    </section>
  );
};

// Main Component
const WebsiteContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const sectionRefs = sections.map(section => ({ id: section.id, ref: section }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when the section is in the middle of the viewport
        threshold: 0,
      }
    );

    sectionRefs.forEach(section => {
      if (section.ref) {
        observer.observe(section.ref);
      }
    });

    return () => {
      sectionRefs.forEach(section => {
        if (section.ref) {
          observer.unobserve(section.ref);
        }
      });
    };
  }, []);

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
    <div className="website-container">
      {/* Move header outside of scrollable content so it is always fixed to viewport */}
      <Header 
        toggleTheme={toggleTheme} 
        darkMode={darkMode} 
        activeSection={activeSection} 
        onHeaderClick={handleHeaderClick} 
      />
      <div className="website-content">
        <main>
          {/* Hero Section */}
          <LandingHero />
          
          {/* About Section */}
          <AboutSection />
          
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
