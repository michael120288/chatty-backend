# mock.calls

**Level:** 47
**ID:** `vitest-047`
**XP:** 100
**Tags:** `mock.calls`, `vi.fn`, `inspection`

## Objective

Use mock.mock.calls to inspect arguments of each call.

## Story

Inspect every recorded call with mock.mock.calls.

## Hints
1. fn.mock.calls is an array of argument arrays.
2. fn.mock.calls[0] is ['a', 1]

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('inspects calls', () => {
  const fn = vi.fn();
  fn('a',1); fn('b',2); fn('c',3);
  expect(fn.mock.calls).toHaveLength(3);
  expect(fn.mock.calls[0][0]).toBe('a');
  expect(fn.mock.calls[1][1]).toBe(2);
});
```

## Explanation

Vitest's `mock.calls` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('inspects call arguments', () => {
  const fn = vi.fn();
  fn('a', 1);
  fn('b', 2);
  fn('c', 3);
  // TODO: Assert fn.mock.calls has length 3
  // TODO: Assert first call first arg is 'a'
  // TODO: Assert second call second arg is 2
});
```
