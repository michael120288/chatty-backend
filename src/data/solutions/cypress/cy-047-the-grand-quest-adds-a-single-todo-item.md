# The Grand Quest — adds a single todo item

**Level:** 47
**ID:** `cy-047`
**Difficulty:** medium
**XP:** 500
**Tags:** `E2E`, `cy.type`, `cy.get`, `first`, `eq`, `have.length`, `full test`


## Objective

Add 3 todos, mark the first complete, delete the second, then assert exactly 2 items remain.

## Story

You have come so far. This final challenge tests everything. Before you stands the legendary Todo App. Add items, check one off, delete another — then verify the final count. Conquer it with Cypress.

## Hints
1. Add each todo by typing into '#todo-input' and clicking '#add-btn'.
2. Use .first() and .eq(1) to target specific items in the list.
3. After deleting, assert cy.get('.todo-item').should('have.length', 2).

## Solution

```javascript
describe('The Grand Quest', () => {
  it('adds a single todo item', () => {
      cy.visit('/pages/level-10/');
      cy.get('#todo-input').type('Slay Dragon');
      cy.get('#add-btn').click();
      cy.get('.todo-item').should('have.length', 1);
      cy.get('.todo-item').first().should('contain', 'Slay Dragon');
    });
});
```

## Starter Code

```javascript
describe('The Grand Quest', () => {
  it('adds a single todo item', () => {
    cy.visit('/pages/level-10/');
    // Hint: type "Slay Dragon" into "#todo-input"
    // Hint: click the element "#add-btn"
    // Hint: select ".todo-item" and assert there are 1 of them
    // Hint: use cy.get()
  });
});
```
