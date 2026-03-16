# The Promise Architect — chaining .then() on cy.wrap with a promise

**Level:** 380
**ID:** `cy-380`
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
  it('chaining .then() on cy.wrap with a promise', () => {
      cy.wrap(new Cypress.Promise((resolve) => setTimeout(() => resolve('done'), 100)))
        .should('equal', 'done');
    });
});
```

## Starter Code

```javascript
describe('The Promise Architect', () => {
  it('chaining .then() on cy.wrap with a promise', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
