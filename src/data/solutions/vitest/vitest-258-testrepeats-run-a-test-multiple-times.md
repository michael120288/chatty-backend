# test.repeats — run a test multiple times

**Level:** 258
**ID:** `vitest-258`
**XP:** 190
**Tags:** `test variants`, `repetition`

## Objective

Complete the starter code using test.repeats so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.repeats to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

test('stable function always returns same result', { repeats: 4 }, () => {
  const stable = (x) => x * 2;
  expect(stable(5)).toBe(10);
});

test('Math.random is always in [0,1)', { repeats: 10 }, () => {
  const r = Math.random();
  expect(r).toBeGreaterThanOrEqual(0);
  expect(r).toBeLessThan(1);
});

test('Date.now increases or stays same between calls', { repeats: 3 }, () => {
  const t1 = Date.now();
  const t2 = Date.now();
  expect(t2).toBeGreaterThanOrEqual(t1);
});

test('array sort is deterministic', { repeats: 5 }, () => {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6];
  const sorted = [...arr].sort((a, b) => a - b);
  expect(sorted[0]).toBe(1);
  expect(sorted[sorted.length - 1]).toBe(9);
});
```

## Explanation

`test.repeats` Use the repeats option to run a test multiple times — useful for catching flaky behaviour.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// { repeats: N } runs the test N additional times after the first run.
// The test must pass on ALL runs.

let callCount = 0;

test('stable function always returns same result', { repeats: 4 }, () => {
  callCount++;
  const stable = (x) => x * 2;
  // TODO: add assertion using test.repeats
});

test('Math.random is always in [0,1)', { repeats: 10 }, () => {
  const r = Math.random();
  // TODO: add assertion using test.repeats
  // TODO: add assertion using test.repeats
});

test('Date.now increases or stays same between calls', { repeats: 3 }, () => {
  const t1 = Date.now();
  const t2 = Date.now();
  // TODO: add assertion using test.repeats
});

test('array sort is deterministic', { repeats: 5 }, () => {
  const arr = [3, 1, 4, 1, 5, 9, 2, 6];
  const sorted = [...arr].sort((a, b) => a - b);
  // TODO: add assertion using test.repeats
  // TODO: add assertion using test.repeats
});
```
