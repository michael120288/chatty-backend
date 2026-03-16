# The Promise Architect — Cypress.Promise.resolve wraps a value

**Level:** 377
**ID:** `cy-377`
**Difficulty:** medium
**XP:** 150
**Tags:** `bluebird`, `Cypress.Promise`, `promises`, `async`, `Promise.all`, `Promise.map`


## Objective

Use Cypress.Promise to create and resolve promises, chain .then(), and handle async operations inside tests.

## Story

Cypress uses Bluebird for its promise implementation, exposed as Cypress.Promise. You can create custom promise chains, resolve values, and even run Bluebird-specific helpers like Promise.map and Promise.all.

## Hints
1. Always wrap Cypress.Promise with cy.wrap() — Cypress needs to track the promise in its command queue
2. Cypress.Promise.all() is identical to Promise.all() but uses Bluebird's implementation
3. Cypress.Promise.map() is a Bluebird extra — it maps an array with async callbacks concurrently

## Solution

```javascript
describe('The Promise Architect', () => {
  it('Cypress.Promise.resolve wraps a value', () => {
      cy.wrap(Cypress.Promise.resolve('hero')).should('equal', 'hero');
    });
});
```

## Starter Code

```javascript
describe('The Promise Architect', () => {
  it('Cypress.Promise.resolve wraps a value', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
