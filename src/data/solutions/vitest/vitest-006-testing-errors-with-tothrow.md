# Testing Errors with toThrow

**Level:** 6
**ID:** `vitest-006`
**XP:** 100
**Tags:** `toThrow`, `errors`, `exceptions`

## Objective

Write a test that verifies a function throws an error.

## Story

A trap in the dungeon throws an error. Use toThrow to verify the trap works correctly.

## Hints
1. Wrap the call in an arrow function: expect(() => fn()).toThrow()
2. Use .not.toThrow() for the second test.

## Solution

```javascript
import { test, expect } from 'vitest';
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
test('throws on division by zero', () => {
  expect(() => divide(1, 0)).toThrow();
});
test('does not throw for valid input', () => {
  expect(() => divide(10, 2)).not.toThrow();
});
```

## Explanation

Vitest's `Testing Errors with toThrow` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

test('throws on division by zero', () => {
  // TODO: Assert that () => divide(1, 0) throws
});

test('does not throw for valid input', () => {
  // TODO: Assert that () => divide(10, 2) does NOT throw
});
```
