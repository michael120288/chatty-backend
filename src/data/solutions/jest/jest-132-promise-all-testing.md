# Promise.all Testing

**Level:** 132
**ID:** `jest-132`
**XP:** 120
**Tags:** `Promise.all`, `async`, `object`

## Objective

Test a function that uses Promise.all.

## Story

Multiple scouts return simultaneously. Test Promise.all results.

## Hints
1. Promise.all resolves when all promises settle.
2. Destructure the results array as normal.
3. toEqual for object comparison.

## Solution

```javascript
async function gatherReports(){const[north,south]=await Promise.all([Promise.resolve('clear'),Promise.resolve('danger')]);return{north,south};}
test('gather reports',async()=>{const r=await gatherReports();expect(r).toEqual({north:'clear',south:'danger'});});
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
async function gatherReports() {
  const [north, south] = await Promise.all([
    Promise.resolve('clear'),
    Promise.resolve('danger'),
  ]);
  return { north, south };
}

test('gather reports', async () => {
  const reports = await gatherReports();
  // TODO: Assert that reports deeply equals the expected value using .toEqual().
});
```
