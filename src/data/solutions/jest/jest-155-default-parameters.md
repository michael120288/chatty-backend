# Default Parameters

**Level:** 155
**ID:** `jest-155`
**XP:** 100
**Tags:** `default parameters`, `pure function`

## Objective

Test a function with default parameter values.

## Story

The potion brewer has default quantities. Test functions with default parameters.

## Hints
1. Call with no args to trigger defaults.
2. Call with partial args to test partial defaults.
3. toEqual for object comparison.

## Solution

```javascript
function brew(type='health',quantity=1){return{type,quantity};}
test('all defaults',()=>{expect(brew()).toEqual({type:'health',quantity:1});});
test('custom type',()=>{expect(brew('mana')).toEqual({type:'mana',quantity:1});});
test('custom both',()=>{expect(brew('strength',3)).toEqual({type:'strength',quantity:3});});
```

## Explanation

Testing context providers with custom render wrappers:

```
// test-utils.js
import { render } from '@testing-library/react';
import { GameProvider } from './context/GameContext';

const AllProviders = ({ children }) => (
  <MemoryRouter>
    <GameProvider>{children}</GameProvider>
  </MemoryRouter>
);

export const renderWithProviders = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });
```

## Starter Code

```javascript
function brew(type = 'health', quantity = 1) {
  return { type, quantity };
}

test('all defaults', () => {
  // TODO: Assert that brew() deeply equals the expected value using .toEqual().
});

test('custom type', () => {
  // TODO: Assert that brew('mana' deeply equals the expected value using .toEqual().
});

test('custom both', () => {
  // TODO: Assert that brew('strength', 3 deeply equals the expected value using .toEqual().
});
```
