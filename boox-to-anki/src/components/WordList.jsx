import React, { useState } from 'react';
import './WordList.css';

const WordCard = ({ word, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...word });

  const handleSave = () => {
    onUpdate(word.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...word });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="word-card">
        <div className="edit-form">
          <input 
            className="edit-input"
            value={editData.word}
            onChange={(e) => setEditData({...editData, word: e.target.value})}
            placeholder="Word"
          />
          <input 
            className="edit-input"
            value={editData.dictionary}
            onChange={(e) => setEditData({...editData, dictionary: e.target.value})}
            placeholder="Dictionary Source"
          />
          <textarea 
            className="edit-textarea"
            value={editData.definition}
            onChange={(e) => setEditData({...editData, definition: e.target.value})}
            placeholder="Definition"
          />
          <div className="edit-actions">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-save" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="word-card glass-panel animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '20px' }}>
        <div className="word-card-header">
          <div>
            <h4 className="word-title">{word.word}</h4>
            <span className="word-dict">{word.dictionary}</span>
          </div>
          <div className="word-actions">
            <button className="action-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="action-btn delete" onClick={() => onDelete(word.id)}>Delete</button>
          </div>
        </div>
        <div className="word-definition">
          {word.definition || <span style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>No definition</span>}
        </div>
      </div>
    </div>
  );
};

export const WordList = ({ words, onWordUpdate, onWordDelete, onWordAdd }) => {
  if (!words || words.length === 0) {
    return (
      <div className="word-list-container">
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No words to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="word-list-container">
      <div className="word-list-header">
        <h3>Preview Flashcards ({words.length})</h3>
        <button className="add-word-btn" onClick={onWordAdd}>+ Add Word</button>
      </div>
      
      <div className="word-cards">
        {words.map((word) => (
          <WordCard 
            key={word.id} 
            word={word} 
            onUpdate={onWordUpdate} 
            onDelete={onWordDelete} 
          />
        ))}
      </div>
    </div>
  );
};
