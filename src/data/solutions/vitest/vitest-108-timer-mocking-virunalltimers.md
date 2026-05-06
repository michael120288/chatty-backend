# Timer Mocking: vi.runAllTimers()

**Level:** 108
**ID:** `vitest-108`
**XP:** 130
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using Timer Mocking: vi.runAllTimers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.runAllTimers() to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('runAllTimers fires all pending timeouts', () => {
  const a = vi.fn();
  const b = vi.fn();
  setTimeout(a, 1000);
  setTimeout(b, 5000);
  vi.runAllTimers();
  expect(a).toHaveBeenCalled();
  expect(b).toHaveBeenCalled();
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` lets you complete the starter code using Timer Mocking: vi.runAllTimers so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('runAllTimers fires all pending timeouts', () => {
  const a = vi.fn();
  const b = vi.fn();
  setTimeout(a, 1000);
  setTimeout(b, 5000);
  vi.runAllTimers();
  // TODO: add assertion using Timer Mocking: vi.runAllTimers
  // TODO: add assertion using Timer Mocking: vi.runAllTimers
});

vi.useRealTimers();
```
