# The Root Seeker

**Level:** 556
**ID:** `cy-556`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.root`, `.root`, `dom`, `scoping`


## Objective

Use cy.root() to get the document root element.

## Story

Every DOM tree has a root. The Root Seeker uses cy.root() to get the document root element, and .root() to get the root within a .within() scope.

## Hints
1. cy.root() yields the <html> element by default
2. Inside cy.within(), cy.root() yields the scoped element instead
3. Useful for resetting scope after deep traversals

## Solution

```javascript
describe('The Root Seeker', () => {
  it('gets the document root with cy.root()', () => {
    cy.visit('/pages/level-01/');
    cy.root().should('match', 'html');
  });
});
```

## Starter Code

```javascript
describe('The Root Seeker', () => {
  it('gets the document root with cy.root()', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.root() and assert it matches 'html'
  });
});
```
