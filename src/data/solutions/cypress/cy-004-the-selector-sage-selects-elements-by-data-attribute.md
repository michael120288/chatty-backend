# The Selector Sage — selects elements by data attribute

**Level:** 4
**ID:** `cy-004`
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
  it('selects elements by data attribute', () => {
      cy.visit('/pages/level-01/');
      cy.get('[data-type]').should('exist');
      cy.get('[data-type="weapon"]').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Selector Sage', () => {
  it('selects elements by data attribute', () => {
    cy.visit('/pages/level-01/');
    // Hint: select "[data-type]" and assert it exists in the DOM
    // Hint: use cy.get()
  });
});
```
