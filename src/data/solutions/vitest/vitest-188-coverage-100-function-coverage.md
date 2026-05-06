# Coverage: 100% function coverage

**Level:** 188
**ID:** `vitest-188`
**XP:** 170
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: 100% function coverage so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: 100% function coverage to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: 100% function coverage` in your test assertions.
2. Check the Vitest docs for `Coverage: 100% function coverage` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

const utils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => { if (b === 0) throw new Error('Divide by zero'); return a / b; },
  abs: (n) => Math.abs(n),
};

test('all utility functions covered', () => {
  expect(utils.add(2, 3)).toBe(5);
  expect(utils.subtract(5, 3)).toBe(2);
  expect(utils.multiply(4, 3)).toBe(12);
  expect(utils.divide(10, 2)).toBe(5);
  expect(() => utils.divide(5, 0)).toThrow();
  expect(utils.abs(-5)).toBe(5);
  expect(utils.abs(5)).toBe(5);
});
```

## Explanation

`Coverage` Ensure every function in a module is called.

## Starter Code

```javascript
import { test, expect } from 'vitest';

const utils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => { if (b === 0) throw new Error('Divide by zero'); return a / b; },
  abs: (n) => Math.abs(n),
};

test('all utility functions covered', () => {
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
  // TODO: add assertion using Coverage: 100% function coverage
});
```
