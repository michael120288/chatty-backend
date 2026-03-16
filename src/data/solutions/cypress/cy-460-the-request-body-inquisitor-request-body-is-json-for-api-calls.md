# The Request Body Inquisitor — request body is JSON for API calls

**Level:** 460
**ID:** `cy-460`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.intercept`, `request-body`, `POST`, `PATCH`, `spy`


## Objective

Use cy.intercept() to spy on POST and PATCH request bodies and assert that the app sends the correct payload to the server.

## Story

The server sees everything you send. The Request Body Inquisitor intercepts outgoing POST and PATCH requests to assert that your app is sending exactly the right payload — the right fields, the right values, the right structure.

## Hints
1. cy.intercept() without a response handler acts as a spy — the real request still goes to the server but you can inspect it
2. interception.request.body holds the parsed JSON body for requests with Content-Type: application/json
3. Use interception.request.headers to verify the app sets the correct Content-Type and Authorization headers

## Solution

```javascript
describe('The Request Body Inquisitor', () => {
  it('request body is JSON for API calls', () => {
      cy.intercept('POST', '/api/items').as('jsonPost');
      cy.visit('/pages/level-08/');
      cy.get('#add-item-btn').click();
      cy.wait('@jsonPost').its('request.headers.content-type').should('include', 'application/json');
    });
});
```

## Starter Code

```javascript
describe('The Request Body Inquisitor', () => {
  it('request body is JSON for API calls', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#add-item-btn"
    // Hint: wait for a request or timeout
  });
});
```
