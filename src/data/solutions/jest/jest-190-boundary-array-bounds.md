# Boundary: Array Bounds

**Level:** 190
**ID:** `jest-190`
**XP:** 120
**Tags:** `boundary`, `arrays`, `edge cases`

## Objective

Test a function at array boundaries: empty, one element, full.

## Story

The dungeon corridor has 0 to 100 items. Test the array at its limits.

## Hints
1. Empty array is always a boundary case.
2. One element: first and last are the same.
3. toEqual for object comparison.

## Solution

```javascript
function firstAndLast(a){if(a.length===0)return{first:null,last:null};return{first:a[0],last:a[a.length-1]};}
test('empty array',()=>{expect(firstAndLast([])).toEqual({first:null,last:null});});
test('one element',()=>{expect(firstAndLast(['X'])).toEqual({first:'X',last:'X'});});
test('multiple elements',()=>{expect(firstAndLast(['A','B','C'])).toEqual({first:'A',last:'C'});});
```

## Explanation

Testing with `within` for scoped queries:

```
import { within } from '@testing-library/react';

const card = screen.getByText('Jest Unit Testing').closest('.track-card');
const { getByText } = within(card);
expect(getByText('3 Levels')).toBeInTheDocument();
expect(getByText('0 / 3 complete')).toBeInTheDocument();
```

`within(element)` scopes all queries to that element — useful for testing repeated patterns like cards.

## Starter Code

```javascript
function firstAndLast(arr) {
  if (arr.length === 0) return { first: null, last: null };
  return { first: arr[0], last: arr[arr.length - 1] };
}

test('empty array', () => {
  // TODO: Assert that firstAndLast([] deeply equals the expected value using .toEqual().
});

test('one element', () => {
  // TODO: Assert that firstAndLast(['X'] deeply equals the expected value using .toEqual().
});

test('multiple elements', () => {
  // TODO: Assert that firstAndLast(['A', 'B', 'C'] deeply equals the expected value using .toEqual().
});
```
