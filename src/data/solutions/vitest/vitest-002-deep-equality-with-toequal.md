# Deep Equality with toEqual

**Level:** 2
**ID:** `vitest-002`
**XP:** 100
**Tags:** `toEqual`, `objects`, `deep-equality`

## Objective

Write a test comparing two objects with toEqual.

## Story

A merchant gives you two objects with identical contents. toBe fails — it checks references. Use toEqual.

## Hints
1. toEqual does deep recursive comparison.
2. expect(getUser()).toEqual({ name: 'Alice', age: 30 })

## Solution

```javascript
import { test, expect } from 'vitest';
function getUser() { return { name: 'Alice', age: 30 }; }
test('getUser returns correct shape', () => {
  expect(getUser()).toEqual({ name: 'Alice', age: 30 });
});
```

## Explanation

Vitest's `Deep Equality with toEqual` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

function getUser() {
  return { name: 'Alice', age: 30 };
}

test('getUser returns correct shape', () => {
  // TODO: Assert using .toEqual()
});
```
