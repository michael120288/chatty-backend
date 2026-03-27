# Mock Functions with jest.fn()

**Level:** 7
**ID:** `jest-07`
**XP:** 150
**Tags:** `jest.fn`, `mocks`, `toHaveBeenCalled`

## Objective

Create a jest.fn() mock, call it, and assert it was called with the correct arguments.

## Story

A spy has infiltrated the enemy ranks. Create a mock function, call it, and use Jest matchers to verify it was called with the right arguments.

## Hints
1. jest.fn() creates a mock that tracks all calls.
2. toHaveBeenCalled() — passes if called at least once.
3. toHaveBeenCalledWith(arg1, arg2) — checks the exact arguments.
4. toHaveBeenCalledTimes(n) — checks the exact call count.

## Solution

```javascript
const spyFn = jest.fn();
spyFn('hello', 42);
test('mock was called', () => { expect(spyFn).toHaveBeenCalled(); });
test('mock was called with correct args', () => { expect(spyFn).toHaveBeenCalledWith('hello', 42); });
test('mock was called exactly once', () => { expect(spyFn).toHaveBeenCalledTimes(1); });
```

## Explanation

`expect(value).toEqual(expected)` does a **deep equality** check — it compares object/array contents recursively, unlike `toBe` which uses `===`.

```
expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] }); // passes
expect({ a: 1 }).toBe({ a: 1 });                           // FAILS (different object refs)
```

## Starter Code

```javascript
// Create a mock function
const spyFn = jest.fn();

// Call it
spyFn('hello', 42);

test('mock was called', () => {
  // TODO: Assert that spyFn was called.
});

test('mock was called with correct args', () => {
  // TODO: Assert that spyFn was called with the expected arguments.
});

test('mock was called exactly once', () => {
  // TODO: Assert that spyFn was called exactly 1 times.
});
```
