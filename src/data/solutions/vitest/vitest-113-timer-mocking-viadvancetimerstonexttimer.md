# Timer Mocking: vi.advanceTimersToNextTimer()

**Level:** 113
**ID:** `vitest-113`
**XP:** 150
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: vi.advanceTimersToNextTimer so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.advanceTimersToNextTimer() to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('advanceTimersToNextTimer fires only the soonest', () => {
  const fn1 = vi.fn();
  const fn2 = vi.fn();
  setTimeout(fn1, 100);
  setTimeout(fn2, 200);
  vi.advanceTimersToNextTimer();
  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn2).not.toHaveBeenCalled();
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Advance to exactly the next scheduled timer.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('advanceTimersToNextTimer fires only the soonest', () => {
  const fn1 = vi.fn();
  const fn2 = vi.fn();
  setTimeout(fn1, 100);
  setTimeout(fn2, 200);
  vi.advanceTimersToNextTimer();
  // TODO: add assertion using Timer Mocking: vi.advanceTimersToNextTimer
  // TODO: add assertion using Timer Mocking: vi.advanceTimersToNextTimer
});

vi.useRealTimers();
```
