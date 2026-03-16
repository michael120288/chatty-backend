# The Great Purge

**Level:** 516
**ID:** `cy-516`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.clearAllCookies`, `cookies`, `test-isolation`, `cleanup`


## Objective

Use cy.clearAllCookies() to remove all cookies.

## Story

Between tests, stale cookies and storage can leak state. The Great Purge uses clearAllCookies, clearAllLocalStorage, and clearAllSessionStorage to wipe the slate clean.

## Hints
1. cy.clearAllCookies() removes all cookies for all domains
2. Cypress already clears cookies between tests by default
3. Use explicitly when you need to clear mid-test

## Solution

```javascript
describe('The Great Purge', () => {
  it('clears all cookies with cy.clearAllCookies', () => {
    cy.setCookie('test', 'value');
    cy.clearAllCookies();
    cy.getAllCookies().should('be.empty');
  });
});
```

## Starter Code

```javascript
describe('The Great Purge', () => {
  it('clears all cookies with cy.clearAllCookies', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.clearAllCookies() then cy.getAllCookies() to verify
  });
});
```
