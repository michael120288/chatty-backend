# Timer Mocking: vi.advanceTimersByTime()

**Level:** 107
**ID:** `vitest-107`
**XP:** 130
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using Timer Mocking: vi.advanceTimersByTime so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.advanceTimersByTime() to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('advance timers by 500ms', () => {
  const fn = vi.fn();
  setTimeout(fn, 500);
  vi.advanceTimersByTime(499);
  expect(fn).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Advance fake timers by a specific amount.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('advance timers by 500ms', () => {
  const fn = vi.fn();
  setTimeout(fn, 500);
  vi.advanceTimersByTime(499);
  // TODO: add assertion using Timer Mocking: vi.advanceTimersByTime
  vi.advanceTimersByTime(1);
  // TODO: add assertion using Timer Mocking: vi.advanceTimersByTime
});

vi.useRealTimers();
```
