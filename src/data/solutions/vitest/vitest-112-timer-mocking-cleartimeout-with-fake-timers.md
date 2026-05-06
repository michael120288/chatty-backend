# Timer Mocking: clearTimeout with fake timers

**Level:** 112
**ID:** `vitest-112`
**XP:** 130
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using Timer Mocking: clearTimeout with fake timers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: clearTimeout with fake timers to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('clearTimeout prevents callback', () => {
  const fn = vi.fn();
  const id = setTimeout(fn, 1000);
  clearTimeout(id);
  vi.runAllTimers();
  expect(fn).not.toHaveBeenCalled();
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Verify clearTimeout cancels a pending timer.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('clearTimeout prevents callback', () => {
  const fn = vi.fn();
  const id = setTimeout(fn, 1000);
  clearTimeout(id);
  vi.runAllTimers();
  // TODO: add assertion using Timer Mocking: clearTimeout with fake timers
});

vi.useRealTimers();
```
