# The Interceptor — intercepts with statusCode override

**Level:** 37
**ID:** `cy-037`
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
  it('intercepts with statusCode override', () => {
      cy.intercept('GET', '/api/items', {
        statusCode: 200,
        body: { items: ['shadow-cloak'] }
      }).as('getItemsMocked');
      cy.visit('/pages/level-08/');
      cy.wait('@getItemsMocked');
      cy.get('.item-entry').should('contain', 'shadow-cloak');
    });
});
```

## Starter Code

```javascript
describe('The Interceptor', () => {
  it('intercepts with statusCode override', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
