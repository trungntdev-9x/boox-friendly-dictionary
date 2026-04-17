export const generateCSV = (words) => {
  // Simple CSV generation: word, definition, dictionary
  // Fields with quotes or commas need to be wrapped in quotes
  const escapeCSV = (field) => {
    if (field === undefined || field === null) return '';
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = words.map(w => 
    `${escapeCSV(w.word)},${escapeCSV(w.definition)},${escapeCSV(w.dictionary)}`
  ).join('\n');

  return rows;
};

export const generateTXT = (words) => {
  // Tab-separated values, which Anki handles well for TXT
  const escapeTXT = (field) => {
    if (field === undefined || field === null) return '';
    return String(field).replace(/\t/g, ' ').replace(/\n/g, ' '); // remove tabs/newlines to avoid breaking format
  };

  const rows = words.map(w => 
    `${escapeTXT(w.word)}: ${escapeTXT(w.definition)}`
  ).join('\n');

  return rows;
};

export const downloadFile = (content, filename, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
