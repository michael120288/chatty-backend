# Advanced Patterns: test timeout

**Level:** 175
**ID:** `vitest-175`
**XP:** 180
**Tags:** `configuration`, `timeouts`

## Objective

Complete the starter code using Advanced Patterns: test timeout so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Advanced Patterns: test timeout to implement the missing assertions and make everything pass.

## Hints
1. Section 12: Advanced Patterns

## Solution

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function slowOperation() {
  return new Promise(resolve => setTimeout(() => resolve('done'), 100));
}

test('slow operation with fake timer', { timeout: 5000 }, async () => {
  const promise = slowOperation();
  vi.advanceTimersByTime(100);
  const result = await promise;
  expect(result).toBe('done');
});

vi.useRealTimers();
```

## Explanation

`Advanced Patterns` lets you complete the starter code using Advanced Patterns: test timeout so all tests run and pass with exit code 0. Use it in your tests to verify the expected behavior.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

vi.useFakeTimers();

function slowOperation() {
  return new Promise(resolve => setTimeout(() => resolve('done'), 100));
}

test('slow operation with fake timer', { timeout: 5000 }, async () => {
  const promise = slowOperation();
  vi.advanceTimersByTime(100);
  const result = await promise;
  // TODO: add assertion using Advanced Patterns: test timeout
});

vi.useRealTimers();
```
