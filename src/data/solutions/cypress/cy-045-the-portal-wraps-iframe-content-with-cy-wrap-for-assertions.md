# The Portal — wraps iframe content with cy.wrap() for assertions

**Level:** 45
**ID:** `cy-045`
**Difficulty:** medium
**XP:** 350
**Tags:** `iframe`, `cy.get`, `contents`, `cy.wrap`, `same-origin`


## Objective

Access the iframe's inner content and assert the secret code equals 'XYZZY'.

## Story

Beyond the Veil lies an iframe — a portal to another realm within the realm. The true Portal Master knows how to cross frames using Cypress's .then() and .contents().

## Hints
1. Use cy.get('#portal-frame').then($iframe => { ... }) to access the iframe element.
2. Inside the callback, use $iframe.contents().find('#secret-code') to find the element inside the iframe.
3. Wrap it with cy.wrap(...).should('have.text', 'XYZZY') to make the Cypress assertion.

## Solution

```javascript
describe('The Portal', () => {
  it('wraps iframe content with cy.wrap() for assertions', () => {
      cy.visit('/pages/level-09/');
      cy.get('#portal-frame').then(($iframe) => {
        cy.wrap($iframe.contents().find('#secret-code'))
          .should('have.text', 'XYZZY')
          .and('be.visible');
      });
    });
});
```

## Starter Code

```javascript
describe('The Portal', () => {
  it('wraps iframe content with cy.wrap() for assertions', () => {
    cy.visit('/pages/level-09/');
    // Hint: use cy.get()
    // Hint: use cy.wrap()
  });
});
```
