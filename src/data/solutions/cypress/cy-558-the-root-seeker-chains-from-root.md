# The Root Seeker — chains from root

**Level:** 558
**ID:** `cy-558`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.root`, `.find`, `dom`, `absolute-query`


## Objective

Chain .find() from cy.root() to perform an absolute query.

## Story

Starting from the root ensures the selector is not accidentally scoped. The Seeker chains cy.root().find() to perform an absolute DOM query.

## Hints
1. cy.root().find('selector') queries from the document root
2. This overrides any active .within() scope
3. Useful to break out of a scope without ending the within block

## Solution

```javascript
describe('The Root Seeker', () => {
  it('chains .find() from cy.root()', () => {
    cy.visit('/pages/level-01/');
    cy.root().find('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Root Seeker', () => {
  it('chains .find() from cy.root()', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.root().find('body') to query from the root
  });
});
```
