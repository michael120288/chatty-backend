# The DOM Detective — handles a dismissible modal if present

**Level:** 398
**ID:** `cy-398`
**Difficulty:** medium
**XP:** 150
**Tags:** `conditional-testing`, `DOM`, `cy.then`, `optional-elements`, `modal`, `resilience`


## Objective

Use cy.get('body').then($body => { if ($body.find(...).length) { ... } }) to handle the random modal gracefully, then continue the test regardless.

## Story

The Crossroads Tavern shows a random Oracle modal on load — sometimes it's there, sometimes it isn't. A naive test that always clicks it will fail 50% of the time. The DOM Detective checks first, then acts.

## Hints
1. cy.get('body').then($body => ...) gives you a synchronous jQuery snapshot of the DOM
2. Check $body.find('#el').css('display') !== 'none' or $body.find('#el').length > 0
3. The key insight: don't assert existence BEFORE the conditional — query inside .then() where you already have the snapshot

## Solution

```javascript
describe('The DOM Detective', () => {
  it('handles a dismissible modal if present', () => {
      cy.get('body').then(($body) => {
        if ($body.find('#welcome-modal').length > 0) {
          cy.get('#welcome-modal').should('be.visible');
          cy.get('#close-modal').click();
          cy.get('#welcome-modal').should('not.be.visible');
        } else {
          cy.log('No modal present — skipping dismissal');
        }
      });
    });
});
```

## Starter Code

```javascript
describe('The DOM Detective', () => {
  it('handles a dismissible modal if present', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
