# jest.clearAllMocks vs jest.resetAllMocks

**Level:** 240
**ID:** `jest-240`
**XP:** 120
**Tags:** `clearAllMocks`, `resetAllMocks`, `cleanup`

## Objective

Understand clearAllMocks (clears calls) vs resetAllMocks (also removes implementations).

## Story

Keep the dungeon testing environment pristine. Know which cleanup to use.

## Hints
1. clearAllMocks = reset calls/instances/results only.
2. resetAllMocks = clearAllMocks + remove all mock implementations.
3. restoreAllMocks = resetAllMocks + restore original spied functions.

## Solution

```javascript
test('clearAllMocks preserves implementation', () => {
  const fn = jest.fn().mockReturnValue(42);
  fn();
  expect(fn).toHaveBeenCalledTimes(1);
  jest.clearAllMocks();
  expect(fn).toHaveBeenCalledTimes(0); // calls cleared
  expect(fn()).toBe(42); // implementation preserved
});

test('resetAllMocks removes implementation', () => {
  const fn = jest.fn().mockReturnValue(42);
  fn();
  jest.resetAllMocks();
  expect(fn).toHaveBeenCalledTimes(0); // calls cleared
  expect(fn()).toBeUndefined(); // implementation gone
});
```

## Explanation

Complex mock setups with implementation per call:

```
const mockFn = jest.fn()
  .mockReturnValueOnce('first')   // first call returns 'first'
  .mockReturnValueOnce('second')  // second call returns 'second'
  .mockReturnValue('default');    // all subsequent calls

expect(mockFn()).toBe('first');
expect(mockFn()).toBe('second');
expect(mockFn()).toBe('default');
```

## Starter Code

```javascript
test('clearAllMocks preserves implementation', () => {
  const fn = jest.fn().mockReturnValue(42);
  fn();
  expect(fn).toHaveBeenCalledTimes(1);
  jest.clearAllMocks();
  // TODO: Assert that fn was called exactly 0 times.
  // TODO: Assert that fn() equals 42 using .toBe().
});

test('resetAllMocks removes implementation', () => {
  const fn = jest.fn().mockReturnValue(42);
  fn();
  jest.resetAllMocks();
  // TODO: Assert that fn was called exactly 0 times.
  // TODO: Assert that fn() is undefined.
});
```
