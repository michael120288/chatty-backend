# Test Context: async fixture

**Level:** 155
**ID:** `vitest-155`
**XP:** 180
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: async fixture so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: async fixture to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

async function loadConfig(env) {
  const configs = {
    test: { db: 'test-db', debug: true },
    prod: { db: 'prod-db', debug: false },
  };
  return configs[env] || configs.test;
}

const test = base.extend({
  config: async ({}, use) => {
    const cfg = await loadConfig('test');
    await use(cfg);
  },
});

test('async config fixture', async ({ config }) => {
  expect(config.db).toBe('test-db');
  expect(config.debug).toBe(true);
});
```

## Explanation

`Test Context` Create an async fixture that fetches or resolves data.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

async function loadConfig(env) {
  const configs = {
    test: { db: 'test-db', debug: true },
    prod: { db: 'prod-db', debug: false },
  };
  return configs[env] || configs.test;
}

const test = base.extend({
  config: async ({}, use) => {
    const cfg = await loadConfig('test');
    await use(cfg);
  },
});

test('async config fixture', async ({ config }) => {
  // TODO: add assertion using Test Context: async fixture
  // TODO: add assertion using Test Context: async fixture
});
```
