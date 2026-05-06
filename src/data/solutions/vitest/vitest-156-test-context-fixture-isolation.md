# Test Context: fixture isolation

**Level:** 156
**ID:** `vitest-156`
**XP:** 180
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture isolation so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture isolation to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  store: async ({}, use) => {
    const store = { items: [] };
    await use(store);
  },
});

test('first test adds to store', ({ store }) => {
  store.items.push('item1');
  expect(store.items).toHaveLength(1);
});

test('second test starts fresh', ({ store }) => {
  expect(store.items).toHaveLength(0);
  store.items.push('item2');
  expect(store.items).toHaveLength(1);
});
```

## Explanation

`Test Context` Verify that fixture state is isolated between tests.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  store: async ({}, use) => {
    const store = { items: [] };
    await use(store);
  },
});

test('first test adds to store', ({ store }) => {
  store.items.push('item1');
  // TODO: add assertion using Test Context: fixture isolation
});

test('second test starts fresh', ({ store }) => {
  // TODO: add assertion using Test Context: fixture isolation
  store.items.push('item2');
  // TODO: add assertion using Test Context: fixture isolation
});
```
