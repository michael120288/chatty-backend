# Spy on Math.random

**Level:** 70
**ID:** `vitest-070`
**XP:** 100
**Tags:** `vi.spyOn`, `Math.random`, `randomness`

## Objective

Use vi.spyOn to mock Math.random and test randomness-dependent code.

## Story

Control randomness in tests — spy on Math.random for predictable results.

## Hints
1. Math.floor(0.99 * 6) + 1 = 6
2. Math.floor(0 * 6) + 1 = 1

## Solution

```javascript
import { test, expect, vi } from 'vitest';
function rollDie() { return Math.floor(Math.random() * 6) + 1; }
test('rolls 6', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0.99);
  expect(rollDie()).toBe(6);
  vi.restoreAllMocks();
});
test('rolls 1', () => {
  vi.spyOn(Math, 'random').mockReturnValue(0);
  expect(rollDie()).toBe(1);
  vi.restoreAllMocks();
});
```

## Explanation

Vitest's `Spy on Math.random` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

test('rollDie returns 6 when random is 0.99', () => {
  const spy = vi.spyOn(Math, 'random').mockReturnValue(0.99);
  // TODO: Assert rollDie() === 6
  spy.mockRestore();
});

test('rollDie returns 1 when random is 0', () => {
  const spy = vi.spyOn(Math, 'random').mockReturnValue(0);
  // TODO: Assert rollDie() === 1
  spy.mockRestore();
});
```
