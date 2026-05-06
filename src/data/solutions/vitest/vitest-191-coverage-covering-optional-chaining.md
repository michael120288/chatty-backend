# Coverage: covering optional chaining

**Level:** 191
**ID:** `vitest-191`
**XP:** 180
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: covering optional chaining so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: covering optional chaining to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: covering optional chaining` in your test assertions.
2. Check the Vitest docs for `Coverage: covering optional chaining` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function getUserCity(user) {
  return user?.address?.city ?? 'Unknown';
}

function getNestedProp(obj, ...keys) {
  return keys.reduce((acc, key) => acc?.[key], obj) ?? null;
}

test('optional chaining and nullish coalescing', () => {
  expect(getUserCity({ address: { city: 'NYC' } })).toBe('NYC');
  expect(getUserCity({ address: {} })).toBe('Unknown');
  expect(getUserCity({})).toBe('Unknown');
  expect(getUserCity(null)).toBe('Unknown');

  expect(getNestedProp({ a: { b: { c: 42 } } }, 'a', 'b', 'c')).toBe(42);
  expect(getNestedProp({ a: {} }, 'a', 'b', 'c')).toBeNull();
});
```

## Explanation

`Coverage` Write tests to cover optional chaining and nullish coalescing.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getUserCity(user) {
  return user?.address?.city ?? 'Unknown';
}

function getNestedProp(obj, ...keys) {
  return keys.reduce((acc, key) => acc?.[key], obj) ?? null;
}

test('optional chaining and nullish coalescing', () => {
  // TODO: add assertion using Coverage: covering optional chaining
  // TODO: add assertion using Coverage: covering optional chaining
  // TODO: add assertion using Coverage: covering optional chaining
  // TODO: add assertion using Coverage: covering optional chaining

  // TODO: add assertion using Coverage: covering optional chaining
  // TODO: add assertion using Coverage: covering optional chaining
});
```
