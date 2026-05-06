# Coverage: Boss Level — full module coverage

**Level:** 200
**ID:** `vitest-200`
**XP:** 250
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: Boss Level` in your test assertions.
2. Check the Vitest docs for `Coverage: Boss Level` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

const StringUtils = {
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  truncate(str, length, suffix = '...') {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },
  countWords(str) {
    if (!str || !str.trim()) return 0;
    return str.trim().split(/\s+/).length;
  },
  isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  },
};

test('StringUtils: full coverage', () => {
  expect(StringUtils.capitalize('')).toBe('');
  expect(StringUtils.capitalize('hello')).toBe('Hello');
  expect(StringUtils.capitalize('WORLD')).toBe('World');

  expect(StringUtils.truncate('', 10)).toBe('');
  expect(StringUtils.truncate('short', 10)).toBe('short');
  expect(StringUtils.truncate('a very long string', 10)).toBe('a very ...');
  expect(StringUtils.truncate('hello world', 8, '!')).toBe('hello wo!');

  expect(StringUtils.countWords('')).toBe(0);
  expect(StringUtils.countWords('   ')).toBe(0);
  expect(StringUtils.countWords('one two three')).toBe(3);

  expect(StringUtils.isPalindrome('racecar')).toBe(true);
  expect(StringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true);
  expect(StringUtils.isPalindrome('hello')).toBe(false);
});
```

## Explanation

`Coverage` Achieve complete coverage of a realistic utility module.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const StringUtils = {
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  truncate(str, length, suffix = '...') {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
  },
  countWords(str) {
    if (!str || !str.trim()) return 0;
    return str.trim().split(/\s+/).length;
  },
  isPalindrome(str) {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  },
};

test('StringUtils: full coverage', () => {
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level

  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level

  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level

  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
  // TODO: add assertion using Coverage: Boss Level
});
```
