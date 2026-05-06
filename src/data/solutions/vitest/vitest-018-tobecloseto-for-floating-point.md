# toBeCloseTo for Floating Point

**Level:** 18
**ID:** `vitest-018`
**XP:** 100
**Tags:** `toBeCloseTo`, `floating-point`, `precision`

## Objective

Use toBeCloseTo to compare floating point numbers.

## Story

Floating point arithmetic is imprecise. 0.1 + 0.2 is not exactly 0.3.

## Hints
1. expect(0.1 + 0.2).toBeCloseTo(0.3)
2. toBeCloseTo(expected, numDigits?) — default is 2 decimal places.

## Solution

```javascript
import { test, expect } from 'vitest';
test('0.1 + 0.2 is close to 0.3', () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
test('pi is close to 3.14159', () => {
  expect(Math.PI).toBeCloseTo(3.14159, 4);
});
```

## Explanation

Vitest's `toBeCloseTo for Floating Point` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('0.1 + 0.2 is close to 0.3', () => {
  // TODO: Use toBeCloseTo — toBe(0.3) would fail!
});

test('pi is close to 3.14159', () => {
  // TODO: Assert Math.PI is close to 3.14159 with 4 decimal precision
});
```
