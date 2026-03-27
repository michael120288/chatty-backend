# Circuit Breaker Pattern

**Level:** 214
**ID:** `jest-214`
**XP:** 140
**Tags:** `circuit breaker`, `pattern`, `async`, `mock`

## Objective

Test a circuit breaker that opens after threshold failures.

## Story

The dungeon circuit breaker opens after 3 failures, blocking further calls.

## Hints
1. After 3 failures, circuit opens and blocks further calls.
2. The 4th call throws 'Circuit open' without calling fail.
3. fail should only be called 3 times total.

## Solution

```javascript
function makeCircuitBreaker(t){let failures=0,open=false;return async function call(fn){if(open)throw new Error('Circuit open');try{const r=await fn();failures=0;return r;}catch(e){failures++;if(failures>=t)open=true;throw e;}};}
test('opens after threshold failures',async()=>{const cb=makeCircuitBreaker(3);const fail=jest.fn().mockRejectedValue(new Error('fail'));for(let i=0;i<3;i++){await expect(cb(fail)).rejects.toThrow('fail');}await expect(cb(fail)).rejects.toThrow('Circuit open');expect(fail).toHaveBeenCalledTimes(3);});
```

## Explanation

Testing component integration with services:

```
it('calls service with correct args on submit', async () => {
  const mockSubmit = jest.fn().mockResolvedValue({ passed: true });
  render(<CodeSubmitter onSubmit={mockSubmit} levelId="level-01" />);
  await userEvent.click(screen.getByRole('button', { name: 'Run Code' }));
  expect(mockSubmit).toHaveBeenCalledWith('level-01', expect.any(String));
});
```

## Starter Code

```javascript
function makeCircuitBreaker(threshold) {
  let failures = 0;
  let open = false;
  return async function call(fn) {
    if (open) throw new Error('Circuit open');
    try {
      const result = await fn();
      failures = 0;
      return result;
    } catch (e) {
      failures++;
      if (failures >= threshold) open = true;
      throw e;
    }
  };
}

test('opens after threshold failures', async () => {
  const cb = makeCircuitBreaker(3);
  const fail = jest.fn().mockRejectedValue(new Error('fail'));

  for (let i = 0; i < 3; i++) {
    await expect(cb(fail)).rejects.toThrow('fail');
  }

  // TODO: Assert that the function throws the expected error.
  // TODO: Assert that fail was called exactly 3 times.
});
```
