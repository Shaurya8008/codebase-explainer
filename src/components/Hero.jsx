import { motion } from 'framer-motion';
import './components.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="hero-badge glass"
      >
        ✨ AI-Powered Codebase Analysis
      </motion.div>
      
      <motion.h1 
        className="hero-title"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Understand any codebase in <br/>
        <span className="text-gradient">Plain English</span>
      </motion.h1>
      
      <motion.p 
        className="hero-subtitle"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Upload a folder and our AI will break down what it does, how it works, 
        and its key features—so anyone can understand it, no coding required.
      </motion.p>
    </div>
  );
};

export default Hero;
