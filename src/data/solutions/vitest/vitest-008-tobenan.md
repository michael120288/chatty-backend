# toBeNaN

**Level:** 8
**ID:** `vitest-008`
**XP:** 100
**Tags:** `toBeNaN`, `NaN`, `numbers`

## Objective

Write tests using toBeNaN and .not.toBeNaN.

## Story

The calculator returns a mysterious result. Is it NaN? Use toBeNaN to find out.

## Hints
1. expect(NaN).toBeNaN()
2. 0/0 in JavaScript evaluates to NaN.

## Solution

```javascript
import { test, expect } from 'vitest';
test('NaN is NaN', () => { expect(NaN).toBeNaN(); });
test('0/0 is NaN', () => { expect(0/0).toBeNaN(); });
test('42 is not NaN', () => { expect(42).not.toBeNaN(); });
```

## Explanation

Vitest's `toBeNaN` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('NaN is NaN', () => {
  // TODO: Assert that NaN toBeNaN
});

test('0/0 is NaN', () => {
  // TODO: Assert that 0/0 is NaN
});

test('42 is not NaN', () => {
  // TODO: Assert 42 is NOT NaN
});
```
