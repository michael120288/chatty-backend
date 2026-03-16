# The Browser Oracle — skips test in specific browser

**Level:** 533
**ID:** `cy-533`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.isBrowser`, `it.skip`, `conditional-testing`, `cross-browser`


## Objective

Use Cypress.isBrowser() to conditionally skip a test.

## Story

The Oracle instructs the test runner to skip a test when running in an incompatible browser.

## Hints
1. Combine Cypress.isBrowser() with it.skip() for conditional skipping
2. if (Cypress.isBrowser('firefox')) return; inside the test body also works
3. This prevents false failures from browser-specific quirks

## Solution

```javascript
describe('The Browser Oracle', () => {
  it('skips the test on Firefox using isBrowser', () => {
    if (Cypress.isBrowser('firefox')) {
      cy.log('Skipping: not supported on Firefox');
      return;
    }
    cy.visit('/pages/level-01/');
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Browser Oracle', () => {
  it('skips the test on Firefox using isBrowser', () => {
    cy.visit('/pages/level-01/');
    // Hint: use if (Cypress.isBrowser('firefox')) { return; } to skip
  });
});
```
