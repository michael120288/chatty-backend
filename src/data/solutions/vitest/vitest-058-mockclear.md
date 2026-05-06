# mockClear

**Level:** 58
**ID:** `vitest-058`
**XP:** 100
**Tags:** `mockClear`, `vi.fn`, `reset`

## Objective

Use mockClear() to reset call history while keeping the implementation.

## Story

Between tests, clear the call history without changing the implementation.

## Hints
1. fn.mockClear() resets calls/results but keeps implementation.
2. mockClear does NOT reset mockReturnValue.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('mockClear', () => {
  const fn = vi.fn().mockReturnValue(42);
  fn(); fn(); fn();
  expect(fn).toHaveBeenCalledTimes(3);
  fn.mockClear();
  expect(fn).toHaveBeenCalledTimes(0);
  expect(fn()).toBe(42);
});
```

## Explanation

Vitest's `mockClear` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mockClear resets call count', () => {
  const fn = vi.fn().mockReturnValue(42);

  fn(); fn(); fn();
  expect(fn).toHaveBeenCalledTimes(3);

  // TODO: Clear the mock
  // TODO: Assert call count is now 0
  // TODO: Assert fn() still returns 42
});
```
