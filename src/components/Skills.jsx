import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillsData = {
    "Frontend Development": [
      { name: "React", level: "Advanced", projects: ["Personal Website", "BluPrint", "OroGenie"] },
      { name: "JavaScript", level: "Advanced", projects: ["All Projects"] },
      { name: "HTML/CSS", level: "Advanced", projects: ["All Projects"] },
      { name: "Framer Motion", level: "Intermediate", projects: ["Personal Website", "BluPrint"] }
    ],
    "Backend Development": [
      { name: "Flask", level: "Intermediate", projects: ["OroGenie"] },
      { name: "SQL-Alchemy", level: "Intermediate", projects: ["OroGenie"] },
      { name: "JWT Authentication", level: "Intermediate", projects: ["OroGenie"] }
    ],
    "Tools & Technologies": [
      { name: "Git/GitHub", level: "Advanced", projects: ["All Projects"] },
      { name: "VS Code", level: "Advanced", projects: ["All Projects"] },
      { name: "Figma", level: "Intermediate", projects: ["UI/UX Design"] },
      { name: "TradingView API", level: "Intermediate", projects: ["OroGenie"] }
    ],
    "Certifications": [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2024" },
      { name: "Google Analytics Certified", issuer: "Google", date: "2023" }
    ]
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="skill-header">
        <div className="skill-name">{skill.name}</div>
        <div className="fluency-level">{skill.level}</div>
      </div>
      {skill.projects && (
        <div className="skill-projects">
          {skill.projects.map((project, idx) => (
            <span key={idx} className="project-reference">{project}</span>
          ))}
        </div>
      )}
    </motion.div>
  );

  const CertificationCard = ({ cert, index }) => (
    <motion.div
      className="certification-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="certification-content">
        <h4>{cert.name}</h4>
        <div className="certification-details">
          <span className="certification-issuer">{cert.issuer}</span>
          <span className="certification-date">{cert.date}</span>
        </div>
      </div>
      <div className="certification-badge">✓</div>
    </motion.div>
  );

  return (
    <motion.section
      id="skills"
      className="skills"
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
        Skills & Expertise
      </motion.h2>

      <div className="skills-content">
        <div className="skills-categories">
          {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <h3>{category}</h3>
              {category === "Certifications" ? (
                <div className="certifications-list">
                  {skills.map((cert, index) => (
                    <CertificationCard key={index} cert={cert} index={index} />
                  ))}
                </div>
              ) : (
                <div className="skills-list modern">
                  {skills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
