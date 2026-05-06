# toBeGreaterThanOrEqual and toBeLessThanOrEqual

**Level:** 17
**ID:** `vitest-017`
**XP:** 100
**Tags:** `toBeGreaterThanOrEqual`, `toBeLessThanOrEqual`, `boundaries`

## Objective

Use toBeGreaterThanOrEqual and toBeLessThanOrEqual for inclusive range checks.

## Story

Boundary conditions must include the edge values.

## Hints
1. expect(result).toBeGreaterThanOrEqual(0)
2. expect(result).toBeLessThanOrEqual(10)

## Solution

```javascript
import { test, expect } from 'vitest';
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }
test('clamp result is within bounds', () => {
  const r = clamp(5, 0, 10);
  expect(r).toBeGreaterThanOrEqual(0);
  expect(r).toBeLessThanOrEqual(10);
});
test('clamp at boundary equals boundary', () => {
  expect(clamp(10, 0, 10)).toBeGreaterThanOrEqual(10);
});
```

## Explanation

Vitest's `toBeGreaterThanOrEqual and toBeLessThanOrEqual` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

test('clamp result is within bounds', () => {
  const result = clamp(5, 0, 10);
  // TODO: Assert result >= 0 and result <= 10
});

test('clamp at boundary equals boundary', () => {
  // TODO: Assert clamp(10, 0, 10) === 10 using toBeGreaterThanOrEqual
});
```
