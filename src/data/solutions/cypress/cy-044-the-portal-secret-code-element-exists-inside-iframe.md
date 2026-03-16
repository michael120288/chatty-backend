# The Portal — secret code element exists inside iframe

**Level:** 44
**ID:** `cy-044`
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
  it('secret code element exists inside iframe', () => {
      cy.visit('/pages/level-09/');
      cy.get('#portal-frame').then(($iframe) => {
        const el = $iframe.contents().find('#secret-code');
        expect(el.length).to.equal(1);
      });
    });
});
```

## Starter Code

```javascript
describe('The Portal', () => {
  it('secret code element exists inside iframe', () => {
    cy.visit('/pages/level-09/');
    // Hint: use cy.get()
  });
});
```
