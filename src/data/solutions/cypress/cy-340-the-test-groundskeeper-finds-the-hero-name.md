# The Test Groundskeeper — finds the hero name

**Level:** 340
**ID:** `cy-340`
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
  it('finds the hero name', () => {
      // Each test gets a fresh page visit from beforeEach
      cy.get('.name').should('contain.text', 'Aria');
      // TODO: also assert .name has text 'Aria Stormwind' exactly
    });
});
```

## Starter Code

```javascript
describe('The Test Groundskeeper', () => {
  it('finds the hero name', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
