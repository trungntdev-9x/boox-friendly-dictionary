import React, { useState } from 'react';
import { generateCSV, generateTXT, downloadFile } from '../utils/exportAnki';

export const ExportPanel = ({ words }) => {
  const [format, setFormat] = useState('txt');

  const handleExport = () => {
    if (words.length === 0) {
      alert("No words to export.");
      return;
    }

    if (format === 'csv') {
      const content = generateCSV(words);
      downloadFile(content, 'boox_export.csv', 'text/csv');
    } else {
      const content = generateTXT(words);
      downloadFile(content, 'boox_export.txt', 'text/plain');
    }
  };

  if (words.length === 0) return null;

  return (
    <div className="card glass-panel" style={{ marginTop: '24px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
      <div style={{ flex: '1', minWidth: '200px' }}>
        <h3 className="text-gradient" style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: '800' }}>Ready to Export</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '500' }}>
          ✨ {words.length} flashcards organized and ready
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="fancy-select"
        >
          <option value="txt">TXT (Key-Value)</option>
          <option value="csv">Standard CSV</option>
        </select>

        <button className="btn-primary" onClick={handleExport}>
          Download File
        </button>
      </div>
    </div>
  );
};
