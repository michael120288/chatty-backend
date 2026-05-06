# Timer Mocking: vi.setSystemTime()

**Level:** 110
**ID:** `vitest-110`
**XP:** 140
**Tags:** `timers`, `system time`

## Objective

Complete the starter code using Timer Mocking: vi.setSystemTime so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Timer Mocking: vi.setSystemTime() to implement the missing assertions and make everything pass.

## Hints
1. Section 8: Timer Mocking

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('vi.setSystemTime controls Date.now()', () => {
  const fixedDate = new Date('2024-01-15T12:00:00Z');
  vi.setSystemTime(fixedDate);
  expect(Date.now()).toBe(fixedDate.getTime());
  expect(new Date().getFullYear()).toBe(2024);
});

vi.useRealTimers();
```

## Explanation

`Timer Mocking` Set the system time for Date-dependent code.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

test('vi.setSystemTime controls Date.now()', () => {
  const fixedDate = new Date('2024-01-15T12:00:00Z');
  vi.setSystemTime(fixedDate);
  // TODO: add assertion using Timer Mocking: vi.setSystemTime
  // TODO: add assertion using Timer Mocking: vi.setSystemTime
});

vi.useRealTimers();
```
