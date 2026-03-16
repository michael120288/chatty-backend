# The Root Seeker — resets scope with root

**Level:** 560
**ID:** `cy-560`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.root`, `.within`, `scoping`, `reset`


## Objective

Use cy.root() to reset context after navigating deep into the DOM.

## Story

Deep within a complex DOM, the Seeker resets to root to start fresh without ending the within block.

## Hints
1. cy.root() inside .within() returns the scoped container, not the document
2. Outside .within(), cy.root() always yields <html>
3. Use cy.root().find() to restart a query from the top of scope

## Solution

```javascript
describe('The Root Seeker', () => {
  it('uses cy.root() to reset scope after deep traversal', () => {
    cy.visit('/pages/level-01/');
    cy.get('body').within(() => {
      cy.root().find('*').first().should('exist');
    });
  });
});
```

## Starter Code

```javascript
describe('The Root Seeker', () => {
  it('uses cy.root() to reset scope after deep traversal', () => {
    cy.visit('/pages/level-01/');
    // Hint: navigate deep then use cy.root() to reset your query
  });
});
```
