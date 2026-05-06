# Test Context: composing fixtures

**Level:** 153
**ID:** `vitest-153`
**XP:** 200
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: composing fixtures so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: composing fixtures to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  baseUrl: async ({}, use) => {
    await use('https://api.example.com');
  },
  authToken: async ({}, use) => {
    await use('Bearer test-token-123');
  },
  headers: async ({ baseUrl, authToken }, use) => {
    await use({
      'Authorization': authToken,
      'X-Base-URL': baseUrl,
      'Content-Type': 'application/json',
    });
  },
});

test('composed fixtures work together', ({ headers, baseUrl }) => {
  expect(headers['Authorization']).toBe('Bearer test-token-123');
  expect(headers['X-Base-URL']).toBe(baseUrl);
  expect(headers['Content-Type']).toBe('application/json');
});
```

## Explanation

`Test Context` Compose fixtures that depend on each other.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const test = base.extend({
  baseUrl: async ({}, use) => {
    await use('https://api.example.com');
  },
  authToken: async ({}, use) => {
    await use('Bearer test-token-123');
  },
  headers: async ({ baseUrl, authToken }, use) => {
    await use({
      'Authorization': authToken,
      'X-Base-URL': baseUrl,
      'Content-Type': 'application/json',
    });
  },
});

test('composed fixtures work together', ({ headers, baseUrl }) => {
  // TODO: add assertion using Test Context: composing fixtures
  // TODO: add assertion using Test Context: composing fixtures
  // TODO: add assertion using Test Context: composing fixtures
});
```
