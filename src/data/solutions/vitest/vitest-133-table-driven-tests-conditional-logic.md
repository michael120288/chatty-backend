# Table-Driven Tests: conditional logic

**Level:** 133
**ID:** `vitest-133`
**XP:** 170
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: conditional logic so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: conditional logic to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function classify(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

test.each([
  [100, 'A'], [90, 'A'], [89, 'B'], [80, 'B'],
  [79, 'C'], [70, 'C'], [69, 'D'], [60, 'D'],
  [59, 'F'], [0, 'F'],
])('classify(%i) = %s', (score, expected) => {
  expect(classify(score)).toBe(expected);
});
```

## Explanation

`Table` Test branching logic comprehensively with parameterization.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function classify(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

test.each([
  [100, 'A'], [90, 'A'], [89, 'B'], [80, 'B'],
  [79, 'C'],  [70, 'C'], [69, 'D'], [60, 'D'],
  [59, 'F'],  [0,  'F'],
])('classify(%i) = %s', (score, expected) => {
  // TODO: assert classify(score) equals expected
});
```
