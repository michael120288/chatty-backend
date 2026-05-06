# Table-Driven Tests: mock in test.each

**Level:** 128
**ID:** `vitest-128`
**XP:** 180
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: mock in test.each so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: mock in test.each to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect, vi } from 'vitest';

function applyDiscount(price, discountFn) {
  return discountFn(price);
}

test.each([
  [100, 0.1, 90],
  [200, 0.2, 160],
  [50, 0.5, 25],
])('applyDiscount(%i, %f) = %i', (price, rate, expected) => {
  const discountFn = vi.fn(p => p * (1 - rate));
  const result = applyDiscount(price, discountFn);
  expect(result).toBe(expected);
  expect(discountFn).toHaveBeenCalledWith(price);
});
```

## Explanation

`Table` lets you complete the starter code using Table-Driven Tests: mock in test.each so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function applyDiscount(price, discountFn) {
  return discountFn(price);
}

test.each([
  [100, 0.1, 90],
  [200, 0.2, 160],
  [50,  0.5, 25],
])('applyDiscount(%i, %f) = %i', (price, rate, expected) => {
  const discountFn = vi.fn(p => p * (1 - rate));
  // TODO: call applyDiscount and assert result equals expected
  // TODO: assert discountFn was called with the price
});
```
