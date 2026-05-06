# Test Context: fixture chaining (three levels)

**Level:** 158
**ID:** `vitest-158`
**XP:** 200
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture chaining so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture chaining (three levels) to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  rawData: async ({}, use) => {
    await use([1, 2, 3, 4, 5]);
  },
  doubled: async ({ rawData }, use) => {
    await use(rawData.map(x => x * 2));
  },
  sum: async ({ doubled }, use) => {
    await use(doubled.reduce((a, b) => a + b, 0));
  },
});

test('three-level fixture chain', ({ sum, doubled }) => {
  expect(doubled).toEqual([2, 4, 6, 8, 10]);
  expect(sum).toBe(30);
});
```

## Explanation

`Test Context` Chain three fixtures where each depends on the previous.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  rawData: async ({}, use) => {
    await use([1, 2, 3, 4, 5]);
  },
  doubled: async ({ rawData }, use) => {
    await use(rawData.map(x => x * 2));
  },
  sum: async ({ doubled }, use) => {
    await use(doubled.reduce((a, b) => a + b, 0));
  },
});

test('three-level fixture chain', ({ sum, doubled }) => {
  // TODO: add assertion using Test Context: fixture chaining
  // TODO: add assertion using Test Context: fixture chaining
});
```
