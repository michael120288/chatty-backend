# Guard Clauses

**Level:** 153
**ID:** `jest-153`
**XP:** 110
**Tags:** `guard clauses`, `TypeError`, `RangeError`

## Objective

Test that a function throws for invalid inputs and works for valid ones.

## Story

The gatekeeper rejects invalid inputs before processing. Test guard clauses.

## Hints
1. Test the happy path and each guard clause separately.
2. toThrow(TypeError) checks the error class.
3. Wrap in arrow function: () => createHero(...).

## Solution

```javascript
function createHero(name,hp){if(!name)throw new TypeError('Name is required');if(hp<=0)throw new RangeError('HP must be positive');return{name,hp};}
test('valid hero',()=>{expect(createHero('Aria',100)).toEqual({name:'Aria',hp:100});});
test('no name',()=>{expect(()=>createHero('',100)).toThrow(TypeError);});
test('zero hp',()=>{expect(()=>createHero('Bob',0)).toThrow(RangeError);});
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
function createHero(name, hp) {
  if (!name) throw new TypeError('Name is required');
  if (hp <= 0) throw new RangeError('HP must be positive');
  return { name, hp };
}

test('valid hero', () => {
  // TODO: Assert that createHero('Aria', 100 deeply equals the expected value using .toEqual().
});

test('no name', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});

test('zero hp', () => {
  // TODO: Assert that the function throws the expected error using .toThrow().
});
```
