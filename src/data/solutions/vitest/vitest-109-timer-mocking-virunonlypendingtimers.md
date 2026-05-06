# Timer Mocking: vi.runOnlyPendingTimers()

**Level:** 109
**ID:** `vitest-109`
**XP:** 140
**Tags:** `timers`, `pending`

## Objective

Complete the starter code using Timer Mocking: vi.runOnlyPendingTimers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.runOnlyPendingTimers() to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('runOnlyPendingTimers does not run chained timers', () => {
  const calls = [];
  setTimeout(() => {
    calls.push('first');
    setTimeout(() => calls.push('second'), 100);
  }, 100);
  vi.runOnlyPendingTimers();
  expect(calls).toEqual(['first']);
  expect(calls).not.toContain('second');
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Run only the currently scheduled timers (not ones scheduled by them).

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('runOnlyPendingTimers does not run chained timers', () => {
  const calls = [];
  setTimeout(() => {
    calls.push('first');
    setTimeout(() => calls.push('second'), 100);
  }, 100);
  vi.runOnlyPendingTimers();
  // TODO: add assertion using Timer Mocking: vi.runOnlyPendingTimers
  // TODO: add assertion using Timer Mocking: vi.runOnlyPendingTimers
});

vi.useRealTimers();
```
