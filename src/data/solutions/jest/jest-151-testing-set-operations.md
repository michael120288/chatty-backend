# Testing Set Operations

**Level:** 151
**ID:** `jest-151`
**XP:** 110
**Tags:** `Set`, `deduplication`

## Objective

Test a function that uses Set for deduplication.

## Story

The dungeon eliminates duplicate loot. Test Set operations.

## Hints
1. new Set removes duplicates.
2. Spread back to array for comparison.
3. toEqual for array comparison.

## Solution

```javascript
const unique=a=>[...new Set(a)];const union=(a,b)=>[...new Set([...a,...b])];
test('unique values',()=>{expect(unique([1,2,2,3,3])).toEqual([1,2,3]);});
test('union',()=>{expect(union([1,2],[2,3])).toEqual([1,2,3]);});
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
const unique = arr => [...new Set(arr)];
const union = (a, b) => [...new Set([...a, ...b])];

test('unique values', () => {
  // TODO: Assert that unique([1, 2, 2, 3, 3] deeply equals the expected value using .toEqual().
});

test('union', () => {
  // TODO: Assert that union([1, 2], [2, 3] deeply equals the expected value using .toEqual().
});
```
