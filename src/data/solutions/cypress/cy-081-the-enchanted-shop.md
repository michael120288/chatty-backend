# The Enchanted Shop

**Level:** 81
**ID:** `cy-081`
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
  it('verifies Dragon Sword name and stock status', () => {
      cy.visit('/pages/level-61/');
      cy.get('#card-sword').within(() => {
        cy.get('.product-name').should('have.text', 'Dragon Sword');
        cy.get('.product-stock').should('have.class', 'in-stock');
      });
    });
});
```

## Starter Code

```javascript
describe('The Enchanted Shop', () => {
  it('verifies Dragon Sword name and stock status', () => {
    cy.visit('/pages/level-61/');
    // Hint: use cy.get()
    // Hint: select ".product-name" and assert its text equals "Dragon Sword"
    // Hint: select ".product-stock" and assert it has class "in-stock"
  });
});
```
