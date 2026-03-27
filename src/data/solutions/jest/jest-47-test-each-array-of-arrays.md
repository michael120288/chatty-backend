# test.each — Array of Arrays

**Level:** 47
**ID:** `jest-47`
**XP:** 150
**Tags:** `test.each`, `parameterized`, `table`

## Objective

Use test.each with an array of arrays for parameterized tests.

## Story

The alchemist needs to verify the same formula with many ingredients. Use test.each.

## Hints
1. test.each([[a,b,result], ...]) runs a test for each row.
2. %i in the name is replaced with the integer argument.
3. Parameters are passed in order to the test callback.

## Solution

```javascript
function add(a,b){return a+b;}
test.each([[1,2,3],[0,0,0],[-1,1,0],[100,200,300]])('add(%i,%i) equals %i',(a,b,expected)=>{expect(add(a,b)).toBe(expected);});
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
function add(a, b) { return a + b; }

test.each([
  [1, 2, 3],
  [0, 0, 0],
  [-1, 1, 0],
  [100, 200, 300],
])(
  // TODO: Assert that add(a, b equals expected using .toBe().
);
```
