# Nested describe Blocks

**Level:** 93
**ID:** `jest-93`
**XP:** 110
**Tags:** `describe`, `nested`, `organisation`

## Objective

Use nested describe() blocks to organise related tests.

## Story

The dungeon has zones. Each zone has sub-rooms. Organise tests in nested describes.

## Hints
1. Nest describe() calls to group related tests.
2. Each describe can have its own beforeEach/afterEach.
3. Test names show full path: Dungeon > Entrance > door opens.

## Solution

```javascript
describe('Dungeon',()=>{describe('Entrance',()=>{test('door opens',()=>{expect(true).toBe(true);});});describe('Boss Room',()=>{test('boss exists',()=>{expect('dragon').toBeTruthy();});});});
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
describe('Dungeon', () => {
  describe('Entrance', () => {
    test('door opens', () => {
      // TODO: Assert that true equals true using .toBe().
    });
  });

  describe('Boss Room', () => {
    test('boss exists', () => {
      // TODO: Assert that 'dragon' is truthy.
    });
  });
});
```
