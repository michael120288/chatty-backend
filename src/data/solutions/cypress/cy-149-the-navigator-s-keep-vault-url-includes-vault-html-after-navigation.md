# The Navigator's Keep — vault URL includes vault.html after navigation

**Level:** 149
**ID:** `cy-149`
**Difficulty:** medium
**XP:** 190
**Tags:** `cy.go`, `cy.reload`, `browser history`, `navigation`, `back forward`


## Objective

Use cy.go() to navigate browser history and cy.reload() to refresh the page.

## Story

A navigator knows not only where to go, but how to retrace their steps. cy.go() moves through browser history like the back and forward buttons, while cy.reload() refreshes the current page — essential tools for testing navigation flows.

## Hints
1. cy.go('back') is equivalent to clicking the browser back button
2. cy.go('forward') goes forward in history
3. cy.reload() reloads the current page; pass true for a hard reload bypassing cache

## Solution

```javascript
describe('The Navigator's Keep', () => {
  it('vault URL includes vault.html after navigation', () => {
      cy.visit('/pages/level-72/');
      cy.get('#vault-link').click();
      cy.url().should('include', 'vault.html');
      cy.get('#vault-page').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Navigator', () => {
  it('vault URL includes vault.html after navigation', () => {
    cy.visit('/pages/level-72/');
    // Hint: click the element "#vault-link"
    // Hint: use cy.url()
    // Hint: select "#vault-page" and assert it is visible
  });
});
```
