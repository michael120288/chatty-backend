# test.aroundAll — wrap all tests in a suite once

**Level:** 261
**ID:** `vitest-261`
**XP:** 230
**Tags:** `lifecycle`, `test.aroundAll`

## Objective

Complete the starter code using test.aroundAll so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use test.aroundAll to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test as base, expect, describe } from 'vitest';

const log = [];

const test = base.extend({
  logger: async ({}, use) => {
    await use({ entries: log });
  },
});

describe('suite with aroundAll', () => {
  test.aroundAll(async (suite, next) => {
    log.push('suite:start');
    await next();
    log.push('suite:end');
  });

  test('first test', ({ logger }) => {
    logger.entries.push('test:1');
    expect(logger.entries).toContain('suite:start');
    expect(logger.entries).toContain('test:1');
  });

  test('second test', ({ logger }) => {
    logger.entries.push('test:2');
    expect(logger.entries).toContain('test:2');
  });

  test('suite:end not yet in log during tests', ({ logger }) => {
    expect(logger.entries).not.toContain('suite:end');
  });

  test('log has expected sequence so far', ({ logger }) => {
    expect(logger.entries[0]).toBe('suite:start');
    expect(logger.entries.filter(e => e.startsWith('test:')).length).toBeGreaterThan(0);
  });
});
```

## Explanation

`test.aroundAll` test.aroundAll runs setup once before all tests and teardown once after all tests in a describe block.

## Starter Code

```javascript
import { test as base, expect, describe } from 'vitest';

const log = [];

const test = base.extend({
  logger: async ({}, use) => {
    await use({ entries: log });
  },
});

describe('suite with aroundAll', () => {
  test.aroundAll(async (suite, next) => {
    log.push('suite:start');
    await next();
    log.push('suite:end');
  });

  test('first test', ({ logger }) => {
    logger.entries.push('test:1');
    // TODO: add assertion using test.aroundAll
    // TODO: add assertion using test.aroundAll
  });

  test('second test', ({ logger }) => {
    logger.entries.push('test:2');
    // TODO: add assertion using test.aroundAll
  });

  test('suite:end not yet in log during tests', ({ logger }) => {
    // TODO: add assertion using test.aroundAll
  });

  test('log has expected sequence so far', ({ logger }) => {
    // TODO: add assertion using test.aroundAll
    // TODO: add assertion using test.aroundAll
  });
});
```
