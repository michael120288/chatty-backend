# Timer Mocking: async function with delay

**Level:** 114
**ID:** `vitest-114`
**XP:** 160
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: async function with delay so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: async function with delay to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function fetchWithRetry(callback) {
  return new Promise(resolve => {
    setTimeout(() => resolve(callback()), 2000);
  });
}

test('async function resolves after fake timer advance', async () => {
  const data = { result: 'ok' };
  const promise = fetchWithRetry(() => data);
  vi.advanceTimersByTime(2000);
  const result = await promise;
  expect(result).toEqual({ result: 'ok' });
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test an async function that uses setTimeout internally.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function fetchWithRetry(callback) {
  return new Promise(resolve => {
    setTimeout(() => resolve(callback()), 2000);
  });
}

test('async function resolves after fake timer advance', async () => {
  const data = { result: 'ok' };
  const promise = fetchWithRetry(() => data);
  vi.advanceTimersByTime(2000);
  const result = await promise;
  // TODO: add assertion using Timer Mocking: async function with delay
});

vi.useRealTimers();
```
