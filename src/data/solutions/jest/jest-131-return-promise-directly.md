# Return Promise Directly

**Level:** 131
**ID:** `jest-131`
**XP:** 110
**Tags:** `promise`, `return`, `async`

## Objective

Return a promise directly from a test (no async/await).

## Story

The ancient way of testing promises — return the promise from the test.

## Hints
1. Return the promise so Jest waits for it.
2. If you forget to return, Jest finishes before the assertion runs.
3. async/await is cleaner but both work.

## Solution

```javascript
function fetchGold(){return Promise.resolve(500);}
test('fetch gold',()=>{return fetchGold().then(gold=>{expect(gold).toBe(500);});});
```

## Explanation

Testing navigation with `MemoryRouter` from `react-router-dom`:

```
import { MemoryRouter } from 'react-router-dom';

render(
  <MemoryRouter initialEntries={['/app/game/level-01']}>
    <Routes>
      <Route path="/app/game/:levelId" element={<Game />} />
    </Routes>
  </MemoryRouter>
);
```

## Starter Code

```javascript
function fetchGold() {
  return Promise.resolve(500);
}

test('fetch gold', () => {
  return fetchGold().then(gold => {
    // TODO: Assert that gold equals 500 using .toBe().
  });
});
```
