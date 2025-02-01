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
  <motion.header className="header" layoutId="header">
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


// Hero Section
const Hero = () => {
  return (
    <motion.section className="hero">
      {/* <div className="parallax-background"></div> */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1 }} // Added delay of 2 seconds
      >
        <h1>Vandan Patel</h1>
        <h2>Full-Stack Developer | UI/UX Designer</h2>
        <p>"Everything's a passion project"</p>
        <motion.a
          href="#about"
          className="cta-button"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById('about');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          Learn More <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

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
      'Python (Financial Modeling)',
      'React',
      'SQL',
      'Flask',
      'JavaScript',
      'HTML/CSS',
      'Excel (VBA)',
      'Git',
      'JWT',
      'WebSockets',
      'Selenium',
      'SQL-Alchemy'
    ],
    financial: [
      'Financial Modeling',
      'Valuation Analysis',
      'Financial Statement Analysis',
      'Risk Management',
      'Bloomberg Terminal',
      'Options Trading',
      'Portfolio Management'
    ],
    languages: [
      'English (Native)',
      'Gujarati (Native)',
      'Hindi (Native)',
      'Spanish (Basic)'
    ],
    certifications: [
      'Data Build Tool Fundamentals',
      'Bloomberg Market Concepts'
    ]
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
            <ul className="skills-list">
              {skills.technical.map((skill, index) => (
                <li key={index} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="skills-category">
            <h3>Financial Skills</h3>
            <ul className="skills-list">
              {skills.financial.map((skill, index) => (
                <li key={index} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="skills-category">
            <h3>Languages</h3>
            <ul className="skills-list">
              {skills.languages.map((skill, index) => (
                <li key={index} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="skills-category">
            <h3>Certifications</h3>
            <ul className="skills-list">
              {skills.certifications.map((skill, index) => (
                <li key={index} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple form validation
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      console.log("Form submitted:", formData);
      setFormStatus({ submitted: true, error: false });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setFormStatus({ submitted: false, error: true });
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2 }}
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="contact-form contact-form-custom"
      >
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange}
          required 
          aria-label="Name"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
          aria-label="Email"
        />
        <textarea 
          name="message" 
          placeholder="Message" 
          value={formData.message}
          onChange={handleChange}
          required 
          aria-label="Message"
        ></textarea>
        <motion.button
          type="submit"
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          Send Message
        </motion.button>
        {formStatus.submitted && <p className="success-message">Thank you for your message!</p>}
        {formStatus.error && <p className="error-message">Please fill out all fields.</p>}
      </motion.form>
      <Footer />
    </motion.section>
  );
};

// Footer Component remains unchanged
const Footer = () => {
  const apps = [
    {
      name: '\"Find\" My Resume ',
      icon: <img src={finder} alt="Resume" loading="lazy" />,
      link: resume, // Use the imported resume path
      download: true, // This attribute makes it a download link
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
    
    // Add more app icons as needed
  ];

  

  return (
    <footer className="dock-footer glass">
      <div className="dock-container">
        {apps.map((app, index) => (
          <motion.a
            key={index}
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className="dock-icon"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: .9 }}
            transition={{ type: 'spring', stiffness: 90 }}
            aria-label={app.name}
          >
            {app.icon}
            <span className="tooltip">{app.name}</span>
          </motion.a>
        ))}
      </div>
    </footer>
  );
};


const WebsiteContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
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

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Scroll event listener to update active section
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'leadership', 'contact'];
    const scrollContainer = websiteContentRef.current;

    const handleScroll = () => {
      const scrollPosition = scrollContainer.scrollTop + window.innerHeight / 2;

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

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
          <Hero />
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