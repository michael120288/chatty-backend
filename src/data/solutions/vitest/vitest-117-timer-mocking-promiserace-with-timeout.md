# Timer Mocking: Promise.race with timeout

**Level:** 117
**ID:** `vitest-117`
**XP:** 190
**Tags:** `async`, `promises`

## Objective

Complete the starter code using Timer Mocking: Promise.race with timeout so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: Promise.race with timeout to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

test('timeout wins when promise is slow', async () => {
  const slowPromise = new Promise(resolve => setTimeout(resolve, 5000));
  const raced = withTimeout(slowPromise, 1000);
  vi.advanceTimersByTime(1001);
  await expect(raced).rejects.toThrow('Timeout');
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test a race between a real async op and a timeout.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

test('timeout wins when promise is slow', async () => {
  const slowPromise = new Promise(resolve => setTimeout(resolve, 5000));
  const raced = withTimeout(slowPromise, 1000);
  vi.advanceTimersByTime(1001);
  // TODO: add assertion using Timer Mocking: Promise.race with timeout
});

vi.useRealTimers();
```
