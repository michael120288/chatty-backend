# describe.each

**Level:** 49
**ID:** `jest-49`
**XP:** 200
**Tags:** `describe.each`, `parameterized`, `groups`

## Objective

Use describe.each to run an entire describe block with different data.

## Story

Multiple character classes need the same test suite. Use describe.each for full group parameterization.

## Hints
1. describe.each([...])(...) runs the full describe block for each row.
2. %s formats a string argument in the describe name.
3. Each row gets its own describe block with all its tests.

## Solution

```javascript
function getAttack(cls){const a={warrior:50,mage:80,rogue:60};return a[cls]||0;}
describe.each([['warrior',50],['mage',80],['rogue',60]])('%s class',(cls,exp)=>{test(`${cls} correct attack`,()=>{expect(getAttack(cls)).toBe(exp);});test(`${cls} attack positive`,()=>{expect(getAttack(cls)).toBeGreaterThan(0);});});
```

## Explanation

`expect(array).toContain(item)` checks that an array includes a value (using `===`).
`expect(array).toContainEqual(obj)` does deep equality for objects in arrays.

```
expect([1, 2, 3]).toContain(2);
expect([{ name: 'Aria' }]).toContainEqual({ name: 'Aria' });
expect('Hello World').toContain('World'); // works on strings too
```

## Starter Code

```javascript
function getAttack(cls) {
  const attacks = { warrior: 50, mage: 80, rogue: 60 };
  return attacks[cls] || 0;
}

describe.each([
  ['warrior', 50],
  ['mage',    80],
  ['rogue',   60],
])('%s class', (cls, expectedAttack) => {
  test(`${cls} has correct attack`, () => {
    // TODO: Assert that getAttack(cls equals expectedAttack using .toBe().
  });

  test(`${cls} attack is positive`, () => {
    // TODO: Assert that getAttack(cls is greater than 0.
  });
});
```
