# jest.fn() — Return Value

**Level:** 222
**ID:** `jest-222`
**XP:** 100
**Tags:** `jest.fn`, `return value`

## Objective

Use jest.fn(() => value) to create a mock with a fixed return.

## Story

The oracle must always speak the same truth. Set a fixed return value.

## Hints
1. Pass a function to jest.fn() to define the implementation.
2. jest.fn(() => 42) returns 42 on every call.
3. This is equivalent to jest.fn().mockImplementation(() => 42).

## Solution

```javascript
test('mock with return', () => {
  const getLevel = jest.fn(() => 42);
  expect(getLevel()).toBe(42);
  expect(getLevel()).toBe(42);
  expect(getLevel).toHaveBeenCalledTimes(2);
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
test('mock with return', () => {
  const getLevel = jest.fn(() => 42);
  // TODO: Assert that getLevel() equals 42 using .toBe().
  // TODO: Assert that getLevel was called exactly 2 times.
});
```
