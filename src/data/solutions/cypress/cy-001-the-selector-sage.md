# The Selector Sage

**Level:** 1
**ID:** `cy-001`
**Difficulty:** medium
**XP:** 100
**Tags:** `cy.get`, `selectors`, `should`, `id`, `assertions`


## Objective

Use cy.get() to find the featured item by its ID and assert its text equals 'Magic Sword'.

## Story

You have arrived at the ancient Library of Elements. The ancient tomes speak of powerful selectors — mystical incantations that allow you to locate any element in the DOM realm. Master Cypress's art of selection, and the library's secrets shall be yours.

## Hints
1. Use cy.get('#featured-item') to find an element by its ID.
2. Chain .should('have.text', 'Magic Sword') to assert the exact text content.
3. If the assertion passes, Cypress exits with code 0 and the level is complete.

## Solution

```javascript
describe('The Selector Sage', () => {
  it('finds the featured item by ID', () => {
      cy.visit('/pages/level-01/');
      cy.get('#featured-item').should('have.text', 'Magic Sword');
    });
});
```

## Starter Code

```javascript
describe('The Selector Sage', () => {
  it('finds the featured item by ID', () => {
    cy.visit('/pages/level-01/');
    // Hint: select "#featured-item" and assert its text equals "Magic Sword"
  });
});
```
