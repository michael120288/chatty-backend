# Testing Closures

**Level:** 146
**ID:** `jest-146`
**XP:** 120
**Tags:** `closure`, `factory`, `state`

## Objective

Test a closure that maintains private state.

## Story

A counter closes over its count. Each call increments it. Test the closure.

## Hints
1. The closure captures count in the enclosing scope.
2. 10 + 2 increments - 1 decrement = 11.
3. Each makeCounter() call creates independent state.

## Solution

```javascript
function makeCounter(start=0){let count=start;return{increment(){count++;},decrement(){count--;},value(){return count;}};}
test('counter',()=>{const c=makeCounter(10);c.increment();c.increment();c.decrement();expect(c.value()).toBe(11);});
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
function makeCounter(start = 0) {
  let count = start;
  return {
    increment() { count++; },
    decrement() { count--; },
    value() { return count; },
  };
}

test('counter', () => {
  const c = makeCounter(10);
  c.increment();
  c.increment();
  c.decrement();
  // TODO: Assert that c.value( equals 11 using .toBe().
});
```
