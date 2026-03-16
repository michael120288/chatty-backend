# The Cross-Origin Courier — navigates back after cy.origin

**Level:** 494
**ID:** `cy-494`
**Difficulty:** hard
**XP:** 250
**Tags:** `cy.origin`, `cy.go`, `navigation`, `cross-origin`


## Objective

Return to the original origin after a cy.origin() block.

## Story

After visiting a foreign domain, the courier returns home. cy.go('back') and cy.visit() restore the original origin.

## Hints
1. After cy.origin() completes, Cypress is back in the primary origin
2. cy.visit() after cy.origin() targets the primary origin again
3. cy.url() outside cy.origin() returns the primary origin URL

## Solution

```javascript
describe('The Cross-Origin Courier', () => {
  it('returns to primary origin after cy.origin', () => {
    cy.visit('/pages/level-01/');
    cy.origin('http://localhost:5000', () => {
      cy.visit('/pages/level-01/');
      cy.get('body').should('be.visible');
    });
    cy.url().should('include', 'localhost');
  });
});
```

## Starter Code

```javascript
describe('The Cross-Origin Courier', () => {
  it('returns to primary origin after cy.origin', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.visit() again after cy.origin() to return
  });
});
```
