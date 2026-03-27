# Mock Event Listener

**Level:** 251
**ID:** `jest-251`
**XP:** 130
**Tags:** `addEventListener`, `mock`, `event`

## Objective

Mock an event listener registration and verify the handler was attached.

## Story

The dungeon door emits events. Mock addEventListener and verify registration.

## Hints
1. Mock the DOM-like element with jest.fn() for addEventListener.
2. toHaveBeenCalledWith(event, handler) checks both arguments.
3. Useful for testing code that wires up events.

## Solution

```javascript
function attachAlarm(element, handler) {
  element.addEventListener('breach', handler);
  element.addEventListener('clear', handler);
}

test('alarm attached', () => {
  const el = { addEventListener: jest.fn() };
  const handler = jest.fn();
  attachAlarm(el, handler);
  expect(el.addEventListener).toHaveBeenCalledTimes(2);
  expect(el.addEventListener).toHaveBeenCalledWith('breach', handler);
  expect(el.addEventListener).toHaveBeenCalledWith('clear', handler);
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
function attachAlarm(element, handler) {
  element.addEventListener('breach', handler);
  element.addEventListener('clear', handler);
}

test('alarm attached', () => {
  const el = { addEventListener: jest.fn() };
  const handler = jest.fn();
  attachAlarm(el, handler);
  // TODO: Assert that el.addEventListener was called exactly 2 times.
  // TODO: Assert that el.addEventListener was called with the expected arguments.
});
```
