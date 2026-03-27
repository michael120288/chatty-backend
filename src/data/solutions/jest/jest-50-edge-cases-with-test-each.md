# Edge Cases with test.each

**Level:** 50
**ID:** `jest-50`
**XP:** 150
**Tags:** `test.each`, `edge-cases`, `clamp`

## Objective

Use test.each to cover boundary/edge cases for a function.

## Story

Test the boundaries of the dungeon walls — 0, negative, max values.

## Hints
1. test.each is perfect for boundary testing.
2. Boundaries (min, max) and out-of-range values are classic edge cases.
3. Document expected values clearly in the test name format string.

## Solution

```javascript
function clamp(v,min,max){return Math.min(Math.max(v,min),max);}
test.each([[5,0,10,5],[-5,0,10,0],[15,0,10,10],[0,0,10,0],[10,0,10,10]])('clamp(%i,%i,%i)=%i',(v,min,max,exp)=>{expect(clamp(v,min,max)).toBe(exp);});
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
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

test.each([
  [5,  0, 10,  5],  // within range
  [-5, 0, 10,  0],  // below min
  [15, 0, 10, 10],  // above max
  [0,  0, 10,  0],  // at min boundary
  [10, 0, 10, 10],  // at max boundary
])(
  'clamp(%i, %i, %i) = %i',
  (value, min, max, expected) => {
    // TODO: Assert that clamp(value, min, max equals expected using .toBe().
  }
);
```
