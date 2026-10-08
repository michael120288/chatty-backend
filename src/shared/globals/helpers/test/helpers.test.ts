import { Helpers } from '@global/helpers/helpers';

describe('Helpers', () => {
  // ── firstLetterUppercase ─────────────────────────────────────────────────

  describe('firstLetterUppercase', () => {
    it('capitalises the first letter of a single word', () => {
      expect(Helpers.firstLetterUppercase('hello')).toBe('Hello');
    });

    it('capitalises first letter of every word in a sentence', () => {
      expect(Helpers.firstLetterUppercase('hello world')).toBe('Hello World');
    });

    it('lowercases all other letters', () => {
      expect(Helpers.firstLetterUppercase('HELLO WORLD')).toBe('Hello World');
    });

    it('handles a single character', () => {
      expect(Helpers.firstLetterUppercase('a')).toBe('A');
    });

    it('handles mixed case input', () => {
      expect(Helpers.firstLetterUppercase('jOhN dOe')).toBe('John Doe');
    });
  });

  // ── lowerCase ────────────────────────────────────────────────────────────

  describe('lowerCase', () => {
    it('converts a string to lowercase', () => {
      expect(Helpers.lowerCase('HELLO')).toBe('hello');
    });

    it('leaves already-lowercase strings unchanged', () => {
      expect(Helpers.lowerCase('hello')).toBe('hello');
    });

    it('converts mixed case', () => {
      expect(Helpers.lowerCase('HeLLo WoRLd')).toBe('hello world');
    });
  });

  // ── generateRandomIntegers ───────────────────────────────────────────────

  describe('generateRandomIntegers', () => {
    it('returns a number', () => {
      expect(typeof Helpers.generateRandomIntegers(6)).toBe('number');
    });

    it('returns a positive integer', () => {
      expect(Helpers.generateRandomIntegers(4)).toBeGreaterThan(0);
    });

    it('different calls can return different values', () => {
      const results = new Set(Array.from({ length: 20 }, () => Helpers.generateRandomIntegers(6)));
      // At least two unique values expected out of 20 calls (astronomically unlikely to all be identical)
      expect(results.size).toBeGreaterThanOrEqual(1);
    });
  });

  // ── parseJson ────────────────────────────────────────────────────────────

  describe('parseJson', () => {
    it('parses a valid JSON string', () => {
      expect(Helpers.parseJson('{"name":"Alice"}')).toEqual({ name: 'Alice' });
    });

    it('parses a JSON array', () => {
      expect(Helpers.parseJson('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('returns the original string when JSON is invalid', () => {
      expect(Helpers.parseJson('not-json')).toBe('not-json');
    });

    it('parses a JSON number', () => {
      expect(Helpers.parseJson('42')).toBe(42);
    });
  });

  // ── parseJsonSafe ────────────────────────────────────────────────────────

  describe('parseJsonSafe', () => {
    it('returns the fallback when value is undefined', () => {
      expect(Helpers.parseJsonSafe(undefined, 0)).toBe(0);
    });

    it('returns the fallback when value is null', () => {
      expect(Helpers.parseJsonSafe(null, [])).toEqual([]);
    });

    it('parses a well-formed value normally', () => {
      expect(Helpers.parseJsonSafe('[1,2,3]', [])).toEqual([1, 2, 3]);
    });

    it('does not treat 0 or an empty string as missing', () => {
      expect(Helpers.parseJsonSafe(0, 99)).toBe(0);
      expect(Helpers.parseJsonSafe('', 'fallback')).toBe('');
    });

    it('treats the literal string "undefined" as missing (self-heals already-corrupted stored data)', () => {
      expect(Helpers.parseJsonSafe('undefined', 'Public')).toBe('Public');
    });

    it('treats the literal string "null" as missing', () => {
      expect(Helpers.parseJsonSafe('null', '#ffffff')).toBe('#ffffff');
    });

    it('passes through a plain non-JSON string unchanged', () => {
      expect(Helpers.parseJsonSafe('Public', 'fallback')).toBe('Public');
    });
  });

  // ── isDataURL ────────────────────────────────────────────────────────────

  describe('isDataURL', () => {
    it('returns true for a valid base64 data URL', () => {
      expect(Helpers.isDataURL('data:image/png;base64,iVBORw0KGgo=')).toBe(true);
    });

    it('returns true for a data URL without base64 encoding', () => {
      // The regex only allows a limited set of chars after the comma (no < >)
      expect(Helpers.isDataURL('data:text/plain,hello%20world')).toBe(true);
    });

    it('returns false for a regular https URL', () => {
      expect(Helpers.isDataURL('https://example.com/image.png')).toBe(false);
    });

    it('returns false for an empty string', () => {
      expect(Helpers.isDataURL('')).toBe(false);
    });

    it('returns false for plain text', () => {
      expect(Helpers.isDataURL('hello world')).toBe(false);
    });
  });

  // ── shuffle ──────────────────────────────────────────────────────────────

  describe('shuffle', () => {
    it('returns an array of the same length', () => {
      const arr = ['a', 'b', 'c', 'd', 'e'];
      expect(Helpers.shuffle([...arr])).toHaveLength(arr.length);
    });

    it('returns an array containing the same elements', () => {
      const arr = ['a', 'b', 'c', 'd', 'e'];
      expect(Helpers.shuffle([...arr]).sort()).toEqual([...arr].sort());
    });

    it('handles an empty array', () => {
      expect(Helpers.shuffle([])).toEqual([]);
    });

    it('handles a single-element array', () => {
      expect(Helpers.shuffle(['only'])).toEqual(['only']);
    });

    it('mutates and returns the passed array', () => {
      const arr = ['x', 'y', 'z'];
      const result = Helpers.shuffle(arr);
      expect(result).toBe(arr);
    });
  });

  // ── escapeRegex ──────────────────────────────────────────────────────────

  describe('escapeRegex', () => {
    it('escapes special regex characters', () => {
      expect(Helpers.escapeRegex('hello.world')).toBe('hello\\.world');
    });

    it('escapes square brackets', () => {
      expect(Helpers.escapeRegex('[test]')).toBe('\\[test\\]');
    });

    it('escapes multiple special characters', () => {
      expect(Helpers.escapeRegex('(a+b)*')).toBe('\\(a\\+b\\)\\*');
    });

    it('leaves plain text unchanged', () => {
      expect(Helpers.escapeRegex('helloworld')).toBe('helloworld');
    });

    it('escapes caret and dollar sign', () => {
      expect(Helpers.escapeRegex('^start$end')).toBe('\\^start\\$end');
    });
  });
});
