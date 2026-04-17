import { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FileUploader } from './components/FileUploader'
import { DictionarySelector } from './components/DictionarySelector'
import { WordList } from './components/WordList'
import { ExportPanel } from './components/ExportPanel'
import './App.css'

function App() {
  const [parsedWords, setParsedWords] = useState([])
  const [selectedDictionaries, setSelectedDictionaries] = useState([])

  const handleDataParsed = (words) => {
    // Add unique ID to each word for editing/deleting
    const wordsWithIds = words.map(w => ({ ...w, id: uuidv4() }))
    setParsedWords(wordsWithIds)
    
    // Auto-select all dictionaries initially
    const uniqueDicts = [...new Set(wordsWithIds.map(w => w.dictionary))]
    setSelectedDictionaries(uniqueDicts)
    
    console.log("Parsed words:", wordsWithIds)
  }

  // Derived state
  const availableDictionaries = useMemo(() => {
    return [...new Set(parsedWords.map(w => w.dictionary))]
  }, [parsedWords]);

  const filteredWords = useMemo(() => {
    return parsedWords.filter(w => selectedDictionaries.includes(w.dictionary))
  }, [parsedWords, selectedDictionaries]);

  // Handlers
  const handleWordUpdate = (id, updatedWord) => {
    setParsedWords(prev => prev.map(w => w.id === id ? updatedWord : w));
  };

  const handleWordDelete = (id) => {
    setParsedWords(prev => prev.filter(w => w.id !== id));
  };

  const handleWordAdd = () => {
    const newWord = {
      id: uuidv4(),
      word: '',
      dictionary: selectedDictionaries.length > 0 ? selectedDictionaries[0] : 'Manual Entry',
      definition: ''
    };
    setParsedWords([newWord, ...parsedWords]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="text-gradient">Boox dictionary formatter</h1>
        <p>Convert your e-reader dictionary lookups into powerful flashcards</p>
      </header>
      
      <main className="main-content">
        <div className="animate-fade-in" style={{ marginBottom: '32px' }}>
          <FileUploader onDataParsed={handleDataParsed} />
        </div>
        
        {parsedWords.length > 0 && (
          <>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <DictionarySelector 
                dictionaries={availableDictionaries}
                selectedDictionaries={selectedDictionaries}
                onChange={setSelectedDictionaries}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <WordList 
                words={filteredWords}
                onWordUpdate={handleWordUpdate}
                onWordDelete={handleWordDelete}
                onWordAdd={handleWordAdd}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <ExportPanel words={filteredWords} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default App
