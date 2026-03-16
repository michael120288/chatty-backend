# The jQuery Conjurer — .val() reads input value

**Level:** 364
**ID:** `cy-364`
**Difficulty:** medium
**XP:** 125
**Tags:** `jquery`, `Cypress.$`, `dom`, `synchronous`, `selectors`, `attributes`


## Objective

Use Cypress.$() to synchronously query DOM elements, read attributes, text, and CSS properties inside .then() callbacks.

## Story

Cypress bundles jQuery and exposes it as Cypress.$. Unlike cy.get() which is async and retries, Cypress.$() queries the DOM synchronously — useful inside .then() callbacks for immediate reads.

## Hints
1. Cypress.$() is synchronous — it reads the DOM state at that exact moment, no retry logic
2. Use it inside .then() callbacks where you already know the DOM is ready
3. Cypress.$(el) wraps a raw DOM element in jQuery, giving you access to .text(), .attr(), etc.

## Solution

```javascript
describe('The jQuery Conjurer', () => {
  it('.val() reads input value', () => {
      cy.visit('/pages/level-78/');
      cy.get('#hero-name').invoke('val').should('equal', 'Aria Stormwind');
    });
});
```

## Starter Code

```javascript
describe('The jQuery Conjurer', () => {
  it('.val() reads input value', () => {
    cy.visit('/pages/level-78/');
    // Hint: use cy.get()
  });
});
```
