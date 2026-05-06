# Coverage: mutation testing concept

**Level:** 198
**ID:** `vitest-198`
**XP:** 190
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: mutation testing concept so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: mutation testing concept to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: mutation testing concept` in your test assertions.
2. Check the Vitest docs for `Coverage: mutation testing concept` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function max(a, b) { return a >= b ? a : b; }
function min(a, b) { return a <= b ? a : b; }
function between(val, lo, hi) { return val > lo && val < hi; }

test('max catches mutations', () => {
  expect(max(5, 3)).toBe(5);
  expect(max(3, 5)).toBe(5);
  expect(max(5, 5)).toBe(5);
  expect(max(-1, 0)).toBe(0);
});

test('min catches mutations', () => {
  expect(min(5, 3)).toBe(3);
  expect(min(3, 5)).toBe(3);
  expect(min(5, 5)).toBe(5);
  expect(min(-1, 0)).toBe(-1);
});

test('between catches off-by-one mutations', () => {
  expect(between(5, 1, 10)).toBe(true);
  expect(between(1, 1, 10)).toBe(false);
  expect(between(10, 1, 10)).toBe(false);
  expect(between(0, 1, 10)).toBe(false);
});
```

## Explanation

`Coverage` Write tests that would catch common mutations.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function max(a, b) { return a >= b ? a : b; }
function min(a, b) { return a <= b ? a : b; }
function between(val, lo, hi) { return val > lo && val < hi; }

test('max catches mutations', () => {
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
});

test('min catches mutations', () => {
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
});

test('between catches off-by-one mutations', () => {
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
  // TODO: add assertion using Coverage: mutation testing concept
});
```
