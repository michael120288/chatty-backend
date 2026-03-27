# Mock setTimeout Callback

**Level:** 252
**ID:** `jest-252`
**XP:** 130
**Tags:** `fake timers`, `setTimeout`, `mock callback`

## Objective

Combine jest.useFakeTimers with a mock callback to verify delayed execution.

## Story

The delayed message must fire after one second. Verify the callback via fake timers.

## Hints
1. Before advancing time, the callback has not run yet.
2. jest.advanceTimersByTime(1000) triggers the 1000ms timeout.
3. Verify both call count and the argument.

## Solution

```javascript
jest.useFakeTimers();

function sendDelayed(message, callback, delay) {
  setTimeout(() => callback(message), delay);
}

test('delayed callback fires', () => {
  const callback = jest.fn();
  sendDelayed('hello', callback, 1000);
  expect(callback).not.toHaveBeenCalled(); // not yet
  jest.advanceTimersByTime(1000);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('hello');
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
jest.useFakeTimers();

function sendDelayed(message, callback, delay) {
  setTimeout(() => callback(message), delay);
}

test('delayed callback fires', () => {
  const callback = jest.fn();
  sendDelayed('hello', callback, 1000);
  expect(callback).not.toHaveBeenCalled(); // not yet
  jest.advanceTimersByTime(1000);
  // TODO: Assert that callback was called exactly 1 times.
  // TODO: Assert that callback was called with the expected arguments.
});
```
