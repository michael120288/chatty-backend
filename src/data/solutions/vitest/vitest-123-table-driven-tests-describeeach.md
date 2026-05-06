# Table-Driven Tests: describe.each

**Level:** 123
**ID:** `vitest-123`
**XP:** 160
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: describe.each so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: describe.each to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { describe, test, expect } from 'vitest';

function multiply(a, b) { return a * b; }

describe.each([
  [2, 3, 6],
  [4, 5, 20],
  [0, 100, 0],
])('multiply(%i, %i)', (a, b, expected) => {
  test(\`equals \${expected}\`, () => {
    expect(multiply(a, b)).toBe(expected);
  });
  test('result is a number', () => {
    expect(typeof multiply(a, b)).toBe('number');
  });
});
```

## Explanation

`Table` Use describe.each to group related parameterized tests.

## Starter Code

```javascript
import { describe, test, expect } from 'vitest';

function multiply(a, b) { return a * b; }

describe.each([
  [2, 3, 6],
  [4, 5, 20],
  [0, 100, 0],
])('multiply(%i, %i)', (a, b, expected) => {
  test(\`equals \${expected}\`, () => {
    // TODO: add assertion using Table-Driven Tests: describe.each
  });
  test('result is a number', () => {
    // TODO: add assertion using Table-Driven Tests: describe.each
  });
});
```
