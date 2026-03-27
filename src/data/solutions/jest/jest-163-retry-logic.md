# Retry Logic

**Level:** 163
**ID:** `jest-163`
**XP:** 130
**Tags:** `retry`, `mockRejectedValueOnce`, `async`

## Objective

Test a retry function using mockRejectedValueOnce.

## Story

The unreliable oracle fails twice then succeeds. Test retry logic.

## Hints
1. mockRejectedValueOnce chains failures before the final success.
2. retry calls fn up to times times.
3. Verify the total call count matches expectations.

## Solution

```javascript
async function retry(fn,times){for(let i=0;i<times;i++){try{return await fn();}catch(e){if(i===times-1)throw e;}}}
test('retry succeeds on third try',async()=>{const fn=jest.fn().mockRejectedValueOnce(new Error('fail 1')).mockRejectedValueOnce(new Error('fail 2')).mockResolvedValueOnce('success');const result=await retry(fn,3);expect(result).toBe('success');expect(fn).toHaveBeenCalledTimes(3);});
```

## Explanation

Testing components with mocked child components:

```
jest.mock('../components/XPBar', () => ({
  XPBar: () => <div data-testid="xp-bar" />
}));

it('renders XPBar component', () => {
  render(<GameHome />);
  expect(screen.getByTestId('xp-bar')).toBeInTheDocument();
});
```

Mocking child components isolates the component under test and avoids cascading failures.

## Starter Code

```javascript
async function retry(fn, times) {
  for (let i = 0; i < times; i++) {
    try { return await fn(); } catch (e) {
      if (i === times - 1) throw e;
    }
  }
}

test('retry succeeds on third try', async () => {
  const fn = jest.fn()
    .mockRejectedValueOnce(new Error('fail 1'))
    .mockRejectedValueOnce(new Error('fail 2'))
    .mockResolvedValueOnce('success');

  const result = await retry(fn, 3);
  // TODO: Assert that result equals 'success' using .toBe().
  // TODO: Assert that fn was called exactly 3 times.
});
```
