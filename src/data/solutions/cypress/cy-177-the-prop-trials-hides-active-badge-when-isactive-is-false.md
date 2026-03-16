# The Prop Trials — hides active badge when isActive is false

**Level:** 177
**ID:** `cy-177`
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
  it('hides active badge when isActive is false', () => {
      cy.mount(
        <HeroCard name="Krag" heroClass="Warrior" level={55} guild="Iron Fist" isActive={false} />
      );
      cy.get('[data-testid="active-badge"]').should('not.exist');
    });
});
```

## Starter Code

```javascript
describe('HeroCard — prop variations', () => {
  it('hides active badge when isActive is false', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
