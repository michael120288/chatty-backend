# The Shadow Realm — includeShadowDom option

**Level:** 544
**ID:** `cy-544`
**Difficulty:** hard
**XP:** 250
**Tags:** `.shadow`, `includeShadowDom`, `shadow-dom`, `configuration`


## Objective

Use the includeShadowDom option to pierce shadow DOM without calling .shadow().

## Story

Enable includeShadowDom globally to make cy.get() pierce all shadow roots automatically.

## Hints
1. cy.get('selector', { includeShadowDom: true }) pierces shadow roots globally
2. Set Cypress.config('includeShadowDom', true) to apply globally for a spec
3. This is useful when working with deeply nested web components

## Solution

```javascript
describe('The Shadow Realm', () => {
  it('uses includeShadowDom option on cy.get', () => {
    cy.visit('/pages/level-01/');
    cy.get('body', { includeShadowDom: true }).should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Shadow Realm', () => {
  it('uses includeShadowDom option on cy.get', () => {
    cy.visit('/pages/level-01/');
    // Hint: pass { includeShadowDom: true } to cy.get()
  });
});
```
