# The Promise Alchemist — resolves stub triggers the UI success state

**Level:** 474
**ID:** `cy-474`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.stub`, `resolves`, `rejects`, `async`, `promises`


## Objective

Use cy.stub().resolves() and cy.stub().rejects() to control async function behavior and test both success and failure code paths.

## Story

Most real functions are async. The Promise Alchemist stubs them to resolve or reject on command — letting you test success paths, error paths, and loading states without ever touching a real server.

## Hints
1. stub.resolves(value) makes the stub return a Promise that resolves with value — no real async code runs
2. stub.rejects(error) makes the stub return a rejected Promise — use try/catch or .catch() to handle it
3. stub.onFirstCall().resolves(...) and stub.onSecondCall().rejects(...) let you simulate retry and failure sequences

## Solution

```javascript
describe('The Promise Alchemist', () => {
  it('resolves stub triggers the UI success state', () => {
      cy.intercept('GET', '/api/items', { body: { items: ['shadow-cloak'] } }).as('req');
      cy.visit('/pages/level-08/');
      cy.wait('@req');
      cy.get('.item-entry').should('contain', 'shadow-cloak');
    });
});
```

## Starter Code

```javascript
describe('The Promise Alchemist', () => {
  it('resolves stub triggers the UI success state', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
