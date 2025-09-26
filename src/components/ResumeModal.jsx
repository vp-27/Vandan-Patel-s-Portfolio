import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './ResumeModal.css';

const ResumeModal = ({ isOpen, onClose, onSelectResume }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check current theme
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDarkMode(currentTheme === 'dark');

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          setIsDarkMode(newTheme === 'dark');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleResumeSelect = (resumeType) => {
    onSelectResume(resumeType);
    onClose();
  };

  const handleKeyDown = (e, resumeType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleResumeSelect(resumeType);
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`resume-modal-backdrop ${isDarkMode ? 'dark' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="resume-modal-content"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="resume-modal-header">
              <h2>View Resume</h2>
              <button 
                className="resume-modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="resume-modal-body">
              
              <div className="resume-options">
                <motion.button
                  className="resume-option cs-option"
                  onClick={() => handleResumeSelect('cs')}
                  onKeyDown={(e) => handleKeyDown(e, 'cs')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  aria-label="Download Computer Science resume"
                  type="button"
                >
                  <div className="resume-option-icon cs-icon" aria-hidden="true"></div>
                  <div className="resume-option-content">
                    <h3>SWE</h3>
                  </div>
                </motion.button>

                <motion.button
                  className="resume-option finance-option"
                  onClick={() => handleResumeSelect('finance')}
                  onKeyDown={(e) => handleKeyDown(e, 'finance')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  aria-label="Download Finance resume"
                  type="button"
                >
                  <div className="resume-option-icon finance-icon" aria-hidden="true"></div>
                  <div className="resume-option-content">
                    <h3>Investments</h3>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;