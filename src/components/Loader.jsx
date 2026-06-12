import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import './components.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="loader-icon-wrapper"
      >
        <div className="loader-ring"></div>
        <Cpu size={40} className="loader-icon" />
      </motion.div>
      <motion.h3 
        className="loader-text"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Analyzing Codebase...
      </motion.h3>
      <p className="loader-subtext">The AI is reading through the files and translating them to plain English.</p>
    </div>
  );
};

export default Loader;
