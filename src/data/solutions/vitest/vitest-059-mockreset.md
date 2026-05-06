# mockReset

**Level:** 59
**ID:** `vitest-059`
**XP:** 100
**Tags:** `mockReset`, `vi.fn`, `reset`

## Objective

Use mockReset() to reset both call history and configured behaviour.

## Story

Start completely fresh — clear history AND remove the programmed return value.

## Hints
1. fn.mockReset() resets calls AND return values.
2. After reset, fn() returns undefined.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('mockReset', () => {
  const fn = vi.fn().mockReturnValue(99);
  fn(); fn();
  expect(fn()).toBe(99);
  fn.mockReset();
  expect(fn).toHaveBeenCalledTimes(0);
  expect(fn()).toBeUndefined();
});
```

## Explanation

Vitest's `mockReset` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mockReset clears everything', () => {
  const fn = vi.fn().mockReturnValue(99);

  fn(); fn();
  expect(fn()).toBe(99);
  expect(fn).toHaveBeenCalledTimes(3);

  // TODO: Reset the mock
  // TODO: Assert call count is 0
  // TODO: Assert fn() now returns undefined (not 99)
});
```
