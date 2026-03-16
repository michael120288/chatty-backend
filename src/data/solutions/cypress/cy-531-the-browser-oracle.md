# The Browser Oracle

**Level:** 531
**ID:** `cy-531`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.browser`, `cross-browser`, `runtime`, `browser-detection`


## Objective

Use Cypress.browser to read the current browser name and version.

## Story

Tests run on Chrome, Firefox, Edge — each with subtle differences. The Browser Oracle uses Cypress.isBrowser() and Cypress.browser to adapt behaviour at runtime.

## Hints
1. Cypress.browser.name returns 'chrome', 'firefox', 'electron', etc.
2. Cypress.browser.version returns the browser version string
3. Cypress.browser.isHeadless is true when running headlessly

## Solution

```javascript
describe('The Browser Oracle', () => {
  it('reads the current browser name', () => {
    expect(Cypress.browser.name).to.be.a('string');
  });
});
```

## Starter Code

```javascript
describe('The Browser Oracle', () => {
  it('reads the current browser name', () => {
    cy.visit('/pages/level-01/');
    // Hint: use Cypress.browser.name and assert it is a string
  });
});
```
