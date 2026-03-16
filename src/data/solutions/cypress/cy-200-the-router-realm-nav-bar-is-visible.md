# The Router Realm — nav bar is visible

**Level:** 200
**ID:** `cy-200`
**Difficulty:** hard
**XP:** 225
**Tags:** `cy.mount`, `MemoryRouter`, `React Router`, `Link`, `component testing`


## Objective

Mount components that use React Router (Link, NavLink, useNavigate) by wrapping them in MemoryRouter, and assert that navigation and active states work correctly.

## Story

Components that navigate are useless without a router. The Router Realm wraps mounted components in a MemoryRouter — giving Link, NavLink, and useNavigate the context they need to render and respond correctly in isolation.

## Hints
1. Wrap any component that uses Link, NavLink, or useNavigate with <MemoryRouter> inside cy.mount()
2. Use initialEntries={['/path']} on MemoryRouter to set the starting URL for the component
3. NavLink applies its active class/style when its to prop matches the current MemoryRouter path

## Solution

```javascript
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../../components/NavBar.jsx';

describe('The Router Realm', () => {
  it('nav bar is visible', () => {
      cy.mount(<MemoryRouter><NavBar /></MemoryRouter>);
      cy.get('[data-testid="navbar"]').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Router Realm', () => {
  it('nav bar is visible', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
