# expect.anything

**Level:** 30
**ID:** `vitest-030`
**XP:** 100
**Tags:** `expect.anything`, `asymmetric`, `null-check`

## Objective

Use expect.anything() to match any defined, non-null value.

## Story

You only care that a value is not null or undefined.

## Hints
1. expect(cb).toHaveBeenCalledWith(expect.anything())
2. expect(null).not.toEqual(expect.anything())

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('called with something', () => {
  const cb = vi.fn();
  cb({ event: 'click' });
  expect(cb).toHaveBeenCalledWith(expect.anything());
});
test('null is not anything', () => {
  expect(null).not.toEqual(expect.anything());
});
```

## Explanation

Vitest's `expect.anything` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('callback is called with something', () => {
  const cb = vi.fn();
  cb({ event: 'click', x: 100, y: 200 });
  // TODO: Assert cb was called with expect.anything()
});

test('anything does not match null', () => {
  // TODO: Assert null does NOT equal expect.anything()
});
```
