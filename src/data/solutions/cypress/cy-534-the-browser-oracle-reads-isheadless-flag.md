# The Browser Oracle — reads isHeadless flag

**Level:** 534
**ID:** `cy-534`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.browser`, `isHeadless`, `CI`, `cross-browser`


## Objective

Read Cypress.browser.isHeadless and use it in a conditional.

## Story

CI runs Cypress headlessly. The Oracle checks Cypress.browser.isHeadless to change behaviour in CI vs local.

## Hints
1. Cypress.browser.isHeadless is true in 'cypress run' mode
2. It is false when running in 'cypress open' mode
3. Use it to skip slow visual assertions in CI

## Solution

```javascript
describe('The Browser Oracle', () => {
  it('reads the isHeadless flag', () => {
    expect(Cypress.browser.isHeadless).to.be.a('boolean');
  });
});
```

## Starter Code

```javascript
describe('The Browser Oracle', () => {
  it('reads the isHeadless flag', () => {
    cy.visit('/pages/level-01/');
    // Hint: assert typeof Cypress.browser.isHeadless === 'boolean'
  });
});
```
