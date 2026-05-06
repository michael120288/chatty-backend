# Table-Driven Tests: test.each basics

**Level:** 121
**ID:** `vitest-121`
**XP:** 140
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: test.each basics so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: test.each basics to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function add(a, b) { return a + b; }

test.each([
  [1, 2, 3],
  [0, 0, 0],
  [-1, 1, 0],
  [10, 5, 15],
])('add(%i, %i) = %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

## Explanation

`Table` Use test.each to run the same test with multiple inputs.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function add(a, b) { return a + b; }

test.each([
  [1, 2, 3],
  [0, 0, 0],
  [-1, 1, 0],
  [10, 5, 15],
])('add(%i, %i) = %i', (a, b, expected) => {
  // TODO: assert that add(a, b) equals expected
});
```
