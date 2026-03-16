# The Great Purge — clears all localStorage

**Level:** 517
**ID:** `cy-517`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.clearAllLocalStorage`, `localStorage`, `test-isolation`, `cleanup`


## Objective

Use cy.clearAllLocalStorage() to remove all localStorage entries.

## Story

localStorage persists between page loads. The Purge sweeps it away with cy.clearAllLocalStorage().

## Hints
1. cy.clearAllLocalStorage() clears localStorage for all origins
2. cy.getAllLocalStorage() returns an object of all local storage by origin
3. Cypress clears localStorage between tests by default

## Solution

```javascript
describe('The Great Purge', () => {
  it('clears all localStorage', () => {
    cy.visit('/pages/level-01/');
    cy.window().then(win => win.localStorage.setItem('key', 'val'));
    cy.clearAllLocalStorage();
    cy.getAllLocalStorage().should('deep.eq', {});
  });
});
```

## Starter Code

```javascript
describe('The Great Purge', () => {
  it('clears all localStorage', () => {
    cy.visit('/pages/level-01/');
    // Hint: set a localStorage item, then call cy.clearAllLocalStorage()
  });
});
```
