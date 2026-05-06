# Timer Mocking: debounce function

**Level:** 115
**ID:** `vitest-115`
**XP:** 170
**Tags:** `timer`, `mocking`

## Objective

Complete the starter code using Timer Mocking: debounce function so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: debounce function to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

test('debounce only calls once after delay', () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 300);
  debounced('a');
  debounced('b');
  debounced('c');
  vi.advanceTimersByTime(300);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toHaveBeenCalledWith('c');
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Test a debounce implementation using fake timers.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function debounce(fn, wait) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

test('debounce only calls once after delay', () => {
  const fn = vi.fn();
  const debounced = debounce(fn, 300);
  debounced('a');
  debounced('b');
  debounced('c');
  vi.advanceTimersByTime(300);
  // TODO: add assertion using Timer Mocking: debounce function
  // TODO: add assertion using Timer Mocking: debounce function
});

vi.useRealTimers();
```
