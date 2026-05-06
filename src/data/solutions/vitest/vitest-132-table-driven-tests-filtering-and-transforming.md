# Table-Driven Tests: filtering and transforming

**Level:** 132
**ID:** `vitest-132`
**XP:** 160
**Tags:** `table`, `driven`

## Objective

Complete the starter code using Table-Driven Tests: filtering and transforming so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: filtering and transforming to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

function filterAndDouble(arr, threshold) {
  return arr.filter(x => x > threshold).map(x => x * 2);
}

test.each([
  { arr: [1,2,3,4,5], threshold: 2, expected: [6,8,10] },
  { arr: [10,20,30], threshold: 15, expected: [40,60] },
  { arr: [1,2,3], threshold: 10, expected: [] },
])('filterAndDouble with threshold=$threshold', ({ arr, threshold, expected }) => {
  expect(filterAndDouble(arr, threshold)).toEqual(expected);
});
```

## Explanation

`Table` lets you complete the starter code using Table-Driven Tests: filtering and transforming so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function filterAndDouble(arr, threshold) {
  return arr.filter(x => x > threshold).map(x => x * 2);
}

test.each([
  { arr: [1,2,3,4,5], threshold: 2, expected: [6,8,10] },
  { arr: [10,20,30],  threshold: 15, expected: [40,60]  },
  { arr: [1,2,3],     threshold: 10, expected: []       },
])('filter>$threshold and double', ({ arr, threshold, expected }) => {
  // TODO: assert filterAndDouble(arr, threshold) toEqual expected
});
```
