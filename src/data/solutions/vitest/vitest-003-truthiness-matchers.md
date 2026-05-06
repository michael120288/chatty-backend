# Truthiness Matchers

**Level:** 3
**ID:** `vitest-003`
**XP:** 100
**Tags:** `toBeNull`, `toBeTruthy`, `toBeFalsy`, `toBeUndefined`

## Objective

Write four tests using truthiness matchers.

## Story

The Oracle speaks in truths and falsehoods. Master toBeTruthy, toBeFalsy, toBeNull, and toBeUndefined.

## Hints
1. toBeNull() — only passes for null.
2. toBeTruthy() / toBeFalsy() — use JS boolean coercion.

## Solution

```javascript
import { test, expect } from 'vitest';
test('null is null', () => { expect(null).toBeNull(); });
test('undefined is undefined', () => { expect(undefined).toBeUndefined(); });
test('1 is truthy', () => { expect(1).toBeTruthy(); });
test('0 is falsy', () => { expect(0).toBeFalsy(); });
```

## Explanation

Vitest's `Truthiness Matchers` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('null is null', () => {
  // TODO: expect null to be null
});

test('undefined is undefined', () => {
  // TODO: expect undefined to be undefined
});

test('1 is truthy', () => {
  // TODO: expect 1 to be truthy
});

test('0 is falsy', () => {
  // TODO: expect 0 to be falsy
});
```
