import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';

// Component for individual project card
const ProjectCard = ({ project, isExpanded, onExpand, onClose }) => {
  const cardRef = useRef(null);

  // Effect to handle clicks outside the expanded card to close it
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
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.1, layout: { duration: 0.1, type: "spring" } }}
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
      image: "https://i.ytimg.com/vi/BfEcLruyksE/sddefault.jpg",
      link: "https://ecommerce-demo.com",
      github: "https://github.com/johndoe/ecommerce-platform",
      technologies: ["React", "Flask", "Selenium", "SQL-Alchemy", "JWT", "TradingView Widget API", "CSS", "ReCharts"]
    },
    {
      title: "Task Management App",
      description: "A collaborative task manager designed for teams. Features include real-time updates, task assignment, progress tracking, and team chat functionality.",
      image: "/path/to/taskmanager-image.jpg",
      link: "https://taskmanager-demo.com",
      github: "https://github.com/johndoe/task-management-app",
      technologies: ["Vue.js", "Firebase", "Vuex", "Element UI"]
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather application providing location-based forecasts, historical weather data, and severe weather alerts. Utilizes multiple weather APIs for accurate and up-to-date information.",
      image: "/path/to/weather-image.jpg",
      link: "https://weather-dashboard.com",
      github: "https://github.com/johndoe/weather-dashboard",
      technologies: ["React", "Redux", "OpenWeatherMap API", "Chart.js"]
    },
  ];

  // Effect to handle mouse leave event to collapse expanded project card
  useEffect(() => {
    let timer;
    const handleMouseLeave = () => {
      timer = setTimeout(() => {
        setExpandedProject(null);
      }, 2000);
    };

    if (projectsRef.current) {
      projectsRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (projectsRef.current) {
        projectsRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      clearTimeout(timer);
    };
  }, []);

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
        <motion.div layout className={`project-grid ${expandedProject !== null ? 'expanded' : ''}`}>
          <AnimatePresence>
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.title}
                project={project}
                isExpanded={expandedProject === index}
                onExpand={() => setExpandedProject(index)}
                onClose={() => setExpandedProject(null)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.section>
  );
};

export default Projects;