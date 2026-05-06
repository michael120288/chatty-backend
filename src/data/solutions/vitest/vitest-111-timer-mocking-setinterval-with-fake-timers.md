# Timer Mocking: setInterval with fake timers

**Level:** 111
**ID:** `vitest-111`
**XP:** 140
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using Timer Mocking: setInterval with fake timers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: setInterval with fake timers to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('setInterval fires multiple times', () => {
  const fn = vi.fn();
  setInterval(fn, 100);
  vi.advanceTimersByTime(350);
  expect(fn).toHaveBeenCalledTimes(3);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` lets you complete the starter code using Timer Mocking: setInterval with fake timers so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('setInterval fires multiple times', () => {
  const fn = vi.fn();
  setInterval(fn, 100);
  vi.advanceTimersByTime(350);
  // TODO: add assertion using Timer Mocking: setInterval with fake timers
});

vi.useRealTimers();
```
