# The Realm Hierarchy — checks treasury gold via data attribute

**Level:** 77
**ID:** `cy-077`
**Difficulty:** medium
**XP:** 175
**Tags:** `.find`, `.children`, `.parent`, `DOM traversal`, `data-attribute`


## Objective

Use DOM traversal commands to verify the Fire Kingdom's active subject and treasury gold, then check the Ice Kingdom's active subject.

## Story

The Realm Hierarchy holds the secrets of two kingdoms. A wise traveler knows how to traverse the DOM tree — using .find(), .children(), .parent(), and .siblings() — to uncover what lies within each kingdom.

## Hints
1. Use .find() to search for descendants inside a scoped element
2. .find('.subject.active') finds the active subject within the kingdom
3. .should('have.attr', 'data-gold', '500') checks a data attribute value

## Solution

```javascript
describe('The Realm Hierarchy', () => {
  it('checks treasury gold via data attribute', () => {
      cy.visit('/pages/level-60/');
      cy.get('#fire-kingdom').find('.treasury').should('have.attr', 'data-gold', '500');
    });
});
```

## Starter Code

```javascript
describe('The Realm Hierarchy', () => {
  it('checks treasury gold via data attribute', () => {
    cy.visit('/pages/level-60/');
    // Hint: use cy.get()
  });
});
```
