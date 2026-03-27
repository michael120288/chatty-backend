# mockReturnValue — Always Same

**Level:** 226
**ID:** `jest-226`
**XP:** 100
**Tags:** `mockReturnValue`, `jest.fn`

## Objective

Use mockReturnValue to always return the same value.

## Story

The blessed sword always returns 100 power. Set a permanent mock return.

## Hints
1. mockReturnValue sets the default return value for all calls.
2. Unlike mockReturnValueOnce, it never expires.
3. Call it as many times as you want — always returns the same.

## Solution

```javascript
test('permanent return value', () => {
  const getPower = jest.fn().mockReturnValue(100);
  expect(getPower()).toBe(100);
  expect(getPower()).toBe(100);
  expect(getPower()).toBe(100);
  expect(getPower).toHaveBeenCalledTimes(3);
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
test('permanent return value', () => {
  const getPower = jest.fn().mockReturnValue(100);
  // TODO: Assert that getPower() equals 100 using .toBe().
  // TODO: Assert that getPower was called exactly 3 times.
});
```
