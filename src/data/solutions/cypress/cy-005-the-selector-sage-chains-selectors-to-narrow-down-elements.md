# The Selector Sage — chains selectors to narrow down elements

**Level:** 5
**ID:** `cy-005`
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
  it('chains selectors to narrow down elements', () => {
      cy.visit('/pages/level-01/');
      cy.get('.item-list').find('.item-card').first().should('exist');
      cy.get('.item-list').find('[data-type="weapon"]').should('have.length.at.least', 1);
    });
});
```

## Starter Code

```javascript
describe('The Selector Sage', () => {
  it('chains selectors to narrow down elements', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.get()
    // Hint: use cy.get()
  });
});
```
