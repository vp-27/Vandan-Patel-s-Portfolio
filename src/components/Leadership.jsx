import React from 'react';
import { motion } from 'framer-motion';

const LeadershipCard = ({ role, description, icon }) => {
  return (
    <motion.div 
      className="leadership-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="leadership-icon">{icon}</div>
      <h3>{role}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

const Leadership = () => {
  const leadershipRoles = [
    {
      role: "Bender Trust Project - Financial Manager",
      description: (
        <ul style={{ textAlign: 'left' }}>
          <li>Built bottom-up income statement model including scenario analysis and market trends, projecting 5-year growth trajectories</li>
          <li>Presented findings to industry professionals, showcasing analysis of investment risks and mitigation strategies for Ryanair</li>
          <li>Gained hands-on experience in financial modeling, industry research, and cohesive group collaboration under tight deadlines</li>
          <li>Led a team of 4 in analyzing financial statements, market conditions, and competitor data to develop investment strategies</li>
        </ul>
      ),
      icon: "📊"
    },
    {
      role: "Taekwondo Black Belt + Class Leader",
      description: (
        <ul style={{ textAlign: 'left' }}>
          <li>Led classes for students of all ages and skill levels, including those with learning difficulties, by adapting teaching methods</li>
          <li>Achieved 100% trial student return rate by implementing personalized learning techniques and enhancing client retention strategies</li>
          <li>Managed and mentored a group of 20+ students, developing their technical skills and fostering discipline and confidence</li>
        </ul>
      ),
      icon: "🥋"
    },
    {
      role: "HackRU Project Lead",
      description: (
        <ul style={{ textAlign: 'left' }}>
          <li>Directed a team of developers in creating an innovative campus event discovery platform</li>
          <li>Implemented agile methodologies to manage project timelines and deliverables effectively</li>
          <li>Coordinated cross-functional collaboration between UI/UX designers and backend developers</li>
          <li>Successfully delivered a working prototype within the 24-hour hackathon deadline</li>
        </ul>
      ),
      icon: "💻"
    }
  ];

  return (
    <motion.section 
      id="leadership" 
      className="leadership"
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
        Leadership & Competitions
      </motion.h2>
      <div className="leadership-grid">
        {leadershipRoles.map((role, index) => (
          <LeadershipCard 
            key={index}
            role={role.role}
            description={role.description}
            icon={role.icon}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Leadership;