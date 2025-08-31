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

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return (
    <AnimatePresence>
      {!isMobile && (
        <motion.header 
          className="header" 
          layoutId="header"
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut",
            layout: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="header-content"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <nav>
              <ul>
                <li>
                  <a 
                    href="#home" 
                    className={activeSection === 'home' ? 'active' : ''} 
                    onClick={(e) => onHeaderClick(e, 'home')}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className={activeSection === 'contact' ? 'active' : ''} 
                    onClick={(e) => onHeaderClick(e, 'contact')}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
          <motion.button
            onClick={toggleTheme}
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
          className="header" 
          layoutId="header"
          transition={{
            animate: { duration: 0.4, ease: "easeOut" },
            exit: { duration: 0.4, ease: "easeIn" },
            layout: { duration: 0.4, ease: "easeInOut" }
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            position: 'fixed', 
            top: 10, 
            left: 0, 
            right: 0, 
            zIndex: 1000,
            padding: '10px 20px'
          }}
        >
          <motion.button
            className="hamburger-menu"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              zIndex: 1002, 
              marginRight: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
          <motion.div style={{ flex: 1 }} />
          <motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'white', 
              borderRadius: '50%', 
              padding: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
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
          initial={{ borderRadius: '30px', width: '98vw', left: '1vw', top: 8 }}
          animate={{ borderRadius: '30px', width: '100vw', left: 0, top: 0 }}
          exit={{ borderRadius: '30px', width: '98vw', left: '1vw', top: 8 }}
          transition={{
            animate: { duration: 0.6, ease: "easeOut" },
            exit: { duration: 0.6, ease: "easeIn" },
            layout: { duration: 0.6, ease: "easeInOut" }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            borderRadius: '30px',
            background: 'linear-gradient(135deg, #000000, #111111)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            zIndex: 1001,
            padding: '30px 0 20px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <nav style={{ width: '100%' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', margin: 0, padding: 0 }}>
              <li>
                <a 
                  href="#home" 
                  className={activeSection === 'home' ? 'active' : ''} 
                  onClick={(e) => { onHeaderClick(e, 'home'); setMenuOpen(false); }}
                  style={{ fontSize: '1.3rem', color: 'white', fontWeight: 600 }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={activeSection === 'contact' ? 'active' : ''} 
                  onClick={(e) => { onHeaderClick(e, 'contact'); setMenuOpen(false); }}
                  style={{ fontSize: '1.3rem', color: 'white', fontWeight: 600 }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <motion.button
            className="close-menu"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'linear-gradient(135deg, #333333, #444444)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              marginTop: '18px',
              fontSize: '1.1rem',
              borderRadius: '50%',
              padding: '10px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.15 }}
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
const LandingHero = () => (
  <section className="hero-receiver">
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
          <motion.div
            style={{
              // Match the PhoneCallInterface styling exactly for consistency
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,.5) 55%, rgba(255,255,255,1))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontSize: '5rem',
              margin: 0,
              padding: '0 10px 0 0',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility',
              letterSpacing: '-0.01em',
              textShadow:
                '0 0px 0px rgba(255, 255, 255, 0.35), 0 0px 12px rgba(255, 255, 255, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.18)',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap'
            }}
          >
            Vandan
          </motion.div>
          <motion.div
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,1), rgba(255,255,255,.5) 55%, rgba(255,255,255,1))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              fontSize: '5rem',
              margin: 0,
              padding: '0 10px 0 0',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              WebkitFontSmoothing: 'antialiased',
              textRendering: 'optimizeLegibility',
              letterSpacing: '-0.01em',
              textShadow:
                '0 0px 0px rgba(255, 255, 255, 0.35), 0 0px 12px rgba(255, 255, 255, 0.25), 0 1px 2px rgba(0, 0, 0, 0.35), 0 0 1px rgba(255, 255, 255, 0.18)',
              lineHeight: 1,
              textAlign: 'left',
              whiteSpace: 'nowrap',
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
    setActiveSection(sectionId);
    
    // Smooth scroll to section if it exists
    if (sectionId === 'contact') {
      const section = document.getElementById('contact');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {/* Spacer Section */}
          <section className="spacer-section">
            <div className="spacer-content">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  color: 'var(--text-color)',
                  opacity: 0.7,
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6
                }}
              >
                Building beautiful, functional experiences one project at a time.<br/>
                <span style={{ opacity: 0.5, fontSize: '1rem' }}>More sections coming soon...</span>
              </motion.p>
            </div>
          </section>
          {/* Contact Section with Footer */}
          <section id="contact" className="contact-minimal">
            <Dock items={isSmallScreen ? dockItems.slice(0, 4) : dockItems} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default WebsiteContent;
