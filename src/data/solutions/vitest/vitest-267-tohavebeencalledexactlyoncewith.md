# toHaveBeenCalledExactlyOnceWith

**Level:** 267
**ID:** `vitest-267`
**XP:** 200
**Tags:** `spying`, `assertions`

## Objective

Complete the starter code using toHaveBeenCalledExactlyOnceWith so all tests run and pass with exit code 0.

## Story

The test suite is incomplete. Use toHaveBeenCalledExactlyOnceWith to implement the missing assertions and make everything pass.

## Hints
1. Section 17: Missing API Coverage

## Solution

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveBeenCalledExactlyOnceWith — basic usage', () => {
  const greet = vi.fn();
  greet('Alice');
  expect(greet).toHaveBeenCalledExactlyOnceWith('Alice');
});

test('fails if called more than once', () => {
  const fn = vi.fn();
  fn(1); fn(1);
  expect(fn).not.toHaveBeenCalledExactlyOnceWith(1);
});

test('logger called exactly once with correct message', () => {
  const logger = { warn: vi.fn() };
  function checkAge(age) {
    if (age < 18) logger.warn('User is underage', { age });
  }
  checkAge(15);
  expect(logger.warn).toHaveBeenCalledExactlyOnceWith('User is underage', { age: 15 });
});

test('event emitter fires exactly once on trigger', () => {
  const emit = vi.fn();
  function triggerOnce(emitter) { emitter('click', { x: 10, y: 20 }); }
  triggerOnce(emit);
  expect(emit).toHaveBeenCalledExactlyOnceWith('click', { x: 10, y: 20 });
});

test('not.toHaveBeenCalledExactlyOnceWith when args differ', () => {
  const save = vi.fn();
  save({ id: 1, name: 'Bob' });
  expect(save).not.toHaveBeenCalledExactlyOnceWith({ id: 2, name: 'Alice' });
  expect(save).toHaveBeenCalledExactlyOnceWith({ id: 1, name: 'Bob' });
});
```

## Explanation

`toHaveBeenCalledExactlyOnceWith` Assert a mock was called exactly one time AND with specific arguments — combines count and argument checks.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('toHaveBeenCalledExactlyOnceWith — basic usage', () => {
  const greet = vi.fn();
  greet('Alice');
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
});

test('fails if called more than once', () => {
  const fn = vi.fn();
  fn(1);
  // calling again means it's NOT called exactly once
  // so we use .not to verify that behavior
  fn(1);
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
});

test('logger called exactly once with correct message', () => {
  const logger = { warn: vi.fn() };

  function checkAge(age) {
    if (age < 18) logger.warn('User is underage', { age });
  }

  checkAge(15);
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
});

test('event emitter fires exactly once on trigger', () => {
  const emit = vi.fn();

  function triggerOnce(emitter) {
    emitter('click', { x: 10, y: 20 });
  }

  triggerOnce(emit);
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
});

test('not.toHaveBeenCalledExactlyOnceWith when args differ', () => {
  const save = vi.fn();
  save({ id: 1, name: 'Bob' });
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
  // TODO: add assertion using toHaveBeenCalledExactlyOnceWith
});
```
