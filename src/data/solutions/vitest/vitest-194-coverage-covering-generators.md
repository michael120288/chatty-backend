# Coverage: covering generators

**Level:** 194
**ID:** `vitest-194`
**XP:** 200
**Tags:** `coverage`, `reporting`

## Objective

Complete the starter code using Coverage: covering generators so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use Coverage: covering generators to implement the missing assertions and make everything pass.

## Hints
1. Use `Coverage: covering generators` in your test assertions.
2. Check the Vitest docs for `Coverage: covering generators` usage examples.
3. A passing test exits with code 0 — all `expect()` calls must succeed.

## Solution

```javascript
import { test, expect } from 'vitest';

function* fibonacci(limit) {
  let a = 0, b = 1;
  while (a <= limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

test('fibonacci generator', () => {
  expect([...fibonacci(20)]).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  expect([...fibonacci(0)]).toEqual([0]);
  expect([...fibonacci(-1)]).toEqual([]);
});

test('range generator', () => {
  expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4]);
  expect([...range(0, 10, 2)]).toEqual([0, 2, 4, 6, 8]);
  expect([...range(5, 5)]).toEqual([]);
});
```

## Explanation

`Coverage` Write tests that exercise generator functions.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function* fibonacci(limit) {
  let a = 0, b = 1;
  while (a <= limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

test('fibonacci generator', () => {
  // TODO: add assertion using Coverage: covering generators
  // TODO: add assertion using Coverage: covering generators
  // TODO: add assertion using Coverage: covering generators
});

test('range generator', () => {
  // TODO: add assertion using Coverage: covering generators
  // TODO: add assertion using Coverage: covering generators
  // TODO: add assertion using Coverage: covering generators
});
```
