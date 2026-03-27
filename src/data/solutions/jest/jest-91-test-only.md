# test.only

**Level:** 91
**ID:** `jest-91`
**XP:** 100
**Tags:** `test.only`, `focus`

## Objective

Use test.only() to run a single test and skip the rest.

## Story

Focus the investigation on one suspect. Only run one test in the suite.

## Hints
1. test.only (or fit) runs only that test in the file.
2. All other tests are skipped automatically.
3. Use describe.only to focus an entire describe block.

## Solution

```javascript
test('this runs',()=>{expect(1+1).toBe(2);});
test.only('focused test',()=>{expect(2*3).toBe(6);});
test('this is skipped',()=>{expect(true).toBe(false);});
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
test('this runs', () => {
  expect(1 + 1).toBe(2);
});

test.only('focused test', () => {
  // TODO: Assert that 2 * 3 equals 6 using .toBe().
});

test('this is skipped', () => {
  expect(true).toBe(false); // would fail but it's skipped
});
```
