# jest.runAllTimers

**Level:** 95
**ID:** `jest-95`
**XP:** 120
**Tags:** `jest.runAllTimers`, `fake timers`

## Objective

Use jest.runAllTimers() to flush all pending timers.

## Story

Fast-forward through all pending timeouts at once to resolve them instantly.

## Hints
1. jest.runAllTimers() flushes all pending timers synchronously.
2. Unlike advanceTimersByTime, it resolves all regardless of delay.
3. Careful: recursive timers can cause infinite loops.

## Solution

```javascript
jest.useFakeTimers();
test('run all timers',()=>{let count=0;setTimeout(()=>{count++;},100);setTimeout(()=>{count++;},500);setTimeout(()=>{count++;},1000);jest.runAllTimers();expect(count).toBe(3);});
```

## Explanation

Custom matchers from `jest-dom` (`@testing-library/jest-dom`) extend `expect` with DOM-specific assertions:

```
expect(element).toBeInTheDocument();    // exists in DOM
expect(element).toBeVisible();          // not hidden
expect(element).toBeDisabled();         // has disabled attr
expect(element).toHaveClass('active');  // has CSS class
expect(element).toHaveValue('text');    // input value
expect(element).toHaveFocus();          // currently focused
```

Import in setup file: `import '@testing-library/jest-dom'`

## Starter Code

```javascript
jest.useFakeTimers();

test('run all timers', () => {
  let count = 0;
  setTimeout(() => { count++; }, 100);
  setTimeout(() => { count++; }, 500);
  setTimeout(() => { count++; }, 1000);
  // TODO: Assert the expected outcome using expect(the result).
  // TODO: Assert that count equals 3 using .toBe().
});
```
