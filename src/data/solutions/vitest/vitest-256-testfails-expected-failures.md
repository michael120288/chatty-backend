# test.fails — expected failures

**Level:** 256
**ID:** `vitest-256`
**XP:** 180
**Tags:** `test variants`, `expected failure`

## Objective

Complete the starter code using test.fails so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.fails to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

test.fails('known bug: toUpperCase is broken in this mock', () => {
  const broken = (s) => s;
  expect(broken('hello')).toBe('HELLO');
});

test.fails('division always returns wrong result', () => {
  const badDivide = (a, b) => a + b;
  expect(badDivide(10, 2)).toBe(5);
});

test.fails('array sort is wrong', () => {
  const arr2 = [10, 9, 2];
  arr2.sort();
  expect(arr2).toEqual([2, 9, 10]);
});

test('normal test still works', () => {
  expect(1 + 1).toBe(2);
});
```

## Explanation

`test.fails` Use test.fails to assert that a test is expected to fail. Useful for documenting known bugs.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// test.fails marks the test as intentionally failing.
// The test PASSES if the inner assertion FAILS (and vice versa).

test.fails('known bug: toUpperCase is broken in this mock', () => {
  const broken = (s) => s; // forgot .toUpperCase()
  // TODO: add assertion using test.fails
});

test.fails('division always returns wrong result', () => {
  const badDivide = (a, b) => a + b; // bug: uses + instead of /
  // TODO: add assertion using test.fails
});

test.fails('array sort is wrong', () => {
  const arr = [3, 1, 2];
  // bug: comparing as strings
  arr.sort();
  // TODO: add assertion using test.fails
  const arr2 = [10, 9, 2];
  arr2.sort();
  // TODO: add assertion using test.fails
});

test('normal test still works', () => {
  // TODO: add assertion using test.fails
});
```
