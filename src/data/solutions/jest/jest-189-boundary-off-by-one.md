# Boundary: Off-by-One

**Level:** 189
**ID:** `jest-189`
**XP:** 120
**Tags:** `boundary`, `off-by-one`, `test.each`

## Objective

Test off-by-one boundaries: level 9, 10, and 11.

## Story

The level gate opens at exactly level 10. Test the boundary conditions.

## Hints
1. Test n-1, n, and n+1 for any boundary condition.
2. Boundary value analysis catches off-by-one bugs.
3. test.each with template literal uses %i and %s.

## Solution

```javascript
function canEnter(l){return l>=10;}
test.each([[9,false],[10,true],[11,true]])(`level %i: can enter = %s`,(l,e)=>{expect(canEnter(l)).toBe(e);});
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
function canEnter(level) {
  return level >= 10;
}

test.each([
  [9, false],
  [10, true],
  [11, true],
])(`level %i: can enter = %s`, (level, expected) => {
  // TODO: Assert that canEnter(level equals expected using .toBe().
});
```
