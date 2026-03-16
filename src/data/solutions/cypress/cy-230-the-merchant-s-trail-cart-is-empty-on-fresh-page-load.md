# The Merchant's Trail — cart is empty on fresh page load

**Level:** 230
**ID:** `cy-230`
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
  it('cart is empty on fresh page load', () => {
      cy.visit('/pages/level-76/');
      cy.get('#cart-count').should('have.text', '0');
    });
});
```

## Starter Code

```javascript
describe('The Merchant', () => {
  it('cart is empty on fresh page load', () => {
    cy.visit('/pages/level-76/');
    // Hint: select "#cart-count" and assert its text equals "0"
  });
});
```
