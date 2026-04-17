import React, { useState, useRef } from 'react';
import { parseBooxExport } from '../utils/booxParser';
import './FileUploader.css';

const DEFAULT_DICTS = [
  "AnhViet", "stardict_en_vi", "Anh - Viet", "Từ điển Anh-Việt",
  "HoNgocDuc", "Tflat", "Oxford", "Cambridge"
];

export const FileUploader = ({ onDataParsed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const [parsingDicts, setParsingDicts] = useState(DEFAULT_DICTS);
  const [selectedParsingDicts, setSelectedParsingDicts] = useState(["AnhViet", "stardict_en_vi", "Anh - Viet", "Từ điển Anh-Việt", "HoNgocDuc", "Tflat"]);
  const [newDictName, setNewDictName] = useState('');

  const handleFile = (file) => {
    setError('');
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setError('Please upload a valid text (.txt) file.');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const textContent = e.target.result;
        // Pass selectedParsingDicts to parseBooxExport
        const parsedData = parseBooxExport(textContent, selectedParsingDicts);
        if (parsedData.length === 0) {
          setError('No valid vocabulary entries found in the file.');
        } else {
          onDataParsed(parsedData);
        }
      } catch (err) {
        setError('Error parsing file: ' + err.message);
      }
    };
    reader.onerror = () => {
      setError('Error reading file.');
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const toggleParsingDict = (dict) => {
    if (selectedParsingDicts.includes(dict)) {
      setSelectedParsingDicts(prev => prev.filter(d => d !== dict));
    } else {
      setSelectedParsingDicts(prev => [...prev, dict]);
    }
  };

  const addCustomDict = () => {
    const trimmed = newDictName.trim();
    if (trimmed && !parsingDicts.includes(trimmed)) {
      setParsingDicts(prev => [...prev, trimmed]);
      setSelectedParsingDicts(prev => [...prev, trimmed]);
      setNewDictName('');
    }
  };

  return (
    <div className="uploader-container">
      <div className="parser-config-section glass-panel" style={{ marginBottom: '24px', padding: '24px', textAlign: 'left' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.2rem' }}>🔧 Dictionary Parsing Helper</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Select the dictionary names below that appear in your BOOX export file. 
          The parser will use these exact names to split your vocabulary words from their definitions.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          {parsingDicts.map(dict => (
            <label key={dict} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--surface-color)', padding: '6px 12px', borderRadius: '16px', cursor: 'pointer', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
              <input 
                type="checkbox" 
                checked={selectedParsingDicts.includes(dict)}
                onChange={() => toggleParsingDict(dict)}
              />
              {dict}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            placeholder="Add custom dictionary name..." 
            value={newDictName}
            onChange={(e) => setNewDictName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomDict()}
            className="search-input"
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', flex: 1 }}
          />
          <button 
            type="button" 
            onClick={addCustomDict}
            className="action-btn"
            style={{ padding: '8px 16px', borderRadius: '8px', background: 'var(--primary-color)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '500' }}
          >
            Add
          </button>
        </div>
      </div>

      <div 
        className={`upload-zone glass-panel ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          type="file" 
          accept=".txt" 
          ref={fileInputRef} 
          onChange={handleFileInput} 
          style={{ display: 'none' }} 
        />
        
        <div className="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        
        <h3 className="upload-title">Upload Vocabulary File</h3>
        <p className="upload-subtitle">Drag & drop your Boox export (.txt) here, or click to select</p>
        
        {fileName && !error && (
          <div className="upload-success">
            <span className="file-name">{fileName}</span> loaded successfully!
          </div>
        )}
        
        {error && (
          <div className="upload-error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
