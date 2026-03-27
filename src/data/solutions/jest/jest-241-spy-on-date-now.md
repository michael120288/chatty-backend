# Spy on Date.now()

**Level:** 241
**ID:** `jest-241`
**XP:** 130
**Tags:** `spyOn`, `Date.now`, `static method`

## Objective

Use jest.spyOn to control Date.now() return value.

## Story

Freeze the dungeon clock at a specific moment. Spy on Date.now().

## Hints
1. jest.spyOn(Date, 'now') spies on the static method.
2. mockReturnValue fixes the timestamp.
3. After mockRestore, Date.now() returns real time again.

## Solution

```javascript
test('control Date.now', () => {
  const now = 1700000000000;
  const spy = jest.spyOn(Date, 'now').mockReturnValue(now);
  expect(Date.now()).toBe(1700000000000);
  expect(Date.now()).toBe(1700000000000);
  spy.mockRestore();
  expect(Date.now()).not.toBe(1700000000000); // real time restored
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
test('control Date.now', () => {
  const now = 1700000000000;
  const spy = jest.spyOn(Date, 'now').mockReturnValue(now);
  // TODO: Assert that Date.now( equals 1700000000000 using .toBe().
  spy.mockRestore();
  // TODO: Assert that Date.now( does not equal 1700000000000 using .not.toBe().
});
```
