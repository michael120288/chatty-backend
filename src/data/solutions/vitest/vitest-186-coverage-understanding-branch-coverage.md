# Coverage: understanding branch coverage

**Level:** 186
**ID:** `vitest-186`
**XP:** 160
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: understanding branch coverage so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: understanding branch coverage to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: understanding branch coverage` in your test assertions.
2. Check the Vitest docs for `Coverage: understanding branch coverage` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function getShipping(weight, express) {
  if (weight > 10) {
    return express ? 25 : 15;
  } else {
    return express ? 10 : 5;
  }
}

test('branch coverage: all four paths', () => {
  expect(getShipping(15, true)).toBe(25);
  expect(getShipping(15, false)).toBe(15);
  expect(getShipping(5, true)).toBe(10);
  expect(getShipping(5, false)).toBe(5);
});
```

## Explanation

`Coverage` Write tests that achieve full branch coverage.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getShipping(weight, express) {
  if (weight > 10) {
    return express ? 25 : 15;
  } else {
    return express ? 10 : 5;
  }
}

test('branch coverage: all four paths', () => {
  // TODO: add assertion using Coverage: understanding branch coverage
  // TODO: add assertion using Coverage: understanding branch coverage
  // TODO: add assertion using Coverage: understanding branch coverage
  // TODO: add assertion using Coverage: understanding branch coverage
});
```
