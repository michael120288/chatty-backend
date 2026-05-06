# mock.results

**Level:** 57
**ID:** `vitest-057`
**XP:** 100
**Tags:** `mock.results`, `vi.fn`, `return-inspection`

## Objective

Use mock.mock.results to inspect return values.

## Story

Not just what was called with — but what was returned.

## Hints
1. square.mock.results is an array of { type, value } objects.
2. type is 'return', 'throw', or 'incomplete'.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('results', () => {
  const square = vi.fn(n => n * n);
  square(2); square(3); square(4);
  expect(square.mock.results[0].value).toBe(4);
  expect(square.mock.results[1].value).toBe(9);
  expect(square.mock.results[2].value).toBe(16);
});
```

## Explanation

Vitest's `mock.results` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('inspects return values', () => {
  const square = vi.fn(n => n * n);
  square(2); square(3); square(4);

  // TODO: Assert mock.results[0].value === 4
  // TODO: Assert mock.results[1].value === 9
  // TODO: Assert mock.results[2].value === 16
});
```
