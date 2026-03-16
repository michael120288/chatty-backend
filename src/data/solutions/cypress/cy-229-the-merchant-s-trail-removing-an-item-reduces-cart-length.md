# The Merchant's Trail — removing an item reduces cart length

**Level:** 229
**ID:** `cy-229`
**Difficulty:** hard
**XP:** 550
**Tags:** `e2e`, `shopping-cart`, `multi-page`, `navigation`, `localStorage`, `checkout`, `full-journey`


## Objective

Add two items to the cart, navigate to the cart page, verify items and total, remove one item, then complete the checkout flow.

## Story

The merchant's shop spans two pages: the item listing and the cart. A real E2E test follows the full purchase journey — adding items, navigating to the cart, verifying prices, removing an item, and completing checkout.

## Hints
1. Use [data-item="magic-sword"] .add-to-cart to scope the button inside the right card
2. #cart-total shows the number as e.g. '1700 gold' — use .should('contain', '1700') not exact match
3. After removing an item, the cart re-renders — Cypress auto-retries the length assertion

## Solution

```javascript
describe('The Merchant's Trail', () => {
  it('removing an item reduces cart length', () => {
      cy.visit('/pages/level-76/');
      cy.get('[data-item="magic-sword"] .add-to-cart').click();
      cy.get('[data-item="dragon-shield"] .add-to-cart').click();
      cy.get('#view-cart-btn').click();
      cy.get('[data-cart-item="dragon-shield"] .remove-btn').click();
      cy.get('.cart-item').should('have.length', 1);
    });
});
```

## Starter Code

```javascript
describe('The Merchant', () => {
  it('removing an item reduces cart length', () => {
    cy.visit('/pages/level-76/');
    // Hint: use cy.get()
    // Hint: use cy.get()
    // Hint: click the element "#view-cart-btn"
    // Hint: use cy.get()
    // Hint: select ".cart-item" and assert there are 1 of them
  });
});
```
