# Throttle Testing

**Level:** 165
**ID:** `jest-165`
**XP:** 130
**Tags:** `throttle`, `fake timers`, `jest.fn`

## Objective

Test a throttle function using fake timers.

## Story

The dungeon limits hero actions to once per second. Test throttle logic.

## Hints
1. throttle allows the first call then blocks until limit ms pass.
2. advanceTimersByTime moves the clock forward.
3. Date.now() is affected by fake timers.

## Solution

```javascript
jest.useFakeTimers();
function throttle(fn,limit){let lastRun=0;return function(...args){const now=Date.now();if(now-lastRun>=limit){lastRun=now;fn(...args);}};}
test('throttle — limits calls',()=>{const fn=jest.fn();const throttled=throttle(fn,1000);throttled();throttled();throttled();expect(fn).toHaveBeenCalledTimes(1);jest.advanceTimersByTime(1000);throttled();expect(fn).toHaveBeenCalledTimes(2);});
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
jest.useFakeTimers();

function throttle(fn, limit) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn(...args);
    }
  };
}

test('throttle — limits calls', () => {
  const fn = jest.fn();
  const throttled = throttle(fn, 1000);

  throttled();
  throttled();
  throttled();
  // TODO: Assert that fn was called exactly 1 times.

  jest.advanceTimersByTime(1000);
  throttled();
  // TODO: Assert that fn was called exactly 2 times.
});
```
