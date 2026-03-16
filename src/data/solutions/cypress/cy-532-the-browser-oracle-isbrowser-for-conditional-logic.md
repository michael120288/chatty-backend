# The Browser Oracle — isBrowser() for conditional logic

**Level:** 532
**ID:** `cy-532`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.isBrowser`, `conditional-testing`, `cross-browser`, `browser-detection`


## Objective

Use Cypress.isBrowser() to conditionally run assertions.

## Story

Some features only work in specific browsers. The Oracle uses Cypress.isBrowser() to skip or adjust tests conditionally.

## Hints
1. Cypress.isBrowser('chrome') returns true when running in Chrome
2. Cypress.isBrowser(['chrome', 'edge']) accepts an array
3. Use this for browser-specific feature tests

## Solution

```javascript
describe('The Browser Oracle', () => {
  it('uses isBrowser() to detect the browser', () => {
    const isChrome = Cypress.isBrowser('chrome');
    expect(isChrome).to.be.a('boolean');
  });
});
```

## Starter Code

```javascript
describe('The Browser Oracle', () => {
  it('uses isBrowser() to detect the browser', () => {
    cy.visit('/pages/level-01/');
    // Hint: use Cypress.isBrowser() and assert it returns a boolean
  });
});
```
