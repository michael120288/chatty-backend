# The Browser Oracle — reads browser family

**Level:** 535
**ID:** `cy-535`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.browser`, `family`, `chromium`, `cross-browser`


## Objective

Use Cypress.browser.family to detect the browser rendering engine.

## Story

Chrome, Chromium, and Edge share the same engine. The Oracle identifies the browser family to handle them uniformly.

## Hints
1. Cypress.browser.family is 'chromium' for Chrome, Chromium, Edge
2. Cypress.browser.family is 'firefox' for Firefox
3. Cypress.browser.family is 'webkit' for WebKit-based browsers

## Solution

```javascript
describe('The Browser Oracle', () => {
  it('reads the browser family', () => {
    expect(Cypress.browser.family).to.be.a('string');
  });
});
```

## Starter Code

```javascript
describe('The Browser Oracle', () => {
  it('reads the browser family', () => {
    cy.visit('/pages/level-01/');
    // Hint: assert Cypress.browser.family is a string like 'chromium'
  });
});
```
