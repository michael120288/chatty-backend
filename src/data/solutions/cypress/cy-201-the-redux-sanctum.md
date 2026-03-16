# The Redux Sanctum

**Level:** 201
**ID:** `cy-201`
**Difficulty:** hard
**XP:** 225
**Tags:** `cy.mount`, `Redux`, `Provider`, `useSelector`, `component testing`


## Objective

Mount Redux-connected components by wrapping them in a Provider with a pre-configured store, and assert that the component renders from state and dispatches actions correctly.

## Story

Redux-connected components see nothing without a store. The Redux Sanctum wraps mounted components in a pre-loaded Provider — giving useSelector and useDispatch a real store to read from and write to.

## Hints
1. Use a factory function like makeStore(preloadedState) so each test gets its own isolated store
2. Wrap the component in <Provider store={store}> inside cy.mount() — same pattern as production code
3. Never share a single store instance across tests — state mutations in one test will corrupt the next

## Solution

```javascript
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HeroPanel } from '../../components/HeroPanel.jsx';
import heroReducer from '../../redux/heroSlice.js';

describe('The Redux Sanctum', () => {
  it('renders hero name from Redux store', () => {
      const store = makeStore({ hero: { name: 'Aria', xp: 100 } });
      cy.mount(<Provider store={store}><HeroPanel /></Provider>);
      cy.get('[data-testid="hero-name"]').should('have.text', 'Aria');
    });
});
```

## Starter Code

```javascript
describe('The Redux Sanctum', () => {
  it('renders hero name from Redux store', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
