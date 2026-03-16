# The Mount Spellbook

**Level:** 211
**ID:** `cy-211`
**Difficulty:** hard
**XP:** 225
**Tags:** `cy.mount`, `custom-commands`, `providers`, `MemoryRouter`, `component testing`


## Objective

Create a custom Cypress mount command that wraps components with all required providers, and use it to simplify component tests across multiple scenarios.

## Story

Repeating providers in every test is noise. The Mount Spellbook centralises all wrappers into a custom cy.mount() command — so every component test starts with router, store, and context already wired up, with zero boilerplate.

## Hints
1. Define Cypress.Commands.add('mountWithProviders', ...) in cypress/support/component.jsx so it is available in every component test file
2. Accept an options object with named fields (storeState, initialEntries) so callers only specify what they need to override
3. Sensible defaults in the destructuring (storeState = {}, initialEntries = ['/']) mean callers can omit options entirely

## Solution

```javascript
import React from 'react';
import { HeroCard } from '../../components/HeroCard.jsx';

describe('The Mount Spellbook', () => {
  it('mounts a component and asserts it is visible', () => {
      cy.mount(<HeroCard name="Aria" heroClass="Archer" level={42} guild="Silver Hawks" />);
      cy.get('[data-testid="hero-card"]').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Mount Spellbook', () => {
  it('mounts a component and asserts it is visible', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
