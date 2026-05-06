# Table-Driven Tests: async test.each

**Level:** 126
**ID:** `vitest-126`
**XP:** 160
**Tags:** `parameterized`, `test.each`

## Objective

Complete the starter code using Table-Driven Tests: async test.each so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Table-Driven Tests: async test.each to implement the missing assertions and make everything pass.

## Hints
1. Section 9: Table-Driven Tests

## Solution

```javascript
import { test, expect } from 'vitest';

async function fetchUser(id) {
  const users = { 1: 'Alice', 2: 'Bob', 3: 'Charlie' };
  return users[id] || null;
}

test.each([
  [1, 'Alice'],
  [2, 'Bob'],
  [3, 'Charlie'],
  [99, null],
])('fetchUser(%i) resolves to %s', async (id, expected) => {
  const result = await fetchUser(id);
  expect(result).toBe(expected);
});
```

## Explanation

`Table` lets you complete the starter code using Table-Driven Tests: async test.each so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function fetchUser(id) {
  const users = { 1: 'Alice', 2: 'Bob', 3: 'Charlie' };
  return users[id] || null;
}

test.each([
  [1, 'Alice'],
  [2, 'Bob'],
  [3, 'Charlie'],
  [99, null],
])('fetchUser(%i) resolves to %s', async (id, expected) => {
  // TODO: await fetchUser(id) and assert the result equals expected
});
```
