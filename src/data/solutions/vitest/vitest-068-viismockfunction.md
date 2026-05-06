# vi.isMockFunction

**Level:** 68
**ID:** `vitest-068`
**XP:** 100
**Tags:** `vi.isMockFunction`, `type-check`, `mocks`

## Objective

Use vi.isMockFunction() to distinguish mocks from real functions.

## Story

Check programmatically whether a function is a mock.

## Hints
1. vi.isMockFunction(fn) returns boolean.
2. Both vi.fn() and vi.spyOn() produce mocks.

## Solution

```javascript
import { test, expect, vi } from 'vitest';
test('isMockFunction', () => {
  const realFn = () => 42;
  const mockFn = vi.fn();
  const obj = { greet: () => 'hi' };
  const spy = vi.spyOn(obj, 'greet');
  expect(vi.isMockFunction(realFn)).toBe(false);
  expect(vi.isMockFunction(mockFn)).toBe(true);
  expect(vi.isMockFunction(spy)).toBe(true);
});
```

## Explanation

Vitest's `vi.isMockFunction` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect, vi } from 'vitest';

test('isMockFunction distinguishes mocks', () => {
  const realFn = () => 42;
  const mockFn = vi.fn();
  const spy = vi.spyOn({ greet: () => 'hi' }, 'greet');

  // TODO: Assert realFn is NOT a mock
  // TODO: Assert mockFn IS a mock
  // TODO: Assert spy IS a mock
});
```
