# The Enchanted Shop — verifies Ice Shield is out of stock with disabled button

**Level:** 83
**ID:** `cy-083`
**Difficulty:** medium
**XP:** 180
**Tags:** `.within`, `scoping`, `DOM queries`, `product card`


## Objective

Use .within() to scope queries inside each product card and verify their names, prices, and stock status.

## Story

The enchanted shop sells many wares, but wise shopkeepers know to keep their queries scoped. Using .within(), you can confine your commands to a single product card — no matter how many cards exist on the page.

## Hints
1. .within(callback) scopes all cy commands inside the callback to the subject element
2. Inside .within(), cy.get() only searches within that element's subtree
3. This prevents accidentally selecting elements from other product cards

## Solution

```javascript
describe('The Enchanted Shop', () => {
  it('verifies Ice Shield is out of stock with disabled button', () => {
      cy.visit('/pages/level-61/');
      cy.get('#card-shield').within(() => {
        cy.get('.product-name').should('have.text', 'Ice Shield');
        cy.get('.product-stock').should('have.class', 'out-of-stock');
        cy.get('.buy-btn').should('be.disabled');
      });
    });
});
```

## Starter Code

```javascript
describe('The Enchanted Shop', () => {
  it('verifies Ice Shield is out of stock with disabled button', () => {
    cy.visit('/pages/level-61/');
    // Hint: use cy.get()
    // Hint: select ".product-name" and assert its text equals "Ice Shield"
    // Hint: select ".product-stock" and assert it has class "out-of-stock"
    // Hint: use cy.get()
  });
});
```
