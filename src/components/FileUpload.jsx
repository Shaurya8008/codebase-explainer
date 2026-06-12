import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FolderOpen } from 'lucide-react';
import './components.css';

const FileUpload = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Note: webkitdirectory via drag and drop can be tricky, 
    // but we can try to get the files. For MVP, we rely heavily on the click to upload folder.
    if (e.dataTransfer.items) {
      // Basic fallback
      const files = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          files.push(file);
        }
      }
      if (files.length > 0) {
        await processFiles(files);
      }
    }
  };

  const processFiles = async (fileList) => {
    const validFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Skip node_modules, .git, images, etc.
      if (
        file.webkitRelativePath.includes('node_modules') ||
        file.webkitRelativePath.includes('.git') ||
        file.webkitRelativePath.includes('.next') ||
        file.webkitRelativePath.includes('dist') ||
        file.type.startsWith('image/') ||
        file.type.startsWith('video/')
      ) {
        continue;
      }
      
      const text = await readFileAsText(file);
      validFiles.push({
        path: file.webkitRelativePath || file.name,
        content: text,
      });
    }
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    } else {
      alert("No valid text/code files found in the selected folder.");
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsText(file);
    });
  };

  return (
    <motion.div 
      className={`upload-area glass card ${isDragging ? 'drag-active' : ''}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        webkitdirectory="true"
        directory="true"
      />
      <div className="upload-icon-container">
        <FolderOpen size={48} className="upload-icon" />
        <UploadCloud size={24} className="upload-icon-small" />
      </div>
      <h3 className="upload-title">Select a Codebase Folder</h3>
      <p className="upload-subtitle">Click to browse or drag & drop</p>
    </motion.div>
  );
};

export default FileUpload;
