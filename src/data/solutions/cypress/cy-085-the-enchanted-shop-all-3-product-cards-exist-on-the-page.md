# The Enchanted Shop — all 3 product cards exist on the page

**Level:** 85
**ID:** `cy-085`
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
  it('all 3 product cards exist on the page', () => {
      cy.visit('/pages/level-61/');
      cy.get('.product-card').should('have.length', 3);
    });
});
```

## Starter Code

```javascript
describe('The Enchanted Shop', () => {
  it('all 3 product cards exist on the page', () => {
    cy.visit('/pages/level-61/');
    // Hint: select ".product-card" and assert there are 3 of them
  });
});
```
