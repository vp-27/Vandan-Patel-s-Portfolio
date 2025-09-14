import React from 'react';
import { motion } from 'framer-motion';
import profileImage from '../images/pfp.png';

const About = () => {
  return (
    <motion.section
      id="about"
      className="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      <div className="about-content">
        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={profileImage} alt="Vandan Patel" />
        </motion.div>

        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            Hi! I'm Vandan Patel, a passionate Full-Stack Developer and Financial Analyst based in New Jersey.
            My journey in technology began with a curiosity about how things work, which led me to pursue
            Computer Science at Rutgers University.
          </p>

          <p>
            When I'm not coding, you'll find me analyzing financial markets, practicing Taekwondo (where I earned
            my black belt), or working on innovative projects that combine my technical skills with real-world
            problem-solving. I believe in creating solutions that not only work well but also provide exceptional
            user experiences.
          </p>

          <p>
            My approach to development is holistic - I enjoy working across the full stack, from crafting
            beautiful user interfaces to building robust backend systems. I'm always excited to take on new
            challenges and learn cutting-edge technologies.
          </p>

          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
