# Timer Mocking: Boss Level — retry with backoff

**Level:** 120
**ID:** `vitest-120`
**XP:** 220
**Tags:** `configuration`, `retry`

## Objective

Complete the starter code using Timer Mocking: Boss Level so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: Boss Level to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function retryWithBackoff(fn, maxRetries) {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    function attempt_() {
      try {
        resolve(fn());
      } catch (err) {
        if (attempt >= maxRetries) return reject(err);
        const delay = Math.pow(2, attempt) * 100;
        attempt++;
        setTimeout(attempt_, delay);
      }
    }
    attempt_();
  });
}

test('retries with exponential backoff', async () => {
  let callCount = 0;
  const unstable = () => {
    callCount++;
    if (callCount < 3) throw new Error('fail');
    return 'success';
  };
  const promise = retryWithBackoff(unstable, 3);
  vi.advanceTimersByTime(100);
  vi.advanceTimersByTime(200);
  const result = await promise;
  expect(result).toBe('success');
  expect(callCount).toBe(3);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test an exponential backoff retry mechanism using fake timers.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function retryWithBackoff(fn, maxRetries) {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    function attempt_() {
      try {
        resolve(fn());
      } catch (err) {
        if (attempt >= maxRetries) return reject(err);
        const delay = Math.pow(2, attempt) * 100;
        attempt++;
        setTimeout(attempt_, delay);
      }
    }
    attempt_();
  });
}

test('retries with exponential backoff', async () => {
  let callCount = 0;
  const unstable = () => {
    callCount++;
    if (callCount < 3) throw new Error('fail');
    return 'success';
  };
  const promise = retryWithBackoff(unstable, 3);
  vi.advanceTimersByTime(100);
  vi.advanceTimersByTime(200);
  const result = await promise;
  // TODO: add assertion using Timer Mocking: Boss Level
  // TODO: add assertion using Timer Mocking: Boss Level
});

vi.useRealTimers();
```
