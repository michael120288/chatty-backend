# The Great Purge — clears all sessionStorage

**Level:** 518
**ID:** `cy-518`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.clearAllSessionStorage`, `sessionStorage`, `test-isolation`, `cleanup`


## Objective

Use cy.clearAllSessionStorage() to remove all sessionStorage entries.

## Story

sessionStorage lasts for the tab session. The Purge eliminates it with cy.clearAllSessionStorage().

## Hints
1. cy.clearAllSessionStorage() clears sessionStorage for all origins
2. cy.getAllSessionStorage() returns current sessionStorage contents
3. sessionStorage is cleared when the tab closes — but Cypress keeps the page open

## Solution

```javascript
describe('The Great Purge', () => {
  it('clears all sessionStorage', () => {
    cy.visit('/pages/level-01/');
    cy.window().then(win => win.sessionStorage.setItem('sk', 'sv'));
    cy.clearAllSessionStorage();
    cy.getAllSessionStorage().should('deep.eq', {});
  });
});
```

## Starter Code

```javascript
describe('The Great Purge', () => {
  it('clears all sessionStorage', () => {
    cy.visit('/pages/level-01/');
    // Hint: set a sessionStorage item, then call cy.clearAllSessionStorage()
  });
});
```
