# Test Context: fixture with error handling

**Level:** 160
**ID:** `vitest-160`
**XP:** 180
**Tags:** `errors`, `assertions`

## Objective

Complete the starter code using Test Context: fixture with error handling so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture with error handling to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  resource: async ({}, use) => {
    const resource = { value: 'initial', closed: false };
    try {
      await use(resource);
    } finally {
      resource.closed = true;
    }
  },
});

test('resource is available during test', ({ resource }) => {
  expect(resource.value).toBe('initial');
  expect(resource.closed).toBe(false);
  resource.value = 'modified';
  expect(resource.value).toBe('modified');
});
```

## Explanation

`Test Context` Handle errors in fixture teardown gracefully.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  resource: async ({}, use) => {
    const resource = { value: 'initial', closed: false };
    try {
      await use(resource);
    } finally {
      resource.closed = true;
    }
  },
});

test('resource is available during test', ({ resource }) => {
  // TODO: add assertion using Test Context: fixture with error handling
  // TODO: add assertion using Test Context: fixture with error handling
  resource.value = 'modified';
  // TODO: add assertion using Test Context: fixture with error handling
});
```
