# mock.calls — Inspecting Arguments

**Level:** 223
**ID:** `jest-223`
**XP:** 110
**Tags:** `mock.calls`, `jest.fn`, `inspect`

## Objective

Use mock.calls to inspect all arguments from every call.

## Story

Review every visitor's exact entry in the log. Inspect mock.calls directly.

## Hints
1. mock.calls is an array: [[arg1, arg2], [arg1, arg2], ...].
2. mock.calls[0] is the first call's argument array.
3. mock.calls[2][0] is the first argument of the third call.

## Solution

```javascript
test('inspect mock.calls', () => {
  const log = jest.fn();
  log('hero', 1);
  log('hero', 2);
  log('villain', 3);
  // mock.calls is an array of argument arrays
  expect(log.mock.calls).toHaveLength(3);
  expect(log.mock.calls[0]).toEqual(['hero', 1]);
  expect(log.mock.calls[2][0]).toBe('villain');
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
test('inspect mock.calls', () => {
  const log = jest.fn();
  log('hero', 1);
  log('hero', 2);
  log('villain', 3);
  // mock.calls is an array of argument arrays
  // TODO: Assert that log.mock.calls has length 3.
  // TODO: Assert that log.mock.calls[0] deeply equals the expected value using .toEqual().
  // TODO: Assert that log.mock.calls[2][0] equals 'villain' using .toBe().
});
```
