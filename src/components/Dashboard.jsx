import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Layers, Cpu, FileText } from 'lucide-react';
import './components.css';

const Dashboard = ({ result, onReset }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button className="btn btn-secondary" onClick={onReset}>
          <ArrowLeft size={18} />
          Analyze Another
        </button>
      </div>

      <motion.div 
        className="dashboard-content"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Title & Big Picture */}
        <motion.div variants={itemVariants} className="card glass col-span-2 primary-card">
          <h2 className="dashboard-title text-gradient">{result.title}</h2>
          <p className="dashboard-big-picture">{result.bigPicture}</p>
        </motion.div>

        {/* Features */}
        <motion.div variants={itemVariants} className="card glass flex-col">
          <div className="card-header">
            <div className="icon-badge green"><CheckCircle2 size={24} /></div>
            <h3>Key Features</h3>
          </div>
          <ul className="feature-list">
            {result.features?.map((feature, i) => (
              <li key={i}><span className="bullet"></span> {feature}</li>
            ))}
          </ul>
        </motion.div>

        {/* Architecture */}
        <motion.div variants={itemVariants} className="card glass flex-col">
          <div className="card-header">
            <div className="icon-badge purple"><Layers size={24} /></div>
            <h3>How it Works</h3>
          </div>
          <div className="architecture-content">
            <Cpu size={32} className="arch-icon" />
            <p>{result.architecture}</p>
          </div>
        </motion.div>

        {/* Key Components */}
        <motion.div variants={itemVariants} className="card glass col-span-2">
          <div className="card-header">
            <div className="icon-badge blue"><FileText size={24} /></div>
            <h3>Key Parts Explained</h3>
          </div>
          <div className="components-grid">
            {result.keyComponents?.map((comp, i) => (
              <div key={i} className="component-item glass">
                <h4>{comp.name}</h4>
                <p>{comp.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
