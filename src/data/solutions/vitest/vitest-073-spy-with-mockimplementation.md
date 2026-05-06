# Spy with mockImplementation

**Level:** 73
**ID:** `vitest-073`
**XP:** 100
**Tags:** `vi.spyOn`, `mockImplementation`, `custom-logic`

## Objective

Use mockImplementation on a spy to replace its behaviour.

## Story

Replace the real method with custom logic while still tracking calls.

## Hints
1. expect(fs.readFile('/public')).toBe('mock: /public')
2. expect(() => fs.readFile('/secret')).toThrow('Access denied')

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const fs = { readFile: path => `contents of ${path}` };
test('spy implementation', () => {
  const spy = vi.spyOn(fs, 'readFile').mockImplementation(path => {
    if (path === '/secret') throw new Error('Access denied');
    return `mock: ${path}`;
  });
  expect(fs.readFile('/public')).toBe('mock: /public');
  expect(() => fs.readFile('/secret')).toThrow('Access denied');
  spy.mockRestore();
});
```

## Explanation

Vitest's `Spy with mockImplementation` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

const fs = {
  readFile: (path) => `contents of ${path}`
};

test('spy with custom implementation', () => {
  const spy = vi.spyOn(fs, 'readFile').mockImplementation((path) => {
    if (path === '/secret') throw new Error('Access denied');
    return `mock: ${path}`;
  });

  // TODO: Assert fs.readFile('/public') returns 'mock: /public'
  // TODO: Assert fs.readFile('/secret') throws 'Access denied'

  spy.mockRestore();
});
```
