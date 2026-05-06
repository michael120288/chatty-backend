# expect.assertions()

**Level:** 11
**ID:** `vitest-011`
**XP:** 100
**Tags:** `expect.assertions`, `callbacks`, `async`

## Objective

Write a test for callback-based async code using the Promise wrapper pattern (Vitest v2+).

## Story

An async test might silently pass without running its assertions. Tell Vitest exactly how many assertions to expect, and wrap your callback in a Promise so Vitest can track it.

## Hints
1. Vitest v2 removed `done()` callback support — use `return new Promise(...)` instead.
2. Return the Promise from the test body: `return new Promise((resolve) => { ... })`.
3. Call `fetchData(callback)` inside the Promise, run your assertions, then call `resolve()`.

## Solution

```javascript
import { test, expect } from 'vitest';

function fetchData(callback) {
  setTimeout(() => callback(null, 'data'), 0);
}

test('callback receives data', () => {
  expect.assertions(2);
  return new Promise((resolve) => {
    fetchData((err, data) => {
      expect(err).toBeNull();
      expect(data).toBe('data');
      resolve();
    });
  });
});
```

## Explanation

Vitest's `expect.assertions()` guarantees that a specific number of assertions ran — if the callback is never invoked, the test fails. Since Vitest v2 dropped `done()` support, wrap callback-based code in a `Promise` and `return` it from the test so Vitest waits for it to resolve.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function fetchData(callback) {
  setTimeout(() => callback(null, 'data'), 0);
}

test('callback receives data', () => {
  expect.assertions(2);
  // TODO: return a new Promise that calls fetchData with a callback.
  // In the callback, assert error is null and data equals 'data', then resolve().
});
```
