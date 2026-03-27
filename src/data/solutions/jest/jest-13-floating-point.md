# Floating Point

**Level:** 13
**ID:** `jest-13`
**XP:** 100
**Tags:** `toBeCloseTo`, `floating-point`, `precision`

## Objective

Use toBeCloseTo for floating point comparison.

## Story

Magic potions blend imprecisely. toBe fails on 0.1+0.2. Use toBeCloseTo.

## Hints
1. toBeCloseTo(n) — checks equality within floating point precision.
2. Second argument is decimal places (default 2).
3. 0.1+0.2 === 0.30000000000000004 in JS.

## Solution

```javascript
test('0.1 + 0.2 is close to 0.3',()=>{expect(0.1+0.2).toBeCloseTo(0.3);});
test('PI approximation',()=>{const pi=22/7;expect(pi).toBeCloseTo(3.14,2);});
```

## Explanation

`expect(fn).toThrow()` asserts that a function throws an error when called. Wrap the call in an arrow function:

```
expect(() => {
  throw new Error('Oops');
}).toThrow('Oops');

expect(() => JSON.parse('invalid')).toThrow(SyntaxError);
```

Never call the function directly — `expect(fn()).toThrow()` would throw before Jest can catch it.

## Starter Code

```javascript
test('0.1 + 0.2 is close to 0.3', () => {
  // TODO: Assert that 0.1 + 0.2 is close to the expected number using .toBeCloseTo().
});

test('PI approximation', () => {
  const pi = 22 / 7;
  // TODO: Assert that pi is close to the expected number using .toBeCloseTo().
});
```
