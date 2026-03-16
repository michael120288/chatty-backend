# The Error Weaver

**Level:** 446
**ID:** `cy-446`
**Difficulty:** medium
**XP:** 175
**Tags:** `cy.intercept`, `error-states`, `statusCode`, `404`, `500`


## Objective

Use cy.intercept() to stub HTTP error status codes (404, 500, 429) and assert that the app renders the correct error UI for each case.

## Story

Real apps break. The Error Weaver forces your app to confront failure — stubbing 404s, 500s, and 429s to verify that error states, fallback UI, and retry logic all hold up under pressure.

## Hints
1. Pass just statusCode and body in the intercept object — no handler function needed for pure error stubbing
2. The app should render fallback UI (error messages, retry buttons) when it receives a 4xx or 5xx — test for those elements
3. You can add custom headers like retry-after to the stub to simulate real-world rate limit responses

## Solution

```javascript
describe('The Error Weaver', () => {
  it('returns 404 and shows not-found UI', () => {
      cy.intercept('GET', '/api/items', { statusCode: 404, body: { error: 'Not Found' } }).as('notFound');
      cy.visit('/pages/level-08/');
      cy.wait('@notFound');
      cy.get('#error-message').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Error Weaver', () => {
  it('returns 404 and shows not-found UI', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: select "#error-message" and assert it is visible
  });
});
```
