# toBeTypeOf — Vitest Exclusive

**Level:** 22
**ID:** `vitest-022`
**XP:** 100
**Tags:** `toBeTypeOf`, `typeof`, `vitest-exclusive`

## Objective

Use toBeTypeOf to verify the types of various values.

## Story

Vitest adds toBeTypeOf — a clean way to check typeof without string comparison.

## Hints
1. toBeTypeOf accepts: 'string', 'number', 'boolean', 'object', 'function', 'undefined', 'bigint', 'symbol'

## Solution

```javascript
import { test, expect } from 'vitest';
test('42 is a number', () => { expect(42).toBeTypeOf('number'); });
test('string', () => { expect('hello').toBeTypeOf('string'); });
test('boolean', () => { expect(true).toBeTypeOf('boolean'); });
test('function', () => { expect(() => {}).toBeTypeOf('function'); });
```

## Explanation

Vitest's `toBeTypeOf` is a powerful testing utility.

## Starter Code

```javascript
import { test, expect } from 'vitest';

test('42 is a number', () => {
  // TODO: expect(42).toBeTypeOf('number')
});

test('"hello" is a string', () => {
  // TODO: check type
});

test('true is a boolean', () => {
  // TODO: check type
});

test('function is a function', () => {
  // TODO: check type of () => {}
});
```
