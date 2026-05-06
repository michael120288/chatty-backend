# mockResolvedValue

**Level:** 51
**ID:** `vitest-051`
**XP:** 100
**Tags:** `mockResolvedValue`, `async`, `vi.fn`

## Objective

Use mockResolvedValue to mock an async-returning function.

## Story

Mock an async function that returns a Promise.

## Hints
1. mockResolvedValue(val) is shorthand for mockReturnValue(Promise.resolve(val)).

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('mock async fetch', async () => {
  const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });
  const user = await fetchUser();
  expect(user.id).toBe(1);
  expect(user.name).toBe('Alice');
  expect(fetchUser).toHaveBeenCalledTimes(1);
});
```

## Explanation

Vitest's `mockResolvedValue` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('mock async fetch', async () => {
  const fetchUser = vi.fn().mockResolvedValue({ id: 1, name: 'Alice' });

  // TODO: await fetchUser() and assert id and name
  // TODO: Assert fetchUser was called once
});
```
