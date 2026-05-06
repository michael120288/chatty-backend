# Coverage: testing middleware chains

**Level:** 199
**ID:** `vitest-199`
**XP:** 220
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: testing middleware chains so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: testing middleware chains to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: testing middleware chains` in your test assertions.
2. Check the Vitest docs for `Coverage: testing middleware chains` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function compose(...fns) {
  return (ctx) => {
    let i = 0;
    const next = () => {
      if (i >= fns.length) return;
      fns[i++](ctx, next);
    };
    next();
    return ctx;
  };
}

test('middleware pipeline coverage', () => {
  const calls = [];
  const m1 = (ctx, next) => { calls.push('m1:before'); next(); calls.push('m1:after'); };
  const m2 = (ctx, next) => { calls.push('m2'); ctx.value *= 2; next(); };
  const m3 = (ctx, next) => { calls.push('m3'); ctx.value += 1; };

  const ctx = { value: 5 };
  compose(m1, m2, m3)(ctx);

  expect(calls).toEqual(['m1:before', 'm2', 'm3', 'm1:after']);
  expect(ctx.value).toBe(11);
});

test('empty middleware pipeline', () => {
  const ctx = { value: 42 };
  const result = compose()(ctx);
  expect(result).toBe(ctx);
  expect(result.value).toBe(42);
});
```

## Explanation

`Coverage` Achieve full coverage of a middleware pipeline.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

function compose(...fns) {
  return (ctx) => {
    let i = 0;
    const next = () => {
      if (i >= fns.length) return;
      fns[i++](ctx, next);
    };
    next();
    return ctx;
  };
}

test('middleware pipeline coverage', () => {
  const calls = [];
  const m1 = (ctx, next) => { calls.push('m1:before'); next(); calls.push('m1:after'); };
  const m2 = (ctx, next) => { calls.push('m2'); ctx.value *= 2; next(); };
  const m3 = (ctx, next) => { calls.push('m3'); ctx.value += 1; };

  const ctx = { value: 5 };
  compose(m1, m2, m3)(ctx);

  // TODO: add assertion using Coverage: testing middleware chains
  // TODO: add assertion using Coverage: testing middleware chains
});

test('empty middleware pipeline', () => {
  const ctx = { value: 42 };
  const result = compose()(ctx);
  // TODO: add assertion using Coverage: testing middleware chains
  // TODO: add assertion using Coverage: testing middleware chains
});
```
