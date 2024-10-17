import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import bluPrintImage from '../images/bluPrintShot.png';
import orogenieImage from '../images/orogenieShot.png';
import personalWebsiteImage from '../images/personalWebsiteShot.png';

// Component for individual project card
const ProjectCard = ({ project, isExpanded, onExpand, onClose, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, onClose]);

  return (
    <motion.div 
      ref={cardRef}
      layout
      className={`project-card ${isExpanded ? 'expanded' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        zIndex: isExpanded ? 10 : 0
      }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onClick={() => !isExpanded && onExpand()}
    >
      <motion.div layout="position" className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
        {!isExpanded && (
          <motion.div
            className="project-overlay"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={24} />
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-github"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
          </motion.div>
        )}
      </motion.div>
      <motion.div layout="position" className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
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
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
            </div>
          </motion.div>
        )}
      </motion.div>
      {isExpanded && (
        <motion.button 
          className="close-button" 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <X size={24} />
        </motion.button>
      )}
    </motion.div>
  );
};

// Main Projects component
const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const projectsRef = useRef(null);

  // List of projects
  const projects = [
    {
      title: "OroGenie Trading Platform",
      description: "A comprehensive online store with secure payment processing and real-time inventory management. This platform offers a seamless shopping experience for customers and powerful tools for store owners.",
      image: orogenieImage,
      link: "https://orogenie.vercel.app",
      github: "https://github.com/vp-27/OroGenie",
      technologies: ["React", "Flask", "Selenium", "SQL-Alchemy", "JWT", "TradingView Widget API", "CSS", "ReCharts"]
    },
    {
      title: "BluPrint - Room Organizer",
      description: "Developed a web-based room organization tool combining visual design with inventory management. BluPrint features an interactive canvas for room layouts, customizable storage boxes, and Excel import/export functionality. Built entirely through frontend React with data handling through XLSX file creation.",
      image: bluPrintImage,
      link: "https://bluprint-orpin.vercel.app",
      github: "https://github.com/vp-27/BluPrint",
      technologies: ["Framer Motion", "React", "HTML", "CSS", "XLSX", "JavaScript"]
    },
    {
      title: "iPhone-Style Personal Website",
      description: "You're looking at it! This website was designed to mimic the iOS home screen, complete with app icons and a dynamic wallpaper, but with a twist. It actually doubles as a personal website, showcasing my achievements! The site is built with React and Framer Motion for animations.",
      image: personalWebsiteImage,
      link: "https://vandan-patel.vercel.app/",
      github: "https://github.com/vp-27/Vandan-Patel-s-Portfolio",
      technologies: ["React", "Framer-Motion", "HTML", "CSS", "JavaScript"]
    },
  ];

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
        <motion.div layout className={`project-grid ${expandedProject !== null ? 'focused' : ''}`}>
          <AnimatePresence>
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title}
                project={project}
                isExpanded={expandedProject === index}
                onExpand={() => setExpandedProject(index)}
                onClose={() => setExpandedProject(null)}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.section>
  );
};

export default Projects;
