/**
 * Parses BOOX vocabulary export file content.
 * 
 * BOOX export files typically follow this structure:
 * 
 * Word
 * Dictionary Name
 * Definition line 1
 * Definition line 2
 * -------------------------
 * Word 2
 * Dictionary 2
 * Definition
 * -------------------------
 * 
 * @param {string} textContent The raw text from the BOOX export file.
 * @param {Array<string>} parsingDictionaries Optional array of specific dictionary names to use as delimiters. 
 * @returns {Array<{word: string, dictionary: string, definition: string}>} Array of parsed word objects.
 */
export const parseBooxExport = (textContent, parsingDictionaries = []) => {
  if (!textContent || typeof textContent !== 'string') return [];

  // Normalize line endings to \n
  const normalizedText = textContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Split by the separator or double structural blank lines
  // The standard BOOX separator often contains multiple dashes
  const entries = normalizedText.split(/^-{5,}$/gm).filter(entry => entry.trim() !== '');

  const words = [];

  for (const entry of entries) {
    let lines = entry.split('\n').map(line => line.trim()).filter(line => line !== '');
    
    // Pre-clean: Check for known header lines or date formats inside the chunk
    // This removes titles like "Công cụ học từ mới BOOX", "Vocabulary Builder", etc.
    if (lines.length > 0 && lines[0].match(/Công cụ học từ mới BOOX|Vocabulary Builder|BOOX Vocabulary|Vocabulary List/i)) {
      lines.shift();
    }
    // This removes timestamps like "2026-04-17_10_19_59" or "2023-10-15 08:30"
    if (lines.length > 0 && lines[0].match(/^\d{4}-\d{2}-\d{2}[_ ]\d{2}[:_]\d{2}(?:[:_]\d{2})?$/)) {
      lines.shift();
    }

    // Skip empty chunks after cleaning
    if (lines.length === 0) continue;

    // Use selected dictionaries to find the boundary
    let dictIndex = -1;
    if (parsingDictionaries && parsingDictionaries.length > 0) {
      const lowerDicts = parsingDictionaries.map(d => d.toLowerCase());
      dictIndex = lines.findIndex(line => lowerDicts.includes(line.toLowerCase()));
    }

    // Fallback: assume the second line (index 1) is the dictionary
    if (dictIndex === -1 && lines.length >= 2) {
      dictIndex = 1;
    }

    if (dictIndex > 0) {
      const word = lines.slice(0, dictIndex).join(' ');
      const dictionary = lines[dictIndex];
      const definition = lines.slice(dictIndex + 1).join('\n');
      
      words.push({ word, dictionary, definition });
    } else if (lines.length === 1) {
      // Just the word
      words.push({ word: lines[0], dictionary: 'Unknown', definition: '' });
    } else if (dictIndex === 0) {
      // Edge case: dictionary name is at index 0 (word missing?)
      words.push({ word: 'Missing Word', dictionary: lines[0], definition: lines.slice(1).join('\n') });
    }
  }

  return words;
};
