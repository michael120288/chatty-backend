# Advanced Patterns: concurrent tests

**Level:** 173
**ID:** `vitest-173`
**XP:** 190
**Tags:** `concurrency`, `async`

## Objective

Complete the starter code using Advanced Patterns: concurrent tests so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: concurrent tests to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect } from 'vitest';

async function fetchData(id) {
  return { id, data: \`data-\${id}\`, timestamp: Date.now() };
}

test.concurrent('concurrent test 1', async () => {
  const result = await fetchData(1);
  expect(result.id).toBe(1);
  expect(result.data).toBe('data-1');
});

test.concurrent('concurrent test 2', async () => {
  const result = await fetchData(2);
  expect(result.id).toBe(2);
  expect(result.data).toBe('data-2');
});

test.concurrent('concurrent test 3', async () => {
  const result = await fetchData(3);
  expect(result.id).toBe(3);
  expect(result.data).toBe('data-3');
});
```

## Explanation

`Advanced Patterns` Run tests concurrently using test.concurrent.

## Starter Code

```javascript
import { test, expect } from 'vitest';

async function fetchData(id) {
  return { id, data: \`data-\${id}\`, timestamp: Date.now() };
}

test.concurrent('concurrent test 1', async () => {
  const result = await fetchData(1);
  // TODO: add assertion using Advanced Patterns: concurrent tests
  // TODO: add assertion using Advanced Patterns: concurrent tests
});

test.concurrent('concurrent test 2', async () => {
  const result = await fetchData(2);
  // TODO: add assertion using Advanced Patterns: concurrent tests
  // TODO: add assertion using Advanced Patterns: concurrent tests
});

test.concurrent('concurrent test 3', async () => {
  const result = await fetchData(3);
  // TODO: add assertion using Advanced Patterns: concurrent tests
  // TODO: add assertion using Advanced Patterns: concurrent tests
});
```
