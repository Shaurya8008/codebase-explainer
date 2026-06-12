import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import { analyzeCodebase } from './lib/gemini';
import { Code2, Settings } from 'lucide-react';
import './index.css';
import './components/components.css';

function App() {
  const [appState, setAppState] = useState('upload'); // 'upload', 'loading', 'dashboard'
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(
    localStorage.getItem('gemini_api_key') || 
    import.meta.env.VITE_GEMINI_API_KEY || 
    ""
  );

  const handleFilesSelected = async (files) => {
    if (!apiKey) {
      setError("Please set your Gemini API key in the settings first.");
      setIsSettingsOpen(true);
      return;
    }
    setAppState('loading');
    setError(null);
    try {
      const result = await analyzeCodebase(files, apiKey);
      setAnalysisResult(result);
      setAppState('dashboard');
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message || "Failed to analyze codebase."}`);
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header animate-fade-in glass">
        <div className="header-left">
          <div className="logo-icon">
            <Code2 size={24} color="white" />
          </div>
          <h1 className="logo-text">Codebase<span className="text-gradient">Explainer</span></h1>
        </div>
        <button className="settings-btn" onClick={() => setIsSettingsOpen(true)}>
          <Settings size={20} />
        </button>
      </header>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50 }}>
          <div className="glass card max-w-md w-full" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Gemini API Key</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  style={{ width: '100%' }}
                />
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Your API key is stored locally in your browser.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    localStorage.setItem('gemini_api_key', apiKey);
                    setIsSettingsOpen(false);
                  }}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {appState === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="view-container"
            >
              <Hero />
              {error && (
                <div className="error-msg">
                  {error}
                </div>
              )}
              <FileUpload onFilesSelected={handleFilesSelected} />
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="view-container"
            >
              <Loader />
            </motion.div>
          )}

          {appState === 'dashboard' && analysisResult && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard result={analysisResult} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
