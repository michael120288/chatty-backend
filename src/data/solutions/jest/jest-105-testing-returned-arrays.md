# Testing Returned Arrays

**Level:** 105
**ID:** `jest-105`
**XP:** 110
**Tags:** `arrays`, `toHaveLength`, `filter`

## Objective

Test a function returning an array using toEqual and toHaveLength.

## Story

The quest giver lists available missions. Test that the list is correct.

## Hints
1. toHaveLength checks the .length property.
2. Access individual elements with index notation.
3. Combine multiple expects for thorough verification.

## Solution

```javascript
function getQuests(d){const a=[{id:1,name:'Slay Rats',difficulty:'easy'},{id:2,name:'Kill Boss',difficulty:'hard'},{id:3,name:'Gather Herbs',difficulty:'easy'}];return a.filter(q=>q.difficulty===d);}
test('easy quests',()=>{const r=getQuests('easy');expect(r).toHaveLength(2);expect(r[0].name).toBe('Slay Rats');});
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
function getQuests(difficulty) {
  const all = [
    { id: 1, name: 'Slay Rats', difficulty: 'easy' },
    { id: 2, name: 'Kill Boss', difficulty: 'hard' },
    { id: 3, name: 'Gather Herbs', difficulty: 'easy' },
  ];
  return all.filter(q => q.difficulty === difficulty);
}

test('easy quests', () => {
  const result = getQuests('easy');
  // TODO: Assert that result has length 2.
  // TODO: Assert that result[0].name equals 'Slay Rats' using .toBe().
});
```
