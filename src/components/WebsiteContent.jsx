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
import orogenieShot from '../images/orogenieShot.png'
import personalWebsiteShot from '../images/personalWebsiteShot.png'
import bluPrintShot from '../images/bluPrintShot.png'
import perkpalShot from '../images/perkpal.png'
import sunnyShot from '../images/sunny.png'
import Dock from './Dock';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Leadership from './Leadership';
import './Dock.css';
import SpotlightCard from './SpotlightCard';
import './SpotlightCard.css';

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
      case 'projects': return 'Projects';
      case 'skills': return 'Skills';
      case 'leadership': return 'Leadership';
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
      const padding = 40;
      const menuSections = 6; // home, about, skills, projects, leadership, contact
      const sectionHeight = 60; // Height per menu item including padding
      const closeButtonHeight = 60; // Close button space
      const contentHeight = (menuSections * sectionHeight) + closeButtonHeight;
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
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('home');
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
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('about');
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
                    href="#projects" 
                    className={activeSection === 'projects' ? 'active' : ''} 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('projects');
                    }}
                    animate={{
                      fontSize: activeSection === 'projects' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'projects' ? 700 : 500,
                      scale: activeSection === 'projects' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Projects
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#skills" 
                    className={activeSection === 'skills' ? 'active' : ''} 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('skills');
                    }}
                    animate={{
                      fontSize: activeSection === 'skills' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'skills' ? 700 : 500,
                      scale: activeSection === 'skills' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Skills
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#leadership" 
                    className={activeSection === 'leadership' ? 'active' : ''} 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('leadership');
                    }}
                    animate={{
                      fontSize: activeSection === 'leadership' ? '1.4rem' : '1rem',
                      fontWeight: activeSection === 'leadership' ? 700 : 500,
                      scale: activeSection === 'leadership' ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    Leadership
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#contact" 
                    className={activeSection === 'contact' ? 'active' : ''} 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // Prevent island bounce
                      onHeaderClick('contact');
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

            {/* Current Section Title - Clean text only */}
            {!isExpanded && (
              <div 
                className="current-section-title"
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#007AFF',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  pointerEvents: 'none',
                  textTransform: 'capitalize',
                  letterSpacing: '-0.02em'
                }}
              >
                {getCurrentSectionTitle()}
              </div>
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
                {['home', 'about', 'projects', 'skills', 'leadership', 'contact'].map((section, index) => {
                  const isActive = activeSection === section;
                  
                  return (
                    <li key={section} style={{ order: index }}>
                      <motion.a 
                        href={`#${section}`}
                        layoutId={isActive ? `section-title-${section}` : undefined}
                        onClick={(e) => { 
                          e.preventDefault();
                          onHeaderClick(section); 
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

// Skills Content Component - Redesigned for Clean UI
const SkillsContent = () => {
  const skillsData = {
    technical: {
      title: "Technical Skills",

      skills: [
        "React & Next.js",
        "TypeScript", 
        "Python",
        "JavaScript/Node.js",
        "Flask/FastAPI",
        "SQL & Databases",
        "Git & Version Control",
        "Cloud Deployment"
      ]
    },
    financial: {
      title: "Financial Technology",
      skills: [
        "Trading APIs",
        "Risk Management",
        "Market Data Analysis",
        "Portfolio Analytics", 
        "Financial Modeling",
        "Backtesting Systems",
        "Real-time Data Processing",
        "Investment Strategy"
      ]
    }
  };

  const SkillCard = ({ skill, index, categoryType }) => (
    <motion.div
      className={`skill-card ${categoryType}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      <h4 className="skill-name">{skill}</h4>
    </motion.div>
  );

  const CategorySection = ({ type, category, index }) => (
    <motion.div
      className={`skills-category ${type}`}
      initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="category-title">{category.title}</h3>
      <div className="skills-grid">
        {category.skills.map((skill, skillIndex) => (
          <SkillCard 
            key={skillIndex} 
            skill={skill} 
            index={skillIndex} 
            categoryType={type}
          />
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">


        <div className="skills-content">
          {Object.entries(skillsData).map(([type, category], index) => (
            <CategorySection 
              key={type} 
              type={type} 
              category={category} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Leadership Content Component
const LeadershipContent = () => {
  const leadershipData = [
    {
      title: "PerkPal",
      subtitle: "Rutgers Shark Tank Finalist",
      period: "Mar 2025 - Present",
      categories: ["SWE", "Financial"], // Both tech stack and business/financial aspects
      highlight: "Top 6 / 30+ Startups",
      description: "Led rewards consolidation platform identifying $2.4B+ market opportunity",
      achievements: [
        "Delivered high-impact pitch to panel of investors",
        "Developed technical proof-of-concept with React + Selenium",
        "Final presentations scheduled for April 2025"
      ],
      icon: "🦈"
    },
    {
      title: "HackRU Project Lead",
      subtitle: "Campus Event Discovery Platform",
      period: "2024",
      categories: ["SWE"], // Technical leadership
      highlight: "24-Hour Hackathon",
      description: "Directed cross-functional development team to successful prototype delivery",
      achievements: [
        "Led team of developers, designers, and backend engineers",
        "Implemented agile methodologies for rapid development",
        "Delivered working prototype within tight deadline"
      ],
      icon: "💻"
    },
    {
      title: "Bender Trust",
      subtitle: "Financial Manager",
      period: "2024",
      categories: ["Financial"], // Financial analysis focus
      highlight: "Investment Strategy",
      description: "Led financial analysis team developing comprehensive investment models",
      achievements: [
        "Built 5-year growth projection models",
        "Presented to industry professionals",
        "Led team of 4 in market analysis"
      ],
      icon: "📊"
    },
    {
      title: "Taekwondo Leadership",
      subtitle: "Black Belt + Class Leader",
      period: "2018 - Present",
      categories: [], // No technical badges - pure leadership/personal development
      highlight: "100% Student Retention",
      description: "Advanced martial artist mentoring 20+ students across all skill levels",
      achievements: [
        "Achieved 100% trial student return rate",
        "Adapted teaching for students with learning difficulties",
        "Fostered discipline and confidence development"
      ],
      icon: "🥋"
    }
  ];

  const LeadershipCard = ({ leadership, index }) => (
    <motion.div
      className="leadership-card-modern"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="leadership-card-header">
        <div className="leadership-icon-modern">
          {leadership.icon}
        </div>
        <div className="leadership-titles">
          <h3>{leadership.title}</h3>
          <p className="leadership-subtitle">{leadership.subtitle}</p>
        </div>
        <div className="leadership-highlight">
          {leadership.highlight}
        </div>
      </div>
      
      <div className="leadership-meta">
        <span className="leadership-period">{leadership.period}</span>
        <div className="leadership-categories">
          {leadership.categories.map((category, idx) => (
            <span key={idx} className={`category-pill ${category.toLowerCase()}`}>
              {category}
            </span>
          ))}
        </div>
      </div>
      
      <p className="leadership-description">{leadership.description}</p>
      
      <div className="leadership-achievements">
        {leadership.achievements.map((achievement, idx) => (
          <div key={idx} className="achievement-item">
            <span className="achievement-bullet">•</span>
            <span className="achievement-text">{achievement}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="leadership" className="leadership-section">
      <motion.div 
        className="leadership-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >


        <div className="leadership-grid-modern">
          {leadershipData.map((leadership, index) => (
            <LeadershipCard key={index} leadership={leadership} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Projects Content Component
const ProjectsContent = () => {
  const projects = [
    {
      id: 1,
      title: "Algorithmic Stock Trading Bot",
      description: "Python-based trading bot using Alpaca API with volatility & price action strategies. Achieved 1.7 Sharpe ratio through dynamic position sizing and stop-loss optimization.",
      image: orogenieShot,
      type: "hybrid", // Finance + CS
      categories: ["Financial", "SWE"],
      timeline: "Nov 2024 – Present",
      technologies: ["Python", "Alpaca API", "Backtesting", "Risk Management"],
      link: null, // No public links
      github: null
    },
    {
      id: 2,
      title: "GrindSheet",
      description: "Open-source fitness PWA tracking 8+ performance metrics with gamified social features. Achieved 85% daily active user retention through streamlined 3-step mobile logging.",
      image: personalWebsiteShot,
      type: "cs", // Pure CS/Tech
      categories: ["SWE"],
      timeline: "May 2025 – Present",
      technologies: ["TypeScript", "React", "PWA", "Supabase", "Tailwind CSS"],
      link: "https://grindsheet.app",
      github: "https://github.com/vp-27/grindsheet"
    },
    {
      id: 3,
      title: "Sunny – Live Insurance Co-Pilot",
      description: "Real-time insurance risk engine prototyped at Microsoft NYC. Processes 6+ live data sources and 43+ unique data points for dynamic quote generation.",
      image: sunnyShot,
      type: "cs", // Pure CS/Tech
      categories: ["SWE"],
      timeline: "Jun 2025",
      technologies: ["Pathway", "RAG", "LLM", "FastAPI", "React", "Python"],
      link: "https://insurance2-u4ew.onrender.com/",
      github: "https://github.com/vp-27/insurance2"
    },
    {
      id: 4,
      title: "OroGenie Trading Platform",
      description: "Full-stack financial analytics platform with real-time market data aggregation. Features distributed data pipeline and SQL-driven portfolio analytics.",
      image: orogenieShot,
      type: "hybrid", // Finance + CS
      categories: ["Financial", "SWE"],
      timeline: "Jun 2024 – Aug 2024",
      technologies: ["React", "Flask", "WebSockets", "SQL", "Yahoo Finance API"],
      link: "https://orogenie.vercel.app",
      github: "https://github.com/vp-27/orogenie"
    },
    {
      id: 5,
      title: "PerkPal – Rutgers Shark Tank",
      description: "Rewards consolidation platform reaching top 6 finalists. Identified $2.4B+ opportunity in fragmented loyalty programs with technical proof-of-concept.",
      image: perkpalShot,
      type: "hybrid", // Business + Tech
      categories: ["Financial", "SWE"],
      timeline: "Mar 2025",
      technologies: ["React", "Selenium", "Business Development", "Market Research"],
      link: "https://perkpal.vercel.app/",
      github: "https://github.com/vp-27/perkpal"
    }
  ];

  const getSpotlightClass = (type) => {
    switch (type) {
      case 'finance':
        return 'finance-project';
      case 'cs':
        return 'cs-project';
      case 'hybrid':
        return 'hybrid-project';
      default:
        return '';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'finance':
        return 'rgba(52, 199, 89, 0.25)'; // Green for pure finance - much stronger
      case 'cs':
        return 'rgba(175, 82, 222, 0.25)'; // Purple for pure CS/tech - much stronger
      case 'hybrid':
        return 'rgba(255, 193, 7, 0.25)'; // Gold for hybrid finance+CS - much stronger
      default:
        return 'rgba(142, 142, 147, 0.15)'; // Default stronger spotlight
    }
  };

  return (
    <section id="projects" className="projects-section">
      <motion.div 
        className="projects-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <SpotlightCard 
                className={`project-spotlight-card ${getSpotlightClass(project.type)}`}
                spotlightColor={getTypeColor(project.type)}
              >
                <div className="project-card-content">
                  {/* Always visible content */}
                  <div className="project-image-container">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="project-image"
                    />
                  </div>
                  
                  <div className="project-compact-header">
                    <div className="project-basic-info">
                      <h3>{project.title}</h3>
                      <div className="project-meta">
                        <span className="project-timeline">{project.timeline}</span>
                        <div className={`project-categories ${project.categories.length > 1 ? 'hybrid' : ''}`}>
                          {project.categories.map((category, idx) => (
                            <span 
                              key={idx} 
                              className={`category-pill ${category.toLowerCase()}`}
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {(project.link || project.github) && (
                      <div className="project-action-buttons">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="action-button visit-action"
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Visit</span>
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="action-button code-action"
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Expanded content - hidden by default, shown on hover on desktop */}
                  <div className="project-expanded-content">
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    

                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
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

  const handleHeaderClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const subject = `Message from ${name}`;
    const body = `From: ${email}\n\n${message}`;
    window.location.href = `mailto:vrp77@scarletmail.rutgers.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
          
          {/* Section Divider */}
          <div className="section-divider"></div>
          
          {/* Projects Section */}
          <ProjectsContent />
          
          {/* Section Divider */}
          <div className="section-divider"></div>
          
          {/* Skills Section */}
          <SkillsContent />
          
          {/* Section Divider */}
          <div className="section-divider"></div>
          
          {/* Leadership Section */}
          <LeadershipContent />
          
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
