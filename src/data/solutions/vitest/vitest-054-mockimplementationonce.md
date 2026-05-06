# mockImplementationOnce

**Level:** 54
**ID:** `vitest-054`
**XP:** 100
**Tags:** `mockImplementationOnce`, `vi.fn`, `conditional`

## Objective

Use mockImplementationOnce for a one-time custom implementation.

## Story

The first call behaves differently — after that, back to normal.

## Hints
1. expect(() => fetch()).toThrow('timeout')
2. expect(fetch()).toEqual({ data: 'ok' })

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('first throws', () => {
  const fetch = vi.fn()
    .mockImplementationOnce(() => { throw new Error('timeout'); })
    .mockImplementation(() => ({ data: 'ok' }));
  expect(() => fetch()).toThrow('timeout');
  expect(fetch()).toEqual({ data: 'ok' });
});
```

## Explanation

Vitest's `mockImplementationOnce` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('first call throws, subsequent calls succeed', () => {
  const fetch = vi.fn()
    .mockImplementationOnce(() => { throw new Error('timeout'); })
    .mockImplementation(() => ({ data: 'ok' }));

  // TODO: Assert first call throws
  // TODO: Assert second call returns { data: 'ok' }
});
```
