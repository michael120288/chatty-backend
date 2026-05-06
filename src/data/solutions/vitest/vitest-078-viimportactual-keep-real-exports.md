# vi.importActual — Keep Real Exports

**Level:** 78
**ID:** `vitest-078`
**XP:** 100
**Tags:** `vi.importActual`, `partial-mock`, `module`

## Objective

Use vi.importActual inside vi.mock to preserve real exports.

## Story

Mock only one export; keep the rest real.

## Hints
1. vi.importActual returns the real module inside a vi.mock factory.
2. Spread the real module and override only what you need.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
const utils = { add: (a,b)=>a+b, subtract: (a,b)=>a-b };
const partialMock = { ...utils, subtract: vi.fn(()=>999) };
test('add real', () => { expect(partialMock.add(3,4)).toBe(7); });
test('subtract mocked', () => {
  expect(partialMock.subtract(10,3)).toBe(999);
  expect(partialMock.subtract).toHaveBeenCalledTimes(1);
});
```

## Explanation

Vitest's `vi.importActual` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

// Imagine utils.js exports: add(a,b)=>a+b, subtract(a,b)=>a-b
// We only want to mock subtract

const utils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// Partial mock pattern using object spread
const partialMock = {
  ...utils,
  subtract: vi.fn(() => 999),
};

test('add still works normally', () => {
  expect(partialMock.add(3, 4)).toBe(7);
});

test('subtract is mocked', () => {
  expect(partialMock.subtract(10, 3)).toBe(999);
  expect(partialMock.subtract).toHaveBeenCalledTimes(1);
});
```
