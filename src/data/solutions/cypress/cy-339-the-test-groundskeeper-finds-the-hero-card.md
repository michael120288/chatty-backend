# The Test Groundskeeper — finds the hero card

**Level:** 339
**ID:** `cy-339`
**Difficulty:** easy
**XP:** 100
**Tags:** `mocha`, `beforeEach`, `afterEach`, `hooks`, `test-isolation`, `lifecycle`


## Objective

Use beforeEach() to visit a page and set up state, and afterEach() to log results. Write three independent tests that each rely on the fresh setup.

## Story

beforeEach() and afterEach() are the Groundskeepers — resetting state before every single test and cleaning up after. They ensure each test starts fresh and isolated.

## Hints
1. beforeEach() in a parent describe also runs for tests in nested describe blocks
2. afterEach() runs even when the test fails — great for screenshots or logging
3. Each it() gets a completely independent page state because cy.visit() runs before every test

## Solution

```javascript
describe('The Test Groundskeeper', () => {
  it('finds the hero card', () => {
      cy.get('#hero').should('exist');
      cy.get('#hero').should('have.attr', 'data-type', 'warrior');
    });
});
```

## Starter Code

```javascript
describe('The Test Groundskeeper', () => {
  it('finds the hero card', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
