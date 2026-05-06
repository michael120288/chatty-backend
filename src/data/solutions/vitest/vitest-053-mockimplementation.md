# mockImplementation

**Level:** 53
**ID:** `vitest-053`
**XP:** 100
**Tags:** `mockImplementation`, `vi.fn`, `logic`

## Objective

Use mockImplementation to give a mock a working function body.

## Story

The mock needs real logic, not just a fixed return value.

## Hints
1. mockImplementation replaces the function body.
2. expect(double(3)).toBe(6)

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('implementation', () => {
  const double = vi.fn().mockImplementation(n => n * 2);
  expect(double(3)).toBe(6);
  expect(double(10)).toBe(20);
  expect(double).toHaveBeenCalledTimes(2);
});
```

## Explanation

Vitest's `mockImplementation` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mockImplementation with logic', () => {
  const double = vi.fn().mockImplementation(n => n * 2);

  // TODO: Assert double(3) === 6, double(10) === 20
  // TODO: Assert called twice
});
```
