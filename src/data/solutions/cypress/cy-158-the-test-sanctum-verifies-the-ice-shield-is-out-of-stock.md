# The Test Sanctum — verifies the Ice Shield is out of stock

**Level:** 158
**ID:** `cy-158`
**Difficulty:** easy
**XP:** 175
**Tags:** `describe`, `it`, `beforeEach`, `before`, `after`, `test organization`


## Objective

Structure tests using describe, it, beforeEach, and after hooks to test the Enchanted Shop's product cards.

## Story

A well-organized sanctum is the hallmark of a master tester. describe() groups related spells, it() defines each trial, and before/beforeEach/after/afterEach hooks prepare and clean the arena between casts.

## Hints
1. describe() groups related tests — nest multiple describe() blocks for sub-groups
2. beforeEach() runs before every it() in its describe block
3. before() runs once before all tests — use it for expensive one-time setup
4. after() and afterEach() run after tests — useful for cleanup or logging

## Solution

```javascript
describe('The Enchanted Shop', () => {
  it('verifies the Ice Shield is out of stock', () => {
      cy.get('#card-shield').within(() => {
        cy.get('.product-stock').should('have.class', 'out-of-stock');
        cy.get('.buy-btn').should('be.disabled');
      });
    });
});
```

## Starter Code

```javascript
describe('The Enchanted Shop', () => {
  it('verifies the Ice Shield is out of stock', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
