# Advanced Patterns: expect assertions count

**Level:** 176
**ID:** `vitest-176`
**XP:** 180
**Tags:** `advanced`, `patterns`

## Objective

Complete the starter code using Advanced Patterns: expect assertions count so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: expect assertions count to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

async function processItems(items) {
  const results = [];
  for (const item of items) {
    if (item > 0) results.push(item * 2);
  }
  return results;
}

test('expect.assertions ensures callback ran', async () => {
  expect.assertions(2);
  const result = await processItems([1, 2, 3, -1]);
  expect(result).toHaveLength(3);
  expect(result).toEqual([2, 4, 6]);
});
```

## Explanation

`Advanced Patterns` Use expect.assertions() to ensure a test runs all assertions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function processItems(items) {
  const results = [];
  for (const item of items) {
    if (item > 0) results.push(item * 2);
  }
  return results;
}

test('expect.assertions ensures callback ran', async () => {
  expect.assertions(2);
  const result = await processItems([1, 2, 3, -1]);
  // TODO: add assertion using Advanced Patterns: expect assertions count
  // TODO: add assertion using Advanced Patterns: expect assertions count
});
```
