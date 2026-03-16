# The Error Weaver — returns 401 unauthorized and shows login prompt

**Level:** 449
**ID:** `cy-449`
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
  it('returns 401 unauthorized and shows login prompt', () => {
      cy.intercept('GET', '/api/items', { statusCode: 401, body: { error: 'Unauthorized' } }).as('unauthorized');
      cy.visit('/pages/level-08/');
      cy.wait('@unauthorized');
      cy.get('#error-message').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Error Weaver', () => {
  it('returns 401 unauthorized and shows login prompt', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: select "#error-message" and assert it exists in the DOM
  });
});
```
