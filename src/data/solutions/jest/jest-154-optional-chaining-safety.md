# Optional Chaining Safety

**Level:** 154
**ID:** `jest-154`
**XP:** 110
**Tags:** `optional chaining`, `nullish coalescing`

## Objective

Test functions that use optional chaining (?.).

## Story

The hero may have no guild. Access nested properties safely and test the results.

## Hints
1. ?. short-circuits to undefined if the object is null/undefined.
2. ?? returns the right side if the left is null/undefined.
3. Test all three cases: with guild, without guild, null hero.

## Solution

```javascript
const getGuildName=h=>h?.guild?.name??'No Guild';
test('hero with guild',()=>{expect(getGuildName({name:'Aria',guild:{name:'Iron Order'}})).toBe('Iron Order');});
test('hero without guild',()=>{expect(getGuildName({name:'Bob'})).toBe('No Guild');});
test('null hero',()=>{expect(getGuildName(null)).toBe('No Guild');});
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
const getGuildName = hero => hero?.guild?.name ?? 'No Guild';

test('hero with guild', () => {
  const hero = { name: 'Aria', guild: { name: 'Iron Order' } };
  // TODO: Assert that getGuildName(hero equals 'Iron Order' using .toBe().
});

test('hero without guild', () => {
  const hero = { name: 'Bob' };
  // TODO: Assert that getGuildName(hero equals 'No Guild' using .toBe().
});

test('null hero', () => {
  // TODO: Assert that getGuildName(null equals 'No Guild' using .toBe().
});
```
