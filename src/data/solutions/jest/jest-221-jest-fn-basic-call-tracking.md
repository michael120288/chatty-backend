# jest.fn() — Basic Call Tracking

**Level:** 221
**ID:** `jest-221`
**XP:** 100
**Tags:** `jest.fn`, `call tracking`, `basics`

## Objective

Create a jest.fn() and verify it was called.

## Story

The sentinel must record every visitor. Create a basic mock function and verify calls.

## Hints
1. jest.fn() creates a function that records every call.
2. toHaveBeenCalledTimes(n) checks total call count.
3. toHaveBeenCalledWith checks at least one call had those args.

## Solution

```javascript
test('basic mock tracking', () => {
  const greet = jest.fn();
  greet('Alice');
  greet('Bob');
  expect(greet).toHaveBeenCalledTimes(2);
  expect(greet).toHaveBeenCalledWith('Alice');
  expect(greet).toHaveBeenCalledWith('Bob');
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
test('basic mock tracking', () => {
  const greet = jest.fn();
  greet('Alice');
  greet('Bob');
  // TODO: Assert that greet was called exactly 2 times.
  // TODO: Assert that greet was called with the expected arguments.
});
```
