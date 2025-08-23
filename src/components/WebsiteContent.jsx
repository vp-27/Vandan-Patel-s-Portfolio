// WebsiteContent.jsx - Clean Minimal Version
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import './WebsiteContent.css';
import profileImage from '../images/pfp.png';
import orogenieLogo from '../images/orogenie-logo.jpg'
import bluPrint from '../images/bluprint.png'
import finder from '../images/finder.png'
import resume from '../documents/resume.pdf'
import Dock from './Dock';
import './Dock.css';

// Header Component
const Header = ({ toggleTheme, darkMode, activeSection, onHeaderClick }) => (
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
);

// Landing Hero to receive shared element transition
const LandingHero = () => (
  <section className="hero-receiver">
    <div className="hero-receiver-inner">
      <motion.div 
        className="hero-receiver-photo" 
        layoutId="hero-photo"
        style={{ filter: 'brightness(1)' }}
        transition={{ 
          duration: 0.4, 
          ease: "easeInOut",
          layout: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <img src={profileImage} alt="Vandan Patel" />
      </motion.div>
      
      <div className="hero-text-content">
        <motion.div 
          layoutId="hero-name"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
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
          Full-Stack Developer | Data Analyst
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
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Default to light mode
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
      <div className="website-content">
        <Header 
          toggleTheme={toggleTheme} 
          darkMode={darkMode} 
          activeSection={activeSection} 
          onHeaderClick={handleHeaderClick} 
        />
        
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
            <Dock items={dockItems} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default WebsiteContent;
