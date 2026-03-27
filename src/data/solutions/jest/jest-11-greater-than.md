# Greater Than

**Level:** 11
**ID:** `jest-11`
**XP:** 100
**Tags:** `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `numbers`

## Objective

Use toBeGreaterThan and toBeGreaterThanOrEqual.

## Story

The hero's power must exceed the boss threshold. Prove it with numeric matchers.

## Hints
1. toBeGreaterThan(n) — passes if value > n.
2. toBeGreaterThanOrEqual(n) — passes if value >= n.
3. Works with any numeric values.

## Solution

```javascript
const power=42,threshold=40;
test('power exceeds threshold',()=>{expect(power).toBeGreaterThan(threshold);});
test('power meets minimum',()=>{expect(power).toBeGreaterThanOrEqual(42);});
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
const power = 42;
const threshold = 40;

test('power exceeds threshold', () => {
  // TODO: Assert that power is greater than threshold.
});

test('power meets minimum', () => {
  // TODO: Assert that power is greater than or equal to 42.
});
```
