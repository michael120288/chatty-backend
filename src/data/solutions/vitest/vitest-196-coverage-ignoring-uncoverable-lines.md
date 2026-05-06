# Coverage: ignoring uncoverable lines

**Level:** 196
**ID:** `vitest-196`
**XP:** 170
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: ignoring uncoverable lines so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: ignoring uncoverable lines to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: ignoring uncoverable lines` in your test assertions.
2. Check the Vitest docs for `Coverage: ignoring uncoverable lines` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function safeDivide(a, b) {
  /* istanbul ignore next */
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return b === 0 ? null : a / b;
}

test('safeDivide valid inputs', () => {
  expect(safeDivide(10, 2)).toBe(5);
  expect(safeDivide(7, 0)).toBeNull();
  expect(safeDivide(-6, 3)).toBe(-2);
});
```

## Explanation

`Coverage` Identify patterns where coverage exceptions are valid.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function safeDivide(a, b) {
  /* istanbul ignore next */
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  return b === 0 ? null : a / b;
}

test('safeDivide valid inputs', () => {
  // TODO: add assertion using Coverage: ignoring uncoverable lines
  // TODO: add assertion using Coverage: ignoring uncoverable lines
  // TODO: add assertion using Coverage: ignoring uncoverable lines
});
```
