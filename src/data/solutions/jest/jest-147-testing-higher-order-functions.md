# Testing Higher-Order Functions

**Level:** 147
**ID:** `jest-147`
**XP:** 120
**Tags:** `HOF`, `closure`, `jest.fn`

## Objective

Test a function that accepts and returns functions.

## Story

The spell composer wraps functions for extra power. Test the higher-order function.

## Hints
1. The HOF wraps the original function.
2. log is a jest.fn to spy on calls.
3. result should be the return of the original function.

## Solution

```javascript
function withLogging(fn,log){return function(...args){log(`calling with ${args}`);return fn(...args);};}
test('with logging',()=>{const log=jest.fn();const add=(a,b)=>a+b;const loggedAdd=withLogging(add,log);const result=loggedAdd(3,4);expect(result).toBe(7);expect(log).toHaveBeenCalledWith('calling with 3,4');});
```

## Explanation

Testing async data fetching patterns:

```
it('displays data after load', async () => {
  gameService.getLevels.mockResolvedValue(ALL_LEVELS);
  render(<GameHome />);
  // First check loading state
  expect(screen.getByText('Loading levels...')).toBeInTheDocument();
  // Then wait for data
  await waitFor(() =>
    expect(screen.getByText('Jest Unit Testing')).toBeInTheDocument()
  );
});
```

## Starter Code

```javascript
function withLogging(fn, log) {
  return function (...args) {
    log(`calling with ${args}`);
    return fn(...args);
  };
}

test('with logging', () => {
  const log = jest.fn();
  const add = (a, b) => a + b;
  const loggedAdd = withLogging(add, log);

  const result = loggedAdd(3, 4);
  // TODO: Assert that result equals 7 using .toBe().
  // TODO: Assert that log was called with the expected arguments.
});
```
