# toStrictEqual

**Level:** 56
**ID:** `jest-56`
**XP:** 150
**Tags:** `toStrictEqual`, `toEqual`, `strict`

## Objective

Understand the difference between toEqual and toStrictEqual.

## Story

The shapeshifter appears identical but its true type betrays it. Use toStrictEqual.

## Hints
1. toStrictEqual checks object types (class matters).
2. toStrictEqual distinguishes sparse arrays from arrays with undefined.
3. Use toEqual for general deep equality, toStrictEqual when class identity matters.

## Solution

```javascript
test('toEqual ignores undefined',()=>{expect({a:1,b:undefined}).toEqual({a:1});});
test('toStrictEqual class instances',()=>{class A{constructor(){this.x=1;}}class B{constructor(){this.x=1;}}expect(new A()).not.toStrictEqual(new B());});
test('toStrictEqual sparse arrays',()=>{expect([1,,3]).not.toStrictEqual([1,undefined,3]);});
```

## Explanation

`jest.mock` with a factory function lets you control exactly what a module exports:

```
jest.mock('../utils/logger', () => ({
  log: jest.fn(),
  error: jest.fn(),
}));

import { log } from '../utils/logger';
log('test');
expect(log).toHaveBeenCalledWith('test');
```

## Starter Code

```javascript
test('toEqual ignores undefined properties', () => {
  // toEqual passes here — it ignores missing vs undefined
  expect({ a: 1, b: undefined }).toEqual({ a: 1 });
});

test('toStrictEqual distinguishes class instances', () => {
  class A { constructor() { this.x = 1; } }
  class B { constructor() { this.x = 1; } }
  const a = new A();
  const b = new B();
  // TODO: Assert that a does not strictly equal the expected value using .not.toStrictEqual().
});

test('toStrictEqual treats sparse arrays differently', () => {
  // TODO: Assert that [1,,3] does not strictly equal the expected value using .not.toStrictEqual().
});
```
