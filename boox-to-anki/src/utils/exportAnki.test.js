import { describe, it, expect, vi } from 'vitest';
import { generateCSV, generateTXT, downloadFile } from './exportAnki';

describe('exportAnki Utils', () => {
  const sampleWords = [
    { word: 'apple', definition: 'A round fruit', dictionary: 'English' },
    { word: 'banana', definition: 'A long yellow fruit,\noften eaten by monkeys', dictionary: 'Eng-Esp' },
    { word: 'orange', definition: 'A citrus fruit with "thick" skin', dictionary: 'Eng-Dict' }
  ];

  it('should generate proper CSV with escaped fields', () => {
    const csv = generateCSV(sampleWords);
    
    expect(csv).toContain('apple,A round fruit,English\nbanana,"A long yellow fruit,\noften eaten by monkeys",Eng-Esp\norange,"A citrus fruit with ""thick"" skin",Eng-Dict');
  });

  it('should generate proper TXT (key: value)', () => {
    const txt = generateTXT(sampleWords);
    const lines = txt.split('\n');
    
    expect(lines[0]).toBe('apple: A round fruit');
    expect(lines[1]).toBe('banana: A long yellow fruit, often eaten by monkeys');
    expect(lines[2]).toBe('orange: A citrus fruit with "thick" skin');
  });
});
