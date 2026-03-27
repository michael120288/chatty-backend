# describe() and Grouping

**Level:** 10
**ID:** `jest-10`
**XP:** 200
**Tags:** `describe`, `grouping`, `structure`

## Objective

Use describe() to group tests for a calculator's add and multiply functions.

## Story

A grand library organizes its tomes by subject. Use describe() to group related tests and give your test suite clarity and structure.

## Hints
1. describe('add', () => { test(...); test(...); })
2. Each describe block creates a named scope for related tests.
3. You can nest describe blocks for further organization.

## Solution

```javascript
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
describe('add', () => {
  test('1+2 is 3', () => { expect(add(1,2)).toBe(3); });
  test('0+0 is 0', () => { expect(add(0,0)).toBe(0); });
});
describe('multiply', () => {
  test('2*3 is 6', () => { expect(multiply(2,3)).toBe(6); });
  test('0*5 is 0', () => { expect(multiply(0,5)).toBe(0); });
});
```

## Explanation

`expect(value).toEqual(expected)` does a **deep equality** check — it compares object/array contents recursively, unlike `toBe` which uses `===`.

```
expect({ a: 1, b: [2, 3] }).toEqual({ a: 1, b: [2, 3] }); // passes
expect({ a: 1 }).toBe({ a: 1 });                           // FAILS (different object refs)
```

## Starter Code

```javascript
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

// TODO: Create a describe('add', ...) block with at least 2 tests
// TODO: Create a describe('multiply', ...) block with at least 2 tests
```
