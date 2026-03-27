# test.concurrent

**Level:** 94
**ID:** `jest-94`
**XP:** 120
**Tags:** `test.concurrent`, `async`, `parallel`

## Objective

Use test.concurrent() to run async tests in parallel.

## Story

Multiple scouts report simultaneously. Run async tests concurrently.

## Hints
1. test.concurrent runs tests at the same time (async only).
2. Useful for I/O-heavy tests that don't share state.
3. Avoid shared mutable state with concurrent tests.

## Solution

```javascript
test.concurrent('scout 1',async()=>{const r=await Promise.resolve('north clear');expect(r).toBe('north clear');});
test.concurrent('scout 2',async()=>{const r=await Promise.resolve('south clear');expect(r).toBe('south clear');});
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
test.concurrent('scout 1', async () => {
  const result = await Promise.resolve('north clear');
  // TODO: Assert that result equals 'north clear' using .toBe().
});

test.concurrent('scout 2', async () => {
  const result = await Promise.resolve('south clear');
  // TODO: Assert that result equals 'south clear' using .toBe().
});
```
