import { describe, it, expect } from 'vitest';
import { parseBooxExport } from './booxParser';

describe('booxParser', () => {
  it('should parse standardized BOOX export text correctly', () => {
    const sampleText = `
Apple
Oxford Dictionary
A fruit that grows on a tree.
Very delicious.
-------------------------
Banana
Cambridge Dictionary
A yellow fruit.
    `;

    const result = parseBooxExport(sampleText);
    
    expect(result).toHaveLength(2);
    
    expect(result[0].word).toBe('Apple');
    expect(result[0].dictionary).toBe('Oxford Dictionary');
    expect(result[0].definition).toBe('A fruit that grows on a tree.\nVery delicious.');

    expect(result[1].word).toBe('Banana');
    expect(result[1].dictionary).toBe('Cambridge Dictionary');
    expect(result[1].definition).toBe('A yellow fruit.');
  });

  it('should handle entries with missing definition', () => {
    const sampleText = `
UnknownWord
MyDict
-------------------------
Word2
Dict2
Definition2
    `;

    const result = parseBooxExport(sampleText);
    expect(result).toHaveLength(2);
    expect(result[0].word).toBe('UnknownWord');
    expect(result[0].dictionary).toBe('MyDict');
    expect(result[0].definition).toBe('');
  });

  it('should return empty array for empty or invalid input', () => {
    expect(parseBooxExport('')).toEqual([]);
    expect(parseBooxExport(null)).toEqual([]);
    expect(parseBooxExport(123)).toEqual([]);
  });
});
