# describe.only

**Level:** 92
**ID:** `jest-92`
**XP:** 100
**Tags:** `describe.only`, `focus`

## Objective

Use describe.only() to focus on one describe block.

## Story

Focus the entire investigation block on the vault section.

## Hints
1. describe.only runs only that block — all other describes are skipped.
2. test.only and describe.only follow the same pattern.
3. Also available as fdescribe (in some environments).

## Solution

```javascript
describe.only('vault tests',()=>{test('vault opens',()=>{expect('open').toBe('open');});});
describe('skipped tests',()=>{test('never runs',()=>{expect(false).toBe(true);});});
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
describe.only('vault tests', () => {
  test('vault opens', () => {
    // TODO: Assert that 'open' equals 'open' using .toBe().
  });
});

describe('skipped tests', () => {
  test('never runs', () => {
    expect(false).toBe(true);
  });
});
```
