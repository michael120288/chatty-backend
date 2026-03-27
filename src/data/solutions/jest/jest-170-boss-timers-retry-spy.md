# Boss: Timers + Retry + Spy

**Level:** 170
**ID:** `jest-170`
**XP:** 250
**Tags:** `boss`, `fake timers`, `retry`, `spy`

## Objective

Combine fake timers, retry logic, and spy assertions.

## Story

170 levels. The temporal gauntlet — fake timers, retry logic, and spies in one suite.

## Hints
1. runAllTimers flushes all pending timers synchronously.
2. The mock throws twice then returns 'ok' on the third call.
3. await promise after running all timers.

## Solution

```javascript
jest.useFakeTimers();
function withDelay(fn,ms){return new Promise(resolve=>setTimeout(()=>resolve(fn()),ms));}
async function retryWithDelay(fn,times,delay){for(let i=0;i<times;i++){try{return await withDelay(fn,delay);}catch(e){if(i===times-1)throw e;}}}
test('retry with delay',async()=>{let attempt=0;const fn=jest.fn(()=>{attempt++;if(attempt<3)throw new Error('fail');return'ok';});const promise=retryWithDelay(fn,3,100);jest.runAllTimers();const result=await promise;expect(result).toBe('ok');expect(fn).toHaveBeenCalledTimes(3);});
```

## Explanation

Testing that filtered data renders correctly:

```
it('only counts jest- IDs toward jest completion', async () => {
  useProgress.mockReturnValue({
    ...defaultProgress,
    completedLevels: ['level-01', 'cy-01', 'jest-01'], // only jest-01 is jest
  });
  render(<GameHome />);
  await waitFor(() => expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument());
  expect(screen.getByText(`1 / ${JEST_LEVELS.length} complete`)).toBeInTheDocument();
});
```

## Starter Code

```javascript
jest.useFakeTimers();

function withDelay(fn, ms) {
  return new Promise(resolve => setTimeout(() => resolve(fn()), ms));
}

async function retryWithDelay(fn, times, delay) {
  for (let i = 0; i < times; i++) {
    try {
      return await withDelay(fn, delay);
    } catch (e) {
      if (i === times - 1) throw e;
    }
  }
}

test('retry with delay', async () => {
  let attempt = 0;
  const fn = jest.fn(() => {
    attempt++;
    if (attempt < 3) throw new Error('fail');
    return 'ok';
  });

  const promise = retryWithDelay(fn, 3, 100);
  jest.runAllTimers();
  const result = await promise;

  // TODO: Assert that result equals 'ok' using .toBe().
  // TODO: Assert that fn was called exactly 3 times.
});
```
