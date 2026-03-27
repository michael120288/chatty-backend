# Retry with Exponential Backoff

**Level:** 217
**ID:** `jest-217`
**XP:** 140
**Tags:** `retry`, `backoff`, `fake timers`, `async`

## Objective

Test a retry function with exponential backoff using fake timers.

## Story

The dungeon connection retries with increasing delays. Test exponential backoff.

## Hints
1. Exponential: 100ms, 200ms, 400ms delays.
2. jest.runAllTimers() flushes all pending setTimeout calls.
3. fn succeeds on the 3rd call.

## Solution

```javascript
jest.useFakeTimers();
async function retryWithBackoff(fn,max){for(let i=0;i<=max;i++){try{return await fn();}catch(e){if(i===max)throw e;await new Promise(r=>setTimeout(r,Math.pow(2,i)*100));}}}
test('succeeds after retry',async()=>{let calls=0;const fn=jest.fn().mockImplementation(()=>{calls++;if(calls<3)return Promise.reject(new Error('fail'));return Promise.resolve('ok');});const promise=retryWithBackoff(fn,3);jest.runAllTimers();const result=await promise;expect(result).toBe('ok');expect(fn).toHaveBeenCalledTimes(3);});
```

## Explanation

Testing React context consumers:

```
const wrapper = ({ children }) => (
  <GameContext.Provider value={{ solutions: {}, setSolution: jest.fn() }}>
    {children}
  </GameContext.Provider>
);
const { result } = renderHook(() => useGame(), { wrapper });
expect(result.current.solutions).toEqual({});
```

## Starter Code

```javascript
jest.useFakeTimers();

async function retryWithBackoff(fn, maxRetries) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxRetries) throw e;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 100));
    }
  }
}

test('succeeds after retry', async () => {
  let calls = 0;
  const fn = jest.fn().mockImplementation(() => {
    calls++;
    if (calls < 3) return Promise.reject(new Error('fail'));
    return Promise.resolve('ok');
  });

  const promise = retryWithBackoff(fn, 3);
  jest.runAllTimers();
  const result = await promise;
  // TODO: Assert that result equals 'ok' using .toBe().
  // TODO: Assert that fn was called exactly 3 times.
});
```
