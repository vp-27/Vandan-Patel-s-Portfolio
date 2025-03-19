import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import bluPrintImage from '../images/bluPrintShot.png';
import orogenieImage from '../images/orogenieShot.png';
import personalWebsiteImage from '../images/personalWebsiteShot.png';

// Component for individual project card
const ProjectCard = ({ project, index, isFocused, onFocus }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    // Scroll into view with smooth behavior when focused
    if (isFocused && cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
      // Auto-trigger hover state when focused
      setIsHovered(true);
      // Reset focus after animation completes
      const timer = setTimeout(() => {
        onFocus(null);
      }, 5000); // Keep highlighted for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isFocused, onFocus]);

  // Create separate state for overlay buttons to prevent glitching
  const [buttonsVisible, setButtonsVisible] = useState(false);
  
  // Use effect to delay the button visibility change
  useEffect(() => {
    let timer;
    if (isHovered) {
      // Small delay before showing buttons
      timer = setTimeout(() => setButtonsVisible(true), 100);
    } else {
      // Hide buttons immediately when not hovered
      setButtonsVisible(false);
    }
    
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <motion.div 
      ref={cardRef}
      className={`project-card ${isFocused ? 'focused-card' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isFocused && setIsHovered(false)}
      layout
      animate={{ 
        height: isHovered || isFocused ? "auto" : "400px",
        scale: isFocused ? 1.03 : 1,
        boxShadow: isFocused 
          ? "0 25px 50px rgba(0, 0, 0, 0.2)" 
          : "0 10px 30px rgba(0, 0, 0, 0.12)",
        transition: { 
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          layout: { duration: 0.6 }
        }
      }}
    >
      <motion.div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
        <motion.div
          className="project-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {(isHovered || isFocused) && (
            <>
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: buttonsVisible ? 1 : 0, y: buttonsVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={24} />
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-github"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: buttonsVisible ? 1 : 0, y: buttonsVisible ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={24} />
              </motion.a>
            </>
          )}
        </motion.div>
      </motion.div>
      <motion.div 
        className="project-content"
        layout
        animate={{ 
          height: isHovered || isFocused ? "auto" : "180px",
          transition: { 
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }
        }}
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <motion.div 
          initial={false}
          animate={{ 
            opacity: isHovered || isFocused ? 1 : 0,
            height: isHovered || isFocused ? "auto" : 0,
            transition: {
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 0.3 }
            }
          }}
        >
          <div className="technologies">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-chip">{tech}</span>
            ))}
          </div>
          <div className="project-links">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Projects component
const Projects = () => {
  const [focusedProject, setFocusedProject] = useState(null);
  const projectsRef = useRef(null);

  // List of projects
  const projects = [
    {
      id: "orogenie",
      title: "OroGenie Trading Platform",
      description: "A comprehensive online store with secure payment processing and real-time inventory management. This platform offers a seamless shopping experience for customers and powerful tools for store owners.",
      image: orogenieImage,
      link: "https://orogenie.vercel.app",
      github: "https://github.com/vp-27/OroGenie",
      technologies: ["React", "Flask", "Selenium", "SQL-Alchemy", "JWT", "TradingView Widget API", "CSS", "ReCharts"]
    },
    {
      id: "bluprint",
      title: "BluPrint - Room Organizer",
      description: "Developed a web-based room organization tool combining visual design with inventory management. BluPrint features an interactive canvas for room layouts, customizable storage boxes, and Excel import/export functionality. Built entirely through frontend React with data handling through XLSX file creation.",
      image: bluPrintImage,
      link: "https://bluprint-orpin.vercel.app",
      github: "https://github.com/vp-27/BluPrint",
      technologies: ["Framer Motion", "React", "HTML", "CSS", "XLSX", "JavaScript"]
    },
    {
      id: "personal-website",
      title: "iPhone-Style Personal Website",
      description: "You're looking at it! This website was designed to mimic the iOS home screen, complete with app icons and a dynamic wallpaper, but with a twist. It actually doubles as a personal website, showcasing my achievements! The site is built with React and Framer Motion for animations.",
      image: personalWebsiteImage,
      link: "https://vandan-patel.vercel.app/",
      github: "https://github.com/vp-27/Vandan-Patel-s-Portfolio",
      technologies: ["React", "Framer-Motion", "HTML", "CSS", "JavaScript"]
    },
  ];

  // Function to be called from WebsiteContent.jsx to focus a specific project
  window.focusProject = (projectId) => {
    // Scroll to projects section first
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      // Then focus on specific project after scrolling
      setTimeout(() => {
        setFocusedProject(projectId);
      }, 500);
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="projects"
      ref={projectsRef}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <LayoutGroup>
        <motion.div layout className="project-grid">
          <AnimatePresence>
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                isFocused={focusedProject === project.id}
                onFocus={setFocusedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.section>
  );
};

export default Projects;
