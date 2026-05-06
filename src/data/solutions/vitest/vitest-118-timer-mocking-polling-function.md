# Timer Mocking: polling function

**Level:** 118
**ID:** `vitest-118`
**XP:** 180
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: polling function so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: polling function to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function poll(fn, interval, times) {
  let count = 0;
  const id = setInterval(() => {
    count++;
    fn(count);
    if (count >= times) clearInterval(id);
  }, interval);
}

test('poll calls fn correct number of times', () => {
  const fn = vi.fn();
  poll(fn, 500, 3);
  vi.advanceTimersByTime(1500);
  expect(fn).toHaveBeenCalledTimes(3);
  expect(fn).toHaveBeenCalledWith(3);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test a polling function that retries on a schedule.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function poll(fn, interval, times) {
  let count = 0;
  const id = setInterval(() => {
    count++;
    fn(count);
    if (count >= times) clearInterval(id);
  }, interval);
}

test('poll calls fn correct number of times', () => {
  const fn = vi.fn();
  poll(fn, 500, 3);
  vi.advanceTimersByTime(1500);
  // TODO: add assertion using Timer Mocking: polling function
  // TODO: add assertion using Timer Mocking: polling function
});

vi.useRealTimers();
```
