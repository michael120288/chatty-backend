# mockReturnValue

**Level:** 49
**ID:** `vitest-049`
**XP:** 100
**Tags:** `mockReturnValue`, `vi.fn`, `return-values`

## Objective

Use mockReturnValue to control what a mock returns.

## Story

Program the mock to always return a specific value.

## Hints
1. mockReturnValue sets the default return for all calls.
2. Call it multiple times and assert each result.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('mockReturnValue', () => {
  const getPrice = vi.fn().mockReturnValue(9.99);
  expect(getPrice()).toBe(9.99);
  expect(getPrice()).toBe(9.99);
  expect(getPrice()).toBe(9.99);
});
```

## Explanation

Vitest's `mockReturnValue` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mockReturnValue always returns the same value', () => {
  const getPrice = vi.fn().mockReturnValue(9.99);
  // TODO: Call getPrice() three times and assert each returns 9.99
});
```
