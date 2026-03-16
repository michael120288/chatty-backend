# The Hero Card Awakens — hero level displays as "Level N" format

**Level:** 174
**ID:** `cy-174`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.mount`, `component testing`, `React`, `data-testid`, `isolation`


## Objective

Mount the HeroCard component with props and assert on its rendered output using data-testid selectors.

## Story

Component testing is a new frontier — mount a single React component in isolation, free from routing, state management, and server calls. cy.mount() renders it directly in the Cypress test runner.

## Hints
1. cy.mount(<Component />) renders the component in an isolated iframe — no full page load needed
2. Use data-testid attributes to select elements reliably across prop changes
3. Component tests run through Vite — JSX and ES modules work natively

## Solution

```javascript
import React from 'react';
import { HeroCard } from '../../components/HeroCard.jsx';

describe('HeroCard', () => {
  it('hero level displays as "Level N" format', () => {
      cy.mount(
        <HeroCard name="Zorn" heroClass="Rogue" level={10} guild="Shadow Guild" />
      );
      cy.get('[data-testid="hero-level"]').should('have.text', 'Level 10');
    });
});
```

## Starter Code

```javascript
describe('HeroCard', () => {
  it('hero level displays as ', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
