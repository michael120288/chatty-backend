# toHaveBeenCalledTimes

**Level:** 48
**ID:** `vitest-048`
**XP:** 100
**Tags:** `toHaveBeenCalledTimes`, `vi.fn`, `call-count`

## Objective

Use toHaveBeenCalledTimes to assert call count.

## Story

Verify exactly how many times the mock was summoned.

## Hints
1. expect(mock).toHaveBeenCalledTimes(3)
2. expect(mock).toHaveBeenCalledTimes(0)

## Solution

```javascript
import { test, expect, vi } from 'vitest';
function runThrice(fn) { fn(); fn(); fn(); }
test('three times', () => {
  const mock = vi.fn();
  runThrice(mock);
  expect(mock).toHaveBeenCalledTimes(3);
});
test('not called', () => {
  const mock = vi.fn();
  expect(mock).toHaveBeenCalledTimes(0);
});
```

## Explanation

Vitest's `toHaveBeenCalledTimes` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function runThrice(fn) {
  fn(); fn(); fn();
}

test('called exactly three times', () => {
  const mock = vi.fn();
  runThrice(mock);
  // TODO: Assert mock was called 3 times
});

test('not called without invocation', () => {
  const mock = vi.fn();
  // TODO: Assert mock was called 0 times
});
```
