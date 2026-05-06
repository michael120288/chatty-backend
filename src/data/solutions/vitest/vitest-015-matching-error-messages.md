# Matching Error Messages

**Level:** 15
**ID:** `vitest-015`
**XP:** 100
**Tags:** `toThrow`, `error-messages`, `RangeError`

## Objective

Use toThrow with a string and a regex to match error messages.

## Story

The trap throws a specific error message. Match it exactly or with a pattern.

## Hints
1. toThrow('exact message')

## Solution

```javascript
import { test, expect } from 'vitest';
function validateAge(age) {
  if (age < 0) throw new RangeError('Age must be non-negative');
  if (age > 150) throw new RangeError('Age is unrealistically large');
  return true;
}
test('throws with message for negative age', () => {
  expect(() => validateAge(-1)).toThrow('Age must be non-negative');
});
test('throws matching regex for large age', () => {
  expect(() => validateAge(200)).toThrow(/unrealistically/);
});
test('throws RangeError type', () => {
  expect(() => validateAge(-1)).toThrow(RangeError);
});
```

## Explanation

Vitest's `Matching Error Messages` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function validateAge(age) {
  if (age < 0) throw new RangeError('Age must be non-negative');
  if (age > 150) throw new RangeError('Age is unrealistically large');
  return true;
}

test('throws with message for negative age', () => {
  // TODO: Assert throws with message 'Age must be non-negative'
});

test('throws matching regex for large age', () => {
  // TODO: Assert throws matching /unrealistically/
});

test('throws RangeError type', () => {
  // TODO: Assert throws RangeError instance
});
```
