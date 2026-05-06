# test.only

**Level:** 96
**ID:** `vitest-096`
**XP:** 100
**Tags:** `test.only`, `focus`, `debugging`

## Objective

Use test.only to run only a specific test in a file.

## Story

Focus on one failing test without running the whole suite.

## Hints
1. test.only focuses the run to just that test in the file.
2. Other tests are skipped (not failed).

## Solution

```javascript
import { test, expect } from 'vitest';
test('test 1', () => { expect(1).toBe(1); });
test.only('test 2', () => { expect(2+2).toBe(4); });
test('test 3', () => { expect(3).toBe(3); });
```

## Explanation

Vitest's `test.only` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// When test.only is used, only that test runs in this file.
// The others are skipped.

test('test 1', () => {
  expect(1).toBe(1);
});

test.only('test 2 — only this runs', () => {
  // TODO: Assert 2 + 2 equals 4
});

test('test 3', () => {
  expect(3).toBe(3);
});
```
