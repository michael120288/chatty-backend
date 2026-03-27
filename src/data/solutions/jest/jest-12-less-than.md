# Less Than

**Level:** 12
**ID:** `jest-12`
**XP:** 100
**Tags:** `toBeLessThan`, `toBeLessThanOrEqual`, `numbers`

## Objective

Use toBeLessThan and toBeLessThanOrEqual.

## Story

The dungeon temperature must stay below danger levels. Use less-than matchers.

## Hints
1. toBeLessThan(n) — passes if value < n.
2. toBeLessThanOrEqual(n) — passes if value <= n.
3. Combine with not to assert ranges.

## Solution

```javascript
const temp=36;
test('temp below danger',()=>{expect(temp).toBeLessThan(37);});
test('temp within safe limit',()=>{expect(temp).toBeLessThanOrEqual(36);});
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
const temp = 36;

test('temp below danger', () => {
  // TODO: Assert that temp is less than 37.
});

test('temp within safe limit', () => {
  // TODO: Assert that temp is less than or equal to 36.
});
```
