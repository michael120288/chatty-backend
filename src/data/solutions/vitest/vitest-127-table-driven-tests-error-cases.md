# Table-Driven Tests: error cases

**Level:** 127
**ID:** `vitest-127`
**XP:** 180
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: error cases so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: error cases to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

test.each([
  [10, 2, 5],
  [9, 3, 3],
  [1, 4, 0.25],
])('divide(%i, %i) = %f', (a, b, expected) => {
  expect(divide(a, b)).toBe(expected);
});

test.each([
  [1, 0],
  [100, 0],
  [0, 0],
])('divide(%i, 0) throws', (a, b) => {
  expect(() => divide(a, b)).toThrow('Division by zero');
});
```

## Explanation

`Table` Test that functions throw for invalid inputs.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

test.each([
  [10, 2, 5],
  [9,  3, 3],
  [1,  4, 0.25],
])('divide(%i, %i) = %f', (a, b, expected) => {
  // TODO: assert divide(a, b) equals expected
});

test.each([
  [1, 0],
  [5, 0],
])('divide(%i, 0) throws', (a, b) => {
  // TODO: assert divide(a, b) throws an error
});
```
