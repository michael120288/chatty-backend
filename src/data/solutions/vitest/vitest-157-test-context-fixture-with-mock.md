# Test Context: fixture with mock

**Level:** 157
**ID:** `vitest-157`
**XP:** 190
**Tags:** `test`, `context`

## Objective

Complete the starter code using Test Context: fixture with mock so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Test Context: fixture with mock to implement the missing assertions and make everything pass.

## Hints
1. Section 11: Test Context & Fixtures

## Solution

```javascript
import { test as base, expect, vi } from 'vitest';

const test = base.extend({
  logger: async ({}, use) => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    };
    await use(logger);
    vi.clearAllMocks();
  },
});

test('logger.info is called', ({ logger }) => {
  logger.info('test message');
  expect(logger.info).toHaveBeenCalledWith('test message');
  expect(logger.error).not.toHaveBeenCalled();
});
```

## Explanation

`Test Context` Include a mock in a fixture for reuse across tests.

## Starter Code

```javascript
import { test as base, expect, vi } from 'vitest';

const test = base.extend({
  logger: async ({}, use) => {
    const logger = {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
    };
    await use(logger);
    vi.clearAllMocks();
  },
});

test('logger.info is called', ({ logger }) => {
  logger.info('test message');
  // TODO: add assertion using Test Context: fixture with mock
  // TODO: add assertion using Test Context: fixture with mock
});
```
