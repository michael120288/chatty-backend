# The Great Purge — reads all localStorage with getAllLocalStorage

**Level:** 519
**ID:** `cy-519`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.getAllLocalStorage`, `localStorage`, `inspection`, `storage`


## Objective

Use cy.getAllLocalStorage() to inspect all localStorage values.

## Story

Before purging, the Archivist inventories all stored data using cy.getAllLocalStorage().

## Hints
1. cy.getAllLocalStorage() yields { origin: { key: value } }
2. The result is keyed by origin URL
3. Useful for assertions before and after a purge

## Solution

```javascript
describe('The Great Purge', () => {
  it('inspects all localStorage with cy.getAllLocalStorage', () => {
    cy.visit('/pages/level-01/');
    cy.window().then(win => win.localStorage.setItem('hero', 'wizard'));
    cy.getAllLocalStorage().should('be.an', 'object');
  });
});
```

## Starter Code

```javascript
describe('The Great Purge', () => {
  it('inspects all localStorage with cy.getAllLocalStorage', () => {
    cy.visit('/pages/level-01/');
    // Hint: call cy.getAllLocalStorage() and assert the result is an object
  });
});
```
