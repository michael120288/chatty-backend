# The Promise Architect — Promise.map runs async operations concurrently

**Level:** 379
**ID:** `cy-379`
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
  it('Promise.map runs async operations concurrently', () => {
      const items = ['fire', 'ice', 'thunder'];
      const result = Cypress.Promise.map(items, (item) => Promise.resolve(item.toUpperCase()));
      cy.wrap(result).should('eql', ['FIRE', 'ICE', 'THUNDER']);
    });
});
```

## Starter Code

```javascript
describe('The Promise Architect', () => {
  it('Promise.map runs async operations concurrently', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
