# The Interceptor — intercept using wildcard pattern

**Level:** 39
**ID:** `cy-039`
**Difficulty:** medium
**XP:** 300
**Tags:** `cy.intercept`, `network mocking`, `cy.wait`, `alias`, `API mock`


## Objective

Intercept the GET /api/items call and return custom items containing 'dragon-scale'. Then assert the page displays 'dragon-scale'.

## Story

In the Nexus of Networks, requests flow like rivers. Cypress's cy.intercept() is the master of traffic — intercept API calls, forge responses, and control the page's reality.

## Hints
1. cy.intercept() must be set up BEFORE the page visit to intercept the auto-fetch on load.
2. Use cy.wait('@getItems') to wait for the intercepted request to complete.
3. Assert with cy.get('.item-entry').should('contain', 'dragon-scale').

## Solution

```javascript
describe('The Interceptor', () => {
  it('intercept using wildcard pattern', () => {
      cy.intercept('GET', '/api/**', { body: { items: ['rune-stone'] } }).as('anyApi');
      cy.visit('/pages/level-08/');
      cy.wait('@anyApi');
      cy.get('.item-entry').should('contain', 'rune-stone');
    });
});
```

## Starter Code

```javascript
describe('The Interceptor', () => {
  it('intercept using wildcard pattern', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
