# The Item Gallery — Each

**Level:** 86
**ID:** `cy-086`
**Difficulty:** medium
**XP:** 180
**Tags:** `.each`, `cy.wrap`, `iteration`, `collections`


## Objective

Use .each() to iterate over all .item-rare elements and verify each one has the correct class and is visible.

## Story

The gallery displays many rare items. A skilled tester never checks them one by one — they wield .each() to iterate over every item and assert on each in turn.

## Hints
1. .each() iterates over each element in the subject collection
2. Use cy.wrap($el) inside the callback to get a Cypress chainable from the jQuery element
3. You can also read $el.text() or $el.attr() inside the each callback

## Solution

```javascript
describe('The Item Gallery — Each', () => {
  it('confirms exactly 3 rare items exist', () => {
      cy.visit('/pages/level-06/');
      cy.get('.item-rare').should('have.length', 3);
    });
});
```

## Starter Code

```javascript
describe('The Item Gallery — Each', () => {
  it('confirms exactly 3 rare items exist', () => {
    cy.visit('/pages/level-06/');
    // Hint: select ".item-rare" and assert there are 3 of them
  });
});
```
