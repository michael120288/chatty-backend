# Rate Limiter Testing

**Level:** 209
**ID:** `jest-209`
**XP:** 140
**Tags:** `rate limiter`, `fake timers`, `algorithm`

## Objective

Test a token bucket rate limiter with fake timers.

## Story

The dungeon gate allows only 3 entries per second. Test the rate limiter.

## Hints
1. 3 tokens per second — exhausted after 3 calls.
2. advanceTimersByTime(1000) triggers the refill interval.
3. Token bucket is a classic rate-limiting pattern.

## Solution

```javascript
jest.useFakeTimers();
function makeRateLimiter(n){let tokens=n;setInterval(()=>{tokens=n;},1000);return function allow(){if(tokens>0){tokens--;return true;}return false;}}
test('rate limiter',()=>{const allow=makeRateLimiter(3);expect(allow()).toBe(true);expect(allow()).toBe(true);expect(allow()).toBe(true);expect(allow()).toBe(false);jest.advanceTimersByTime(1000);expect(allow()).toBe(true);});
```

## Explanation

Testing multi-step user flows:

```
it('completes the full registration flow', async () => {
  render(<RegistrationFlow />);
  await userEvent.type(screen.getByLabelText('Username'), 'aria');
  await userEvent.type(screen.getByLabelText('Password'), 'secret123');
  await userEvent.click(screen.getByRole('button', { name: 'Create Account' }));
  await waitFor(() =>
    expect(screen.getByText('Account created!')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
jest.useFakeTimers();

function makeRateLimiter(maxPerSecond) {
  let tokens = maxPerSecond;
  setInterval(() => { tokens = maxPerSecond; }, 1000);
  return function allow() {
    if (tokens > 0) { tokens--; return true; }
    return false;
  };
}

test('rate limiter', () => {
  const allow = makeRateLimiter(3);
  // TODO: Assert that allow() equals true using .toBe().
  // TODO: Assert that allow() equals false using .toBe().
  jest.advanceTimersByTime(1000);
  // TODO: Assert that allow() equals true using .toBe().
});
```
