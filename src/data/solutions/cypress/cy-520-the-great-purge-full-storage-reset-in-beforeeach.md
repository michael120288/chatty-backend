# The Great Purge — full storage reset in beforeEach

**Level:** 520
**ID:** `cy-520`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.clearAllCookies`, `cy.clearAllLocalStorage`, `cy.clearAllSessionStorage`, `beforeEach`, `test-isolation`


## Objective

Clear all cookies, localStorage and sessionStorage in beforeEach.

## Story

The cleanest tests start with a completely empty state. The Purge runs in beforeEach to guarantee isolation.

## Hints
1. Chain all three clear commands in beforeEach for total isolation
2. This pattern prevents test pollution from any source
3. Cypress default test isolation only handles cookies — do localStorage manually if needed

## Solution

```javascript
describe('The Great Purge', () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });
  it('starts with a fully clean storage state', () => {
    cy.getAllCookies().should('be.empty');
    cy.getAllLocalStorage().should('deep.eq', {});
    cy.getAllSessionStorage().should('deep.eq', {});
  });
});
```

## Starter Code

```javascript
describe('The Great Purge', () => {
  it('starts with a fully clean storage state', () => {
    cy.visit('/pages/level-01/');
    // Hint: call all three cy.clearAll*() methods inside beforeEach
  });
});
```
