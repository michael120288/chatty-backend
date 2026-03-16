# The Cross-Origin Courier — assertions inside cy.origin

**Level:** 493
**ID:** `cy-493`
**Difficulty:** hard
**XP:** 250
**Tags:** `cy.origin`, `assertions`, `cross-origin`


## Objective

Run should() assertions inside a cy.origin() block.

## Story

All Cypress assertions work inside cy.origin(). The courier verifies text, visibility, and attributes on the foreign page.

## Hints
1. .should() works normally inside cy.origin()
2. cy.contains() also works inside cy.origin()
3. cy.url() inside cy.origin() returns the URL of the new origin

## Solution

```javascript
describe('The Cross-Origin Courier', () => {
  it('runs assertions inside cy.origin', () => {
    cy.origin('http://localhost:5000', () => {
      cy.visit('/pages/level-01/');
      cy.get('h1').should('be.visible');
    });
  });
});
```

## Starter Code

```javascript
describe('The Cross-Origin Courier', () => {
  it('runs assertions inside cy.origin', () => {
    cy.visit('/pages/level-01/');
    // Hint: run cy.get().should() inside cy.origin()
  });
});
```
