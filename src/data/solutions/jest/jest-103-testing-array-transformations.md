# Testing Array Transformations

**Level:** 103
**ID:** `jest-103`
**XP:** 110
**Tags:** `map`, `filter`, `toEqual`, `arrays`

## Objective

Test functions that use .map() and .filter() with toEqual.

## Story

The wizard transforms the item list with map and filter. Test the results.

## Hints
1. Use toEqual for deep array comparison.
2. toBe would fail — arrays are different references.
3. Test with empty arrays too for edge case coverage.

## Solution

```javascript
const double=a=>a.map(x=>x*2);const evens=a=>a.filter(x=>x%2===0);
test('double',()=>{expect(double([1,2,3])).toEqual([2,4,6]);});
test('evens',()=>{expect(evens([1,2,3,4,5])).toEqual([2,4]);});
```

## Explanation

Testing Redux-connected components with `@reduxjs/toolkit`:

```
import { render } from '../../test-utils'; // custom render with store
render(<GameHome />, { preloadedState: { game: { levels: [], loading: false } } });
expect(screen.getByText('Loading levels...')).not.toBeInTheDocument();
```

Wrap renders with a custom `render` that provides a real Redux store — avoids brittle mocking.

## Starter Code

```javascript
const double = arr => arr.map(x => x * 2);
const evens = arr => arr.filter(x => x % 2 === 0);

test('double', () => {
  // TODO: Assert that double([1, 2, 3] deeply equals the expected value using .toEqual().
});

test('evens', () => {
  // TODO: Assert that evens([1, 2, 3, 4, 5] deeply equals the expected value using .toEqual().
});
```
