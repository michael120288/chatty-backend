# The Request Scout — uses API response to drive test setup

**Level:** 413
**ID:** `cy-413`
**Difficulty:** medium
**XP:** 150
**Tags:** `conditional-testing`, `cy.request`, `server-state`, `API`, `deterministic`, `authoritative`


## Objective

Use cy.request() to query server state before the UI loads, then use the response data to drive test assertions deterministically.

## Story

The most reliable source of truth is the server itself. Before touching the UI, send a cy.request() to the API — use the authoritative response to know exactly what the page will show, with zero guesswork.

## Hints
1. cy.request() is synchronous in the Cypress command queue — it completes before the next command runs
2. The .then(response => ...) callback gives you the full response: status, body, headers
3. Real pattern: cy.request() your auth endpoint first, get the user role, then decide which UI flows to test

## Solution

```javascript
describe('The Request Scout', () => {
  it('uses API response to drive test setup', () => {
      cy.request('GET', '/health').then((res) => {
        if (res.body.status === 'ok') {
          cy.log('Server is healthy — running test');
        }
      });
      cy.visit('/pages/level-82/');
      cy.get('body').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Request Scout', () => {
  it('uses API response to drive test setup', () => {
    cy.visit('/pages/level-82/');
    // Hint: select "body" and assert it is visible
  });
});
```
