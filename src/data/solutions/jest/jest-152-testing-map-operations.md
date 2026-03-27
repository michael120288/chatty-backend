# Testing Map Operations

**Level:** 152
**ID:** `jest-152`
**XP:** 110
**Tags:** `Map`, `counting`

## Objective

Test a function that uses Map for key-value tracking.

## Story

The dungeon tracks hero visit counts with a Map. Test Map operations.

## Hints
1. Map.get(key) returns undefined for missing keys.
2. Map.has(key) returns a boolean.
3. counts.get(hero) || 0 handles first visit.

## Solution

```javascript
function countVisits(log){const c=new Map();for(const h of log){c.set(h,(c.get(h)||0)+1);}return c;}
test('visit counts',()=>{const c=countVisits(['Alice','Bob','Alice','Alice']);expect(c.get('Alice')).toBe(3);expect(c.get('Bob')).toBe(1);expect(c.has('Carol')).toBe(false);});
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
function countVisits(log) {
  const counts = new Map();
  for (const hero of log) {
    counts.set(hero, (counts.get(hero) || 0) + 1);
  }
  return counts;
}

test('visit counts', () => {
  const counts = countVisits(['Alice', 'Bob', 'Alice', 'Alice']);
  // TODO: Assert that counts.get('Alice' equals 3 using .toBe().
  // TODO: Assert that counts.get('Bob' equals 1 using .toBe().
  // TODO: Assert that counts.has('Carol' equals false using .toBe().
});
```
