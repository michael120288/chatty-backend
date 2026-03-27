# Promise.allSettled

**Level:** 133
**ID:** `jest-133`
**XP:** 120
**Tags:** `Promise.allSettled`, `async`

## Objective

Test a function using Promise.allSettled.

## Story

Some scouts succeed, some fail. allSettled captures all results without throwing.

## Hints
1. allSettled never throws — always resolves.
2. Each result has {status, value} or {status, reason}.
3. Useful for fire-and-forget style parallel operations.

## Solution

```javascript
async function runMissions(){return Promise.allSettled([Promise.resolve('success'),Promise.reject(new Error('failed'))]);}
test('all settled results',async()=>{const r=await runMissions();expect(r[0].status).toBe('fulfilled');expect(r[0].value).toBe('success');expect(r[1].status).toBe('rejected');expect(r[1].reason.message).toBe('failed');});
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
async function runMissions() {
  return Promise.allSettled([
    Promise.resolve('success'),
    Promise.reject(new Error('failed')),
  ]);
}

test('all settled results', async () => {
  const results = await runMissions();
  // TODO: Assert that results[0].status equals 'fulfilled' using .toBe().
  // TODO: Assert that results[0].value equals 'success' using .toBe().
  // TODO: Assert that results[1].status equals 'rejected' using .toBe().
  // TODO: Assert that results[1].reason.message equals 'failed' using .toBe().
});
```
