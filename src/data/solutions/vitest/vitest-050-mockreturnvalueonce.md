# mockReturnValueOnce

**Level:** 50
**ID:** `vitest-050`
**XP:** 100
**Tags:** `mockReturnValueOnce`, `vi.fn`, `sequences`

## Objective

Use mockReturnValueOnce to return different values per call.

## Story

The mock has different answers for the first, second, and subsequent calls.

## Hints
1. Each mockReturnValueOnce sets the next return value in a queue.
2. After the queue is exhausted, mockReturnValue is used.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('sequences', () => {
  const roll = vi.fn().mockReturnValueOnce(1).mockReturnValueOnce(6).mockReturnValue(3);
  expect(roll()).toBe(1);
  expect(roll()).toBe(6);
  expect(roll()).toBe(3);
  expect(roll()).toBe(3);
});
```

## Explanation

Vitest's `mockReturnValueOnce` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('returns different values per call', () => {
  const roll = vi.fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(6)
    .mockReturnValue(3); // default after once values exhaust

  // TODO: Assert roll() === 1, roll() === 6, roll() === 3, roll() === 3
});
```
