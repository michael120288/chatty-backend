# Soft Assertions with expect.soft

**Level:** 188
**ID:** `jest-188`
**XP:** 130
**Tags:** `multiple expects`, `assertions`

## Objective

Use multiple expects — understand how failures accumulate.

## Story

Report all assertion failures at once instead of stopping at the first.

## Hints
1. Multiple expects in one test all execute.
2. First failure stops the test by default.
3. For truly soft assertions use a library, but multiple expects cover most cases.

## Solution

```javascript
function getStats(){return{hp:100,mp:50,xp:200};}
test('all stats correct',()=>{const s=getStats();expect(s.hp).toBe(100);expect(s.mp).toBe(50);expect(s.xp).toBe(200);});
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
function getStats() {
  return { hp: 100, mp: 50, xp: 200 };
}

test('all stats correct', () => {
  const stats = getStats();
  // Assert each independently — all will be checked even if one fails
  // TODO: Assert that stats.hp equals 100 using .toBe().
  // TODO: Assert that stats.mp equals 50 using .toBe().
  // TODO: Assert that stats.xp equals 200 using .toBe().
});
```
