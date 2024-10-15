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
        role: "Taekwondo Black Belt + Class Leader",
        description: (
            <ul style={{ textAlign: 'left' }}>
                <li>Led classes for students of all ages and skill levels, including those with learning difficulties, by adapting teaching methods</li>
                <li>Achieved 100% trial student return rate by implementing personalized learning techniques and enhancing client retention strategies, resulting in a 30% increase in client acquisition and revenue growth</li>
            </ul>
        ),
        icon: "🥋"
    },
    {
        role: "HackRU Project Lead",
        description: (
            <ul style={{ textAlign: 'left' }}>
                <li>
                Coordinated team efforts and delegated tasks effectively, ensuring timely completion of the project focusing on finding events on university campus and fostered a collaborative environment that enhanced overall team performance throughout the event
                </li>
                <li>
                    Oversaw all phases of the project from initial design to deployment, which reinforced team progress towards the deadline
                </li>
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
        Leadership
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