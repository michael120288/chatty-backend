# The Multiplier — verifies each rare item is visible

**Level:** 27
**ID:** `cy-027`
**Difficulty:** medium
**XP:** 250
**Tags:** `cy.get`, `have.length`, `multiple elements`, `class selector`, `collection`


## Objective

Find all rare items (class 'item-rare') in the marketplace and assert there are exactly 3.

## Story

The Marketplace of Many holds countless items, each with different properties. True masters can verify collections — asserting length, filtering the worthy, confirming the count.

## Hints
1. Use cy.get('.item-rare') to select all elements with that class.
2. Chain .should('have.length', 3) to assert exactly 3 elements were found.
3. Cypress automatically retries the assertion until it passes or times out.

## Solution

```javascript
describe('The Multiplier', () => {
  it('verifies each rare item is visible', () => {
      cy.visit('/pages/level-06/');
      cy.get('.item-rare').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
});
```

## Starter Code

```javascript
describe('The Multiplier', () => {
  it('verifies each rare item is visible', () => {
    cy.visit('/pages/level-06/');
    // Hint: use cy.get()
    // Hint: use cy.wrap()
  });
});
```
