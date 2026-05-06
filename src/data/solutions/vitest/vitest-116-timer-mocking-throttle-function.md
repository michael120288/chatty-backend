# Timer Mocking: throttle function

**Level:** 116
**ID:** `vitest-116`
**XP:** 180
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: throttle function so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: throttle function to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

test('throttle limits call frequency', () => {
  const fn = vi.fn();
  const throttled = throttle(fn, 1000);
  throttled('first');
  throttled('second');
  throttled('third');
  expect(fn).toHaveBeenCalledTimes(1);
  vi.advanceTimersByTime(1000);
  throttled('fourth');
  expect(fn).toHaveBeenCalledTimes(2);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test a throttle implementation using fake timers.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
}

test('throttle limits call frequency', () => {
  const fn = vi.fn();
  const throttled = throttle(fn, 1000);
  throttled('first');
  throttled('second');
  throttled('third');
  // TODO: add assertion using Timer Mocking: throttle function
  vi.advanceTimersByTime(1000);
  throttled('fourth');
  // TODO: add assertion using Timer Mocking: throttle function
});

vi.useRealTimers();
```
