# toStrictEqual vs toEqual

**Level:** 7
**ID:** `vitest-007`
**XP:** 100
**Tags:** `toStrictEqual`, `toEqual`, `undefined`, `objects`

## Objective

Demonstrate the difference between toEqual and toStrictEqual.

## Story

Two objects look the same — but one has an undefined property. toStrictEqual notices the difference.

## Hints
1. toEqual treats missing and undefined properties as equal.
2. toStrictEqual checks for undefined keys explicitly.

## Solution

```javascript
import { test, expect } from 'vitest';
test('toEqual ignores undefined properties', () => {
  expect({ a: 1, b: undefined }).toEqual({ a: 1 });
});
test('toStrictEqual distinguishes undefined properties', () => {
  expect({ a: 1, b: undefined }).not.toStrictEqual({ a: 1 });
});
```

## Explanation

Vitest's `toStrictEqual vs toEqual` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('toEqual ignores undefined properties', () => {
  // TODO: Show { a: 1, b: undefined } toEqual { a: 1 } passes
});

test('toStrictEqual distinguishes undefined properties', () => {
  // TODO: Show { a: 1, b: undefined } does NOT toStrictEqual { a: 1 }
});
```
