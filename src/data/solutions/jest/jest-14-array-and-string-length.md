# Array and String Length

**Level:** 14
**ID:** `jest-14`
**XP:** 100
**Tags:** `toHaveLength`, `arrays`, `strings`

## Objective

Use toHaveLength on arrays and strings.

## Story

The guild roster must have exactly the right number of members. Use toHaveLength.

## Hints
1. toHaveLength(n) works on arrays, strings, and any object with a .length property.
2. expect([]).toHaveLength(0) — empty array.
3. Also works with .not to assert maximum length.

## Solution

```javascript
const guild=['warrior','mage','rogue'],motto='Unite';
test('guild has 3 members',()=>{expect(guild).toHaveLength(3);});
test('motto has 5 characters',()=>{expect(motto).toHaveLength(5);});
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
const guild = ['warrior', 'mage', 'rogue'];
const motto = 'Unite';

test('guild has 3 members', () => {
  // TODO: Assert that guild has length 3.
});

test('motto has 5 characters', () => {
  // TODO: Assert that motto has length 5.
});
```
