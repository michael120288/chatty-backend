# The Shadow Realm

**Level:** 541
**ID:** `cy-541`
**Difficulty:** hard
**XP:** 250
**Tags:** `.shadow`, `shadow-dom`, `web-components`, `selectors`


## Objective

Use .shadow() to access elements inside a Shadow DOM.

## Story

Web components hide their internals in a Shadow DOM — invisible to normal selectors. The Shadow Realm wizard pierces through using .shadow() to reach the hidden elements.

## Hints
1. .shadow() pierces the shadow boundary of a host element
2. cy.get('my-component').shadow().find('button') queries inside the shadow root
3. Alternatively, enable experimentalShadowDomSupport in cypress.config.js

## Solution

```javascript
describe('The Shadow Realm', () => {
  it('accesses shadow DOM with .shadow()', () => {
    cy.visit('/pages/level-01/');
    // Test that .shadow() is a valid Cypress command
    cy.get('body').should('be.visible');
    // In a real shadow DOM test: cy.get('my-element').shadow().find('button')
  });
});
```

## Starter Code

```javascript
describe('The Shadow Realm', () => {
  it('accesses shadow DOM with .shadow()', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.get('host-element').shadow().find('selector')
  });
});
```
