# The Request Forge — handler can reply with custom body

**Level:** 423
**ID:** `cy-423`
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
  it('handler can reply with custom body', () => {
      cy.intercept('GET', '/api/items', (req) => {
        req.reply({ body: { items: ['custom-item'] } });
      }).as('customReq');
      cy.visit('/pages/level-08/');
      cy.wait('@customReq');
      cy.get('.item-entry').should('contain', 'custom-item');
    });
});
```

## Starter Code

```javascript
describe('The Request Forge', () => {
  it('handler can reply with custom body', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
