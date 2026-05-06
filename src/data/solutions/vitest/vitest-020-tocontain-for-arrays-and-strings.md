# toContain for Arrays and Strings

**Level:** 20
**ID:** `vitest-020`
**XP:** 100
**Tags:** `toContain`, `arrays`, `strings`

## Objective

Use toContain for both an array element and a string substring.

## Story

Check that an item exists in a collection or a character exists in a string.

## Hints
1. expect(array).toContain('banana')
2. expect(path).toContain('/users/')

## Solution

```javascript
import { test, expect } from 'vitest';
test('array contains target', () => {
  expect(['apple', 'banana', 'cherry']).toContain('banana');
});
test('string contains substring', () => {
  expect('/users/42/profile').toContain('/users/');
});
```

## Explanation

Vitest's `toContain for Arrays and Strings` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('array contains target', () => {
  const fruits = ['apple', 'banana', 'cherry'];
  // TODO: Assert 'banana' is in the array
});

test('string contains substring', () => {
  const path = '/users/42/profile';
  // TODO: Assert path contains '/users/'
});
```
