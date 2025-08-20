// WebsiteContent.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react';
import './WebsiteContent.css';
import profileImage from '../images/pfp.png';
import Projects from './Projects';
import Leadership from './Leadership';
import orogenieLogo from '../images/orogenie-logo.jpg'
import bluPrint from '../images/bluprint.png'
import finder from '../images/finder.png'
import resume from '../documents/resume.pdf'
// import '../images/car.jpg'; // Removed unused import

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
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''} 
              onClick={(e) => onHeaderClick(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeSection === 'projects' ? 'active' : ''} 
              onClick={(e) => onHeaderClick(e, 'projects')}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#leadership" 
              className={activeSection === 'leadership' ? 'active' : ''} 
              onClick={(e) => onHeaderClick(e, 'leadership')}
            >
              Leadership
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={activeSection === 'skills' ? 'active' : ''} 
              onClick={(e) => onHeaderClick(e, 'skills')}
            >
              Skills
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
        style={{
          filter: 'brightness(1)'
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeInOut",
          layout: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <img src={profileImage} alt="Vandan Patel" />
      </motion.div>
      <motion.h1 
        layoutId="hero-name"
        style={{
          fontSize: '4rem',
          lineHeight: 0.95,
          color: 'var(--text-color)'
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeInOut",
          layout: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        Vandan<br/>Patel
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        Full-Stack Developer | Data Analyst
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        "Everything's a passion project"
      </motion.p>
    </div>
  </section>
);

// About Section
const About = () => (
  <motion.section id="about" className="about">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      About Me
    </motion.h2>
    <motion.div
      className="about-content glass"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <div className="about-image">
        <img src={profileImage} alt="Vandan Patel" loading="lazy" />
      </div>
      <div className="about-text">
        <div className="about-text-content">
          <p>
            I've always valued function over form—but never when function lacks form. For me, that's where passion meets purpose.
          </p>
          <p>
            As I pursue a Bachelor of Science in Computer Science and Finance, I carry a keen focus on blending intuitive design with functional components. I love to nitpick on the design of applications, creating a responsive frontend dynamic that follows the data organization of the backend.
            My project work, such as OroGenie—a revamped trading dashboard with paper trading capabilities and an upcoming Python algorithmic trading interface—reflects my commitment to creating seamless, user-friendly interfaces that merge financial analysis with software development. Additionally, during my internship, I contributed to a data warehousing project working with SQL queries and DBT, and spearheaded the introduction of prompt engineering strategies of large language models to the team, significantly impacting our workflow.
          </p>
          <p>
            Outside of academics and work, I'm a black belt in Taekwondo, an avid mountain biker, and enjoy both video and photo editing—because sometimes, it's the details that make all the difference.
          </p>
        </div>
        <motion.a
          href="#contact"
          className="btn btn-primary"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById('contact');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          Contact Me
        </motion.a>
      </div>
    </motion.div>
  </motion.section>
);

// Skills Section update
const Skills = () => {
  const skills = {
    technical: [
      { 
        name: 'Python (Financial Modeling)', 
        projects: [
          { name: 'OroGenie', link: 'orogenie' }
        ] 
      },
      { 
        name: 'React', 
        projects: [
          { name: 'This Website', link: 'personal-website' },
          { name: 'BluPrint', link: 'bluprint' },
          { name: 'OroGenie', link: 'orogenie' }
        ] 
      },
      { 
        name: 'SQL', 
        projects: [
          { name: 'Data Warehousing Internship', link: '#' },
          { name: 'OroGenie Database', link: 'orogenie' }
        ] 
      },
      { 
        name: 'Flask', 
        projects: [
          { name: 'OroGenie Backend', link: 'orogenie' }
        ] 
      },
      { 
        name: 'JavaScript', 
        projects: [
          { name: 'BluPrint', link: 'bluprint' },
          { name: 'This Website', link: 'personal-website' }
        ] 
      },
      { 
        name: 'HTML/CSS', 
        projects: [
          { name: 'All Web Projects', link: '#' }
        ] 
      },
      { 
        name: 'Excel (VBA)', 
        projects: [
          { name: 'Financial Models', link: '#' },
          { name: 'Budget Tracker', link: '#' }
        ] 
      },
      { 
        name: 'Git', 
        projects: [
          { name: 'All Projects', link: 'https://github.com/vp-27' }
        ] 
      },
      { 
        name: 'JWT', 
        projects: [
          { name: 'OroGenie Authentication', link: 'https://orogenie.vercel.app' }
        ] 
      },
      { 
        name: 'WebSockets', 
        projects: [
          { name: 'OroGenie Live Updates', link: 'https://orogenie.vercel.app' }
        ] 
      },
      { 
        name: 'Selenium', 
        projects: [
          { name: 'OroGenie Web Scraping', link: 'https://orogenie.vercel.app' }
        ] 
      },
      { 
        name: 'SQL-Alchemy', 
        projects: [
          { name: 'OroGenie ORM', link: 'https://orogenie.vercel.app' }
        ] 
      }
    ],
    financial: [
      { 
        name: 'Financial Modeling', 
        projects: [
          { name: 'DCF Models', link: '#' },
          { name: 'Portfolio Analysis', link: '#' }
        ] 
      },
      { 
        name: 'Valuation Analysis', 
        projects: [
          { name: 'Equity Research Project', link: '#' }
        ] 
      },
      { 
        name: 'Financial Statement Analysis', 
        projects: [
          { name: 'Case Competition', link: '#' }
        ] 
      },
      { 
        name: 'Risk Management', 
        projects: [
          { name: 'Portfolio Hedging Strategy', link: '#' }
        ] 
      },
      { 
        name: 'Bloomberg Terminal', 
        projects: [
          { name: 'Market Research', link: '#' }
        ] 
      },
      { 
        name: 'Options Trading', 
        projects: [
          { name: 'OroGenie Strategy Analysis', link: 'https://orogenie.vercel.app' }
        ] 
      },
      { 
        name: 'Portfolio Management', 
        projects: [
          { name: 'Investment Competition', link: '#' }
        ] 
      }
    ],
    languages: [
      { name: 'English (Native)', projects: [] },
      { name: 'Gujarati (Native)', projects: [] },
      { name: 'Hindi (Native)', projects: [] },
      { name: 'Spanish (Basic)', projects: [] }
    ],
    certifications: [
      { name: 'Data Build Tool Fundamentals', date: '2023', issuer: 'dbt Labs' },
      { name: 'Bloomberg Market Concepts', date: '2022', issuer: 'Bloomberg LP' }
    ]
  };

  // Function to handle project reference clicks
  const handleProjectClick = (projectLink) => {
    if (projectLink === '#') return;
    
    // Use the global function defined in Projects component to focus on a project
    if (window.focusProject) {
      window.focusProject(projectLink);
    }
  };

  return (
    <motion.section id="skills" className="skills">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h2>
      <motion.div
        className="skills-content glass"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="skills-categories">
          <div className="skills-category">
            <h3>Technical Skills</h3>
            <div className="skills-list modern">
              {skills.technical.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    {skill.projects.length > 0 && (
                      <div className="skill-projects">
                        {skill.projects.map((project, i) => (
                          <span 
                            key={i} 
                            className="project-reference"
                            onClick={() => handleProjectClick(project.link)}
                          >
                            {project.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="skills-category">
            <h3>Financial Skills</h3>
            <div className="skills-list modern">
              {skills.financial.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    {skill.projects.length > 0 && (
                      <div className="skill-projects">
                        {skill.projects.map((project, i) => (
                          <span 
                            key={i} 
                            className="project-reference"
                            onClick={() => handleProjectClick(project.link)}
                          >
                            {project.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3>Languages</h3>
            <div className="skills-list modern">
              {skills.languages.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="fluency-level">
                      {skill.name.includes('Native') ? 'Fluent' : 'Conversational'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="skills-category">
            <h3>Certifications</h3>
            <div className="certifications-list">
              {skills.certifications.map((cert, index) => (
                <motion.div 
                  key={index} 
                  className="certification-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="certification-content">
                    <h4>{cert.name}</h4>
                    <div className="certification-details">
                      <span className="certification-date">{cert.date}</span>
                      <span className="certification-issuer">• {cert.issuer}</span>
                    </div>
                  </div>
                  <div className="certification-badge">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 15l-2-2h4l-2 2z"></path>
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

// Contact Section
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus({ submitted: true, error: false });
      setFormData({ name: '', email: '', message: '' });
      
      // Add animation class to form
      e.target.classList.add('form-submitted');
      setTimeout(() => e.target.classList.remove('form-submitted'), 500);
    } else {
      setFormStatus({ submitted: false, error: true });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    // Define recipient email
    const recipientEmail = 'vrp77@scarletmail.rutgers.edu'; // Replace with your email address
    
    // Create email content
    const mailtoSubject = encodeURIComponent(`Message from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Create mailto URL
    const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <motion.section
      id="contact"
      className="contact"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="contact-form-custom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.textarea 
          name="message" 
          placeholder="Message" 
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          whileFocus={{ scale: 1.01 }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSendMessage}
        >
          Send Message
        </motion.button>
        {formStatus.submitted && (
          <motion.p 
            className="success-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thank you for your message!
          </motion.p>
        )}
        {formStatus.error && (
          <motion.p 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Please fill out all fields.
          </motion.p>
        )}
      </motion.form>
      <Footer />
    </motion.section>
  );
};

// Footer Component with enhanced macOS dock
const Footer = () => {
  const apps = [
    {
      name: 'Find My Resume',
      icon: <img src={finder} alt="Resume" loading="lazy" />,
      link: resume,
      download: true,
    },
    {
      name: 'GitHub',
      icon: <img src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png" alt="GitHub" />,
      link: 'https://github.com/vp-27',
    },
    {
      name: 'LinkedIn',
      icon: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedIn" />,
      link: 'https://www.linkedin.com/in/vandan-patel-vp/',
    },
    {
      name: 'Email',
      icon: <img src="https://thumbs.dreamstime.com/b/logo-icon-vector-logos-icons-set-social-media-flat-banner-vectors-svg-eps-jpg-jpeg-paper-texture-glossy-emblem-wallpaper-210442689.jpg" alt="Email" />,
      link: 'mailto:vrp77@scarletmail.rutgers.edu',
    },
    {
      name: 'Portfolio',
      icon: <img src="https://images.freeimages.com/fic/images/icons/2443/bunch_of_cool_bluish_icons/512/reload.png" alt="Portfolio" />,
      link: 'https://vandan-patel.vercel.app/',
    },
    {
      name: 'OroGenie',
      icon: <img src={orogenieLogo} alt="OroGenie" loading="lazy" />,
      link: 'https://orogenie.vercel.app',
    },
    {
      name: 'BluPrint',
      icon: <img src={bluPrint} alt="BluPrint" loading="lazy" />,
      link: 'https://bluprint-orpin.vercel.app',
    },
  ];

  const dockRef = useRef(null);
  const containerRef = useRef(null);
  
  // Function to handle dock magnification with adaptive background
  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    
    const dock = dockRef.current;
    const dockRect = dock.getBoundingClientRect();
    const icons = dock.querySelectorAll('.dock-icon');
    
    let hoveredIcon = null;
    
    icons.forEach(icon => {
      const iconRect = icon.getBoundingClientRect();
      const iconCenter = iconRect.left + iconRect.width / 2;
      
      // Calculate distance from mouse to center of icon
      const distanceFromMouse = Math.abs(e.clientX - iconCenter);
      // Maximum distance for magnification effect (in pixels)
      const maxDistance = 100;
      
      if (distanceFromMouse < maxDistance) {
        // Calculate scale based on proximity (closer = larger)
        const scale = 1 + 0.5 * (1 - distanceFromMouse / maxDistance);
        icon.style.transform = `scale(${scale})`;
        // Adjust z-index to bring magnified icon to front
        icon.style.zIndex = Math.floor((1 - distanceFromMouse / maxDistance) * 10);
        
        // Track the icon with the smallest distance (the one being hovered)
        if (!hoveredIcon || distanceFromMouse < hoveredIcon.distance) {
          hoveredIcon = {
            element: icon,
            distance: distanceFromMouse,
            scale: scale
          };
        }
      } else {
        // Reset scaling when mouse is far away
        icon.style.transform = 'scale(1)';
        icon.style.zIndex = 0;
        
        // Hide tooltip for non-hovered icons
        const tooltip = icon.querySelector('.mac-tooltip');
        if (tooltip) {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateY(0) translateX(-50%)';
        }
      }
    });
    
    // Show tooltip only for the closest icon to mouse cursor
    icons.forEach(icon => {
      const tooltip = icon.querySelector('.mac-tooltip');
      if (tooltip) {
        if (hoveredIcon && icon === hoveredIcon.element) {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(-10px) translateX(-50%)';
          
          // Check if tooltip extends beyond viewport edges and adjust if needed
          const tooltipRect = tooltip.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          if (tooltipRect.left < 10) {
            // Too close to left edge
            tooltip.style.left = '0';
            tooltip.style.transform = 'translateY(-10px) translateX(0)';
            // Also adjust the arrow
            const arrow = tooltip.querySelector(':after');
            if (arrow) arrow.style.left = '10px';
          } else if (tooltipRect.right > viewportWidth - 10) {
            // Too close to right edge
            tooltip.style.left = '100%';
            tooltip.style.transform = 'translateY(-10px) translateX(-100%)';
            // Also adjust the arrow
            const arrow = tooltip.querySelector(':after');
            if (arrow) arrow.style.left = 'calc(100% - 10px)';
          }
        } else {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateY(0) translateX(-50%)';
        }
      }
    });
    
    // Don't adjust the dock's height - let icons pop up instead
    // This resembles the macOS behavior more closely
  };
  
  // Reset all icons when mouse leaves the dock
  const handleMouseLeave = () => {
    if (!dockRef.current) return;
    
    const dock = dockRef.current;
    const icons = dock.querySelectorAll('.dock-icon');
    
    icons.forEach(icon => {
      icon.style.transform = 'scale(1)';
      icon.style.zIndex = 0;
      
      // Hide all tooltips
      const tooltip = icon.querySelector('.mac-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }
    });
  };

  return (
    <footer 
      className="dock-footer glass"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={dockRef}
    >
      <div className="dock-container">
        {apps.map((app, index) => (
          <motion.a
            key={index}
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-icon"
            whileTap={{ scale: .9 }}
            transition={{ type: 'spring', stiffness: 300 }}
            aria-label={app.name}
            download={app.download}
          >
            {app.icon}
            <div className="dock-reflection"></div>
            <div className="mac-tooltip">{app.name}</div>
          </motion.a>
        ))}
      </div>
    </footer>
  );
};


const WebsiteContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [hasScrolled, setHasScrolled] = useState(false);
  const websiteContentRef = useRef(null); // Reference to .website-content

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

  // Combined scroll handler for both dock and section tracking
  useEffect(() => {
    const scrollContainer = websiteContentRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      // Handle dock appearance on first scroll
      if (!hasScrolled && scrollContainer.scrollTop > 0) {
        setHasScrolled(true);
        scrollContainer.classList.add('scrolled');
      }

      // Handle section tracking
      const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2;
      const sections = ['about', 'skills', 'projects', 'leadership', 'contact'];

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    // Initial check for section tracking
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]); // Add hasScrolled to dependencies

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Handle smooth scrolling when header links are clicked
  const handleHeaderClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    const container = websiteContentRef.current;
    if (section && container) {
      const sectionTop = section.offsetTop;
      container.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="website-container">
      <div className="website-content" ref={websiteContentRef}>
        <Header 
          toggleTheme={toggleTheme} 
          darkMode={darkMode} 
          activeSection={activeSection} 
          onHeaderClick={handleHeaderClick} 
        />
        <main>
          <LandingHero />
          <About />
          <Projects />
          <Leadership />
          <Skills />
          <Contact />
        </main>
        
      </div>
    </div>
  );
};


export default WebsiteContent;