# The Request Forge — intercept verifies request method

**Level:** 425
**ID:** `cy-425`
**Difficulty:** medium
**XP:** 175
**Tags:** `cy.intercept`, `request-modification`, `headers`, `handler-function`, `interception-object`


## Objective

Use cy.intercept() with a handler function to modify request headers and inspect the full interception object including request URL, method, and response body.

## Story

The requests you send tell the server who you are. The Request Forge teaches you to intercept outgoing requests and reshape them before they ever reach the server — swap headers, change the body, or add custom tokens on the fly.

## Hints
1. cy.intercept() with a handler function (req) => { ... } gives you the live request object to modify before it is sent
2. req.headers, req.body, req.url, and req.method are all writable inside the handler
3. The interception object from cy.wait("@alias") has .request and .response sub-objects with full details
4. Use req.reply({ statusCode, body }) inside the handler to return a custom response immediately without hitting the server

## Solution

```javascript
describe('The Request Forge', () => {
  it('intercept verifies request method', () => {
      cy.intercept('GET', '/api/items').as('getItems');
      cy.visit('/pages/level-08/');
      cy.wait('@getItems').its('request.method').should('equal', 'GET');
    });
});
```

## Starter Code

```javascript
describe('The Request Forge', () => {
  it('intercept verifies request method', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
  });
});
```
