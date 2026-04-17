import React from 'react';
import './DictionarySelector.css';

export const DictionarySelector = ({ dictionaries, selectedDictionaries, onChange }) => {
  if (!dictionaries || dictionaries.length === 0) return null;

  const toggleDictionary = (dict) => {
    if (selectedDictionaries.includes(dict)) {
      onChange(selectedDictionaries.filter(d => d !== dict));
    } else {
      onChange([...selectedDictionaries, dict]);
    }
  };

  return (
    <div className="dictionary-selector glass-panel" style={{ padding: '24px' }}>
      <h3>Filter by Dictionary Source</h3>
      <div className="tags-container">
        {dictionaries.map((dict, idx) => {
          const isActive = selectedDictionaries.includes(dict);
          return (
            <div 
              key={idx} 
              className={`dictionary-tag ${isActive ? 'active' : ''}`}
              onClick={() => toggleDictionary(dict)}
            >
              {dict}
            </div>
          );
        })}
      </div>
    </div>
  );
};
