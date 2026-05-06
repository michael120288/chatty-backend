# Timer Mocking: vi.useFakeTimers() Basics

**Level:** 106
**ID:** `vitest-106`
**XP:** 130
**Tags:** `timers`, `fake timers`

## Objective

Complete the starter code using Timer Mocking: vi.useFakeTimers so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.useFakeTimers() Basics to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

test('fake timers prevent real waiting', async () => {
  const callback = vi.fn();
  delay(1000).then(callback);
  vi.advanceTimersByTime(1000);
  await Promise.resolve();
  expect(callback).toHaveBeenCalled();
});
```

## Explanation

`Timer Mocking` Use vi.useFakeTimers() to control time in tests.

## Starter Code

```javascript
import { test, expect, vi, beforeEach, afterEach } from 'vitest';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); });

test('fake timers prevent real waiting', async () => {
  const callback = vi.fn();
  delay(1000).then(callback);
  vi.advanceTimersByTime(1000);
  await Promise.resolve();
  // TODO: add assertion using Timer Mocking: vi.useFakeTimers
});
```
