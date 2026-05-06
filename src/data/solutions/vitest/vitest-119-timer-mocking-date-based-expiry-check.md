# Timer Mocking: Date-based expiry check

**Level:** 119
**ID:** `vitest-119`
**XP:** 190
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: Date-based expiry check so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: Date-based expiry check to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function isExpired(createdAt, ttlMs) {
  return Date.now() - createdAt > ttlMs;
}

test('token expires after TTL', () => {
  const start = Date.now();
  vi.setSystemTime(new Date(start + 3600000 + 1));
  expect(isExpired(start, 3600000)).toBe(true);
});

test('token valid within TTL', () => {
  const start = Date.now();
  vi.setSystemTime(new Date(start + 1000));
  expect(isExpired(start, 3600000)).toBe(false);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test code that checks if a token/session is expired.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function isExpired(createdAt, ttlMs) {
  return Date.now() - createdAt > ttlMs;
}

test('token expires after TTL', () => {
  const start = Date.now();
  vi.setSystemTime(new Date(start + 3600000 + 1));
  // TODO: add assertion using Timer Mocking: Date-based expiry check
});

test('token valid within TTL', () => {
  const start = Date.now();
  vi.setSystemTime(new Date(start + 1000));
  // TODO: add assertion using Timer Mocking: Date-based expiry check
});

vi.useRealTimers();
```
