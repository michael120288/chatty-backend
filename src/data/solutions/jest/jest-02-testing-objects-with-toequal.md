# Testing Objects with toEqual

**Level:** 2
**ID:** `jest-02`
**XP:** 100
**Tags:** `toEqual`, `objects`, `deep-equality`

## Objective

Write a test that compares two objects with the same shape using toEqual.

## Story

A merchant hands you a mystical object. toBe will fail — it checks references, not contents. You need toEqual to compare object shapes.

## Hints
1. toBe uses reference equality — it fails for objects with the same content but different references.
2. toEqual recursively checks every field.
3. expect(getUser()).toEqual({ name: 'Alice', age: 30 })

## Solution

```javascript
function getUser() { return { name: 'Alice', age: 30 }; }
test('getUser returns correct shape', () => {
  expect(getUser()).toEqual({ name: 'Alice', age: 30 });
});
```

## Explanation

Jest's `describe` groups related tests; `it`/`test` defines a single test case. `expect(received).toBe(expected)` checks strict equality (===).

```
describe('My module', () => {
  it('adds two numbers correctly', () => {
    expect(1 + 2).toBe(3);
  });

  it('returns a string', () => {
    expect(typeof 'hello').toBe('string');
  });
});
```

Tests pass when all `expect` calls succeed. A single failed assertion fails the whole test.

## Starter Code

```javascript
// Given this function:
function getUser() {
  return { name: 'Alice', age: 30 };
}

// Write a test that verifies getUser() returns { name: 'Alice', age: 30 }
test('getUser returns correct shape', () => {
  // TODO: Assert that getUser() deeply equals the expected value using .toEqual().
});
```
