# jest.runAllTicks

**Level:** 96
**ID:** `jest-96`
**XP:** 120
**Tags:** `jest.runAllTicks`, `microtasks`, `fake timers`

## Objective

Use jest.runAllTicks() to flush the microtask queue (process.nextTick).

## Story

Microtasks queue up before the next event loop tick. Flush them all at once.

## Hints
1. jest.runAllTicks() flushes the nextTick queue.
2. Different from runAllTimers which handles setTimeout/setInterval.
3. Useful when code uses process.nextTick for deferred work.

## Solution

```javascript
jest.useFakeTimers();
test('flush microtasks',()=>{let done=false;process.nextTick(()=>{done=true;});jest.runAllTicks();expect(done).toBe(true);});
```

## Explanation

Testing component props:

```
render(<LevelHeader level={{ id: 'cy-05', order: 5, title: 'The Selector Sage', ... }} />);
expect(screen.getByRole('heading', { name: 'The Selector Sage' })).toBeInTheDocument();
expect(screen.getByText('Level 5')).toBeInTheDocument();
expect(screen.getByText('+150 XP')).toBeInTheDocument();
```

Pass different prop values to test edge cases (empty arrays, boundary numbers, etc.).

## Starter Code

```javascript
jest.useFakeTimers();

test('flush microtasks', () => {
  let done = false;
  process.nextTick(() => { done = true; });
  // TODO: Assert the expected outcome using expect(the result).
  // TODO: Assert that done equals true using .toBe().
});
```
