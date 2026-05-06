# Test Context: extending an existing extended test

**Level:** 164
**ID:** `vitest-164`
**XP:** 210
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: extending an existing extended test so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: extending an existing extended test to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect } from 'vitest';

const testWithDb = base.extend({
  db: async ({}, use) => {
    await use({ name: 'test-db', records: [] });
  },
});

const testWithDbAndUser = testWithDb.extend({
  currentUser: async ({ db }, use) => {
    const user = { id: 1, dbName: db.name };
    await use(user);
  },
});

testWithDbAndUser('layered fixtures work', ({ db, currentUser }) => {
  expect(db.name).toBe('test-db');
  expect(currentUser.dbName).toBe('test-db');
  expect(currentUser.id).toBe(1);
});
```

## Explanation

`Test Context` Layer multiple test.extend calls for modular fixtures.

## Starter Code

```javascript
import { test as base, expect } from 'vitest';

const testWithDb = base.extend({
  db: async ({}, use) => {
    await use({ name: 'test-db', records: [] });
  },
});

const testWithDbAndUser = testWithDb.extend({
  currentUser: async ({ db }, use) => {
    const user = { id: 1, dbName: db.name };
    await use(user);
  },
});

testWithDbAndUser('chained fixture provides both db and user', ({ db, currentUser }) => {
  // TODO: assert db.name equals 'test-db'
  // TODO: assert currentUser.dbName equals db.name
  // TODO: assert currentUser.id equals 1
});
```
