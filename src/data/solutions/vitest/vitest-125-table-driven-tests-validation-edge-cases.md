# Table-Driven Tests: validation edge cases

**Level:** 125
**ID:** `vitest-125`
**XP:** 160
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: validation edge cases so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: validation edge cases to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

test.each([
  { value: 5, min: 0, max: 10, expected: 5 },
  { value: -1, min: 0, max: 10, expected: 0 },
  { value: 15, min: 0, max: 10, expected: 10 },
  { value: 0, min: 0, max: 10, expected: 0 },
  { value: 10, min: 0, max: 10, expected: 10 },
])('clamp($value, $min, $max) = $expected', ({ value, min, max, expected }) => {
  expect(clamp(value, min, max)).toBe(expected);
});
```

## Explanation

`Table` Use test.each for boundary and edge case validation.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

test.each([
  { value: 5,  min: 0, max: 10, expected: 5  },
  { value: -1, min: 0, max: 10, expected: 0  },
  { value: 15, min: 0, max: 10, expected: 10 },
  { value: 0,  min: 0, max: 10, expected: 0  },
])('clamp($value, $min, $max) = $expected', ({ value, min, max, expected }) => {
  // TODO: assert that clamp(value, min, max) equals expected
});
```
