# toHaveBeenNthCalledWith

**Level:** 56
**ID:** `vitest-056`
**XP:** 100
**Tags:** `toHaveBeenNthCalledWith`, `vi.fn`, `nth-call`

## Objective

Use toHaveBeenNthCalledWith to check a specific call's arguments.

## Story

The second call specifically should have carried the right data.

## Hints
1. toHaveBeenNthCalledWith(n, ...args) — n is 1-indexed.
2. expect(emit).toHaveBeenNthCalledWith(2, 'keydown', { key: 'Enter' })

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('nth call', () => {
  const emit = vi.fn();
  emit('click',{x:1}); emit('keydown',{key:'Enter'}); emit('blur',{});
  expect(emit).toHaveBeenNthCalledWith(2, 'keydown', { key: 'Enter' });
});
```

## Explanation

Vitest's `toHaveBeenNthCalledWith` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('second call had correct args', () => {
  const emit = vi.fn();
  emit('click', { x: 1 });
  emit('keydown', { key: 'Enter' });
  emit('blur', {});
  // TODO: Assert 2nd call was ('keydown', { key: 'Enter' })
});
```
