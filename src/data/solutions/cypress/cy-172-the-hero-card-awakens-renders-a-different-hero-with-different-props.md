# The Hero Card Awakens — renders a different hero with different props

**Level:** 172
**ID:** `cy-172`
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
  it('renders a different hero with different props', () => {
      cy.mount(
        <HeroCard name="Krag" heroClass="Warrior" level={55} guild="Iron Fist" />
      );
      cy.get('[data-testid="hero-name"]').should('have.text', 'Krag');
      cy.get('[data-testid="hero-class"]').should('have.text', 'Warrior');
      cy.get('[data-testid="hero-level"]').should('have.text', 'Level 55');
    });
});
```

## Starter Code

```javascript
describe('HeroCard', () => {
  it('renders a different hero with different props', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
