# test.for — parameterized tests with TestContext

**Level:** 257
**ID:** `vitest-257`
**XP:** 190
**Tags:** `parameterized`, `test.for`

## Objective

Complete the starter code using test.for so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.for to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect } from 'vitest';

const cases = [
  { input: 'hello', expected: 'HELLO' },
  { input: 'world', expected: 'WORLD' },
  { input: 'vitest', expected: 'VITEST' },
];

test.for(cases)('toUpperCase($input)', ({ input, expected }) => {
  expect(input.toUpperCase()).toBe(expected);
});

test.for([1, 2, 3, 4, 5])('number $0 is positive', (n) => {
  expect(n).toBeGreaterThan(0);
});

test.for([
  [2, 4],
  [3, 9],
  [4, 16],
])('square of $0 is $1', ([n, sq]) => {
  expect(n * n).toBe(sq);
});
```

## Explanation

`test.for` test.for is like test.each but does not spread arrays and provides the full TestContext to each test.

## Starter Code

```javascript
import { test, expect } from 'vitest';

// test.for receives each item as-is (no spreading) and also provides context.
// Compare: test.each([[1,2,3]]) spreads to (a,b,c)
//          test.for([[1,2,3]]) receives ([1,2,3], context)

const cases = [
  { input: 'hello', expected: 'HELLO' },
  { input: 'world', expected: 'WORLD' },
  { input: 'vitest', expected: 'VITEST' },
];

test.for(cases)('toUpperCase($input)', ({ input, expected }) => {
  // TODO: add assertion using test.for
});

test.for([1, 2, 3, 4, 5])('number $0 is positive', (n) => {
  // TODO: add assertion using test.for
});

test.for([
  [2, 4],
  [3, 9],
  [4, 16],
])('square of $0 is $1', ([n, sq]) => {
  expect(n * n).toBe(sq);
});
```
