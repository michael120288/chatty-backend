# The Prop Trials

**Level:** 176
**ID:** `cy-176`
**Difficulty:** medium
**XP:** 195
**Tags:** `props`, `conditional rendering`, `cy.mount`, `component testing`, `variations`


## Objective

Test HeroCard with and without the isActive prop, verifying the active badge appears only when expected.

## Story

A component's appearance changes with its props — like a hero who dons different armour. Test each prop variation to guarantee your component renders correctly under all conditions.

## Hints
1. Mount the same component multiple times in separate it() blocks with different props
2. .should('not.exist') asserts the element is not in the DOM at all
3. Test both the presence and absence of conditional UI to cover all rendering branches

## Solution

```javascript
import React from 'react';
import { HeroCard } from '../../components/HeroCard.jsx';

describe('HeroCard — prop variations', () => {
  it('shows active badge when isActive is true', () => {
      cy.mount(
        <HeroCard name="Krag" heroClass="Warrior" level={55} guild="Iron Fist" isActive={true} />
      );
      cy.get('[data-testid="active-badge"]').should('be.visible');
      cy.get('[data-testid="hero-card"]').should('have.css', 'border-color');
    });
});
```

## Starter Code

```javascript
describe('HeroCard — prop variations', () => {
  it('shows active badge when isActive is true', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
