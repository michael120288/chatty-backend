# Test Context: fixture scope — function vs file

**Level:** 163
**ID:** `vitest-163`
**XP:** 190
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture scope so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture scope to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

let globalCallCount = 0;

const test = base.extend({
  tracker: async ({}, use) => {
    globalCallCount++;
    const count = globalCallCount;
    await use({ count, name: \`fixture-instance-\${count}\` });
  },
});

test('first test gets its own fixture', ({ tracker }) => {
  expect(tracker.name).toMatch(/^fixture-instance-/);
  expect(tracker.count).toBeGreaterThan(0);
});

test('second test gets its own fixture', ({ tracker }) => {
  expect(tracker.name).toMatch(/^fixture-instance-/);
});
```

## Explanation

`Test Context` Understand fixture scope and how it affects state.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

let globalCallCount = 0;

const test = base.extend({
  tracker: async ({}, use) => {
    globalCallCount++;
    const count = globalCallCount;
    await use({ count, name: \`fixture-instance-\${count}\` });
  },
});

test('first test gets its own fixture', ({ tracker }) => {
  // TODO: add assertion using Test Context: fixture scope
  // TODO: add assertion using Test Context: fixture scope
});

test('second test gets its own fixture', ({ tracker }) => {
  // TODO: add assertion using Test Context: fixture scope
});
```
