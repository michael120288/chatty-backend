# Spy on Math.random()

**Level:** 242
**ID:** `jest-242`
**XP:** 120
**Tags:** `spyOn`, `Math.random`, `global`

## Objective

Use jest.spyOn on Math.random and verify functions that use it.

## Story

The dungeon dice is rigged. Control Math.random() with a spy.

## Hints
1. Math.random() returns [0, 1). 0.5 * 6 = 3.0, floor = 3, +1 = 4.
2. 0 → minimum roll of 1; just below 1 → maximum of 6.
3. Always restore after spying on global methods.

## Solution

```javascript
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

test('controlled dice roll', () => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
  // 0.5 * 6 = 3, floor = 3, + 1 = 4
  expect(rollDice()).toBe(4);
  expect(spy).toHaveBeenCalled();
  spy.mockRestore();
});

test('minimum roll', () => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
  expect(rollDice()).toBe(1);
  spy.mockRestore();
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
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

test('controlled dice roll', () => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(0.5);
  // 0.5 * 6 = 3, floor = 3, + 1 = 4
  // TODO: Assert that rollDice() equals 4 using .toBe().
  // TODO: Assert that spy was called.
  spy.mockRestore();
});

test('minimum roll', () => {
  const spy = jest.spyOn(Math, 'random').mockReturnValue(0);
  // TODO: Assert that rollDice() equals 1 using .toBe().
  spy.mockRestore();
});
```
