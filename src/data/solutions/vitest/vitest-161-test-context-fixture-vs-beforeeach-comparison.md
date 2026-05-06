# Test Context: fixture vs beforeEach comparison

**Level:** 161
**ID:** `vitest-161`
**XP:** 190
**Tags:** `lifecycle`, `hooks`

## Objective

Complete the starter code using Test Context: fixture vs beforeEach comparison so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture vs beforeEach comparison to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  counter: async ({}, use) => {
    const c = { count: 0, increment() { this.count++; } };
    await use(c);
  },
});

test('fixture counter starts at 0', ({ counter }) => {
  expect(counter.count).toBe(0);
  counter.increment();
  expect(counter.count).toBe(1);
});

test('fixture counter is isolated', ({ counter }) => {
  expect(counter.count).toBe(0);
  counter.increment();
  counter.increment();
  expect(counter.count).toBe(2);
});
```

## Explanation

`Test Context` Compare fixtures with beforeEach/afterEach patterns.

## Starter Code

```javascript
import { test as base, expect, beforeEach, afterEach } from 'vitest';

// Fixture approach
const test = base.extend({
  counter: async ({}, use) => {
    const c = { count: 0, increment() { this.count++; } };
    await use(c);
  },
});

test('fixture counter starts at 0', ({ counter }) => {
  // TODO: add assertion using Test Context: fixture vs beforeEach comparison
  counter.increment();
  // TODO: add assertion using Test Context: fixture vs beforeEach comparison
});

test('fixture counter is isolated', ({ counter }) => {
  // TODO: add assertion using Test Context: fixture vs beforeEach comparison
  counter.increment();
  counter.increment();
  // TODO: add assertion using Test Context: fixture vs beforeEach comparison
});
```
