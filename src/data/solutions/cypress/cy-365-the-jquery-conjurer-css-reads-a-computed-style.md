# The jQuery Conjurer — .css() reads a computed style

**Level:** 365
**ID:** `cy-365`
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
  it('.css() reads a computed style', () => {
      cy.get('#stats').invoke('css', 'display').should('equal', 'flex');
      cy.get('#stats').invoke('css', 'font-size').should('equal', '16px');
    });
});
```

## Starter Code

```javascript
describe('The jQuery Conjurer', () => {
  it('.css() reads a computed style', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
