# test.aroundEach — wrap each test with setup and teardown

**Level:** 260
**ID:** `vitest-260`
**XP:** 230
**Tags:** `lifecycle`, `test.aroundEach`

## Objective

Complete the starter code using test.aroundEach so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.aroundEach to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test as base, expect, describe } from 'vitest';

const test = base.extend({
  db: async ({}, use) => {
    await use({ records: [], insert(r) { this.records.push(r); }, clear() { this.records = []; } });
  },
});

describe('with aroundEach hook', () => {
  test.aroundEach(async ({ db }, next) => {
    db.insert({ id: 0, name: 'seed' });
    await next();
    db.clear();
  });

  test('db has seed record', ({ db }) => {
    expect(db.records).toHaveLength(1);
    expect(db.records[0].name).toBe('seed');
  });

  test('can add records on top of seed', ({ db }) => {
    db.insert({ id: 1, name: 'extra' });
    expect(db.records).toHaveLength(2);
  });

  test('each test starts fresh with only the seed', ({ db }) => {
    expect(db.records).toHaveLength(1);
    expect(db.records[0].name).toBe('seed');
  });
});
```

## Explanation

`test.aroundEach` test.aroundEach lets you write setup and teardown logic in a single function using yield (generator) or next() (async).

## Starter Code

```javascript
import { test as base, expect, describe } from 'vitest';

const test = base.extend({
  db: async ({}, use) => {
    await use({ records: [], insert(r) { this.records.push(r); }, clear() { this.records = []; } });
  },
});

describe('with aroundEach hook', () => {
  test.aroundEach(async ({ db }, next) => {
    // setup: seed data before each test
    db.insert({ id: 0, name: 'seed' });
    await next();
    // teardown: clean up after each test
    db.clear();
  });

  test('db has seed record', ({ db }) => {
    // TODO: add assertion using test.aroundEach
    // TODO: add assertion using test.aroundEach
  });

  test('can add records on top of seed', ({ db }) => {
    db.insert({ id: 1, name: 'extra' });
    // TODO: add assertion using test.aroundEach
  });

  test('each test starts fresh with only the seed', ({ db }) => {
    // previous test's 'extra' should be gone (cleared in aroundEach teardown)
    // TODO: add assertion using test.aroundEach
    // TODO: add assertion using test.aroundEach
  });
});
```
