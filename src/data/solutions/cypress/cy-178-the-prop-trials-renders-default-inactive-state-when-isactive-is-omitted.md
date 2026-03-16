# The Prop Trials — renders default inactive state when isActive is omitted

**Level:** 178
**ID:** `cy-178`
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
  it('renders default inactive state when isActive is omitted', () => {
      cy.mount(
        <HeroCard name="Lyria" heroClass="Mage" level={38} guild="Arcane Circle" />
      );
      cy.get('[data-testid="active-badge"]').should('not.exist');
      cy.get('[data-testid="hero-name"]').should('have.text', 'Lyria');
    });
});
```

## Starter Code

```javascript
describe('HeroCard — prop variations', () => {
  it('renders default inactive state when isActive is omitted', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
