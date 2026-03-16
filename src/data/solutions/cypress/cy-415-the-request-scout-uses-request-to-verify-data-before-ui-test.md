# The Request Scout — uses request to verify data before UI test

**Level:** 415
**ID:** `cy-415`
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
  it('uses request to verify data before UI test', () => {
      cy.request('GET', '/health').then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
    });
});
```

## Starter Code

```javascript
describe('The Request Scout', () => {
  it('uses request to verify data before UI test', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
