# The Prop Trials — active badge text is "Active"

**Level:** 179
**ID:** `cy-179`
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
  it('active badge text is "Active"', () => {
      cy.mount(
        <HeroCard name="Aria" heroClass="Archer" level={42} guild="Silver Hawks" isActive={true} />
      );
      cy.get('[data-testid="active-badge"]').should('contain.text', 'Active');
    });
});
```

## Starter Code

```javascript
describe('HeroCard — prop variations', () => {
  it('active badge text is ', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
