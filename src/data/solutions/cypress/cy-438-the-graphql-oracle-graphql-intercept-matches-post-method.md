# The GraphQL Oracle — GraphQL intercept matches POST method

**Level:** 438
**ID:** `cy-438`
**Difficulty:** hard
**XP:** 225
**Tags:** `cy.intercept`, `graphql`, `operationName`, `POST`, `query-matching`


## Objective

Use cy.intercept() with a handler function to match GraphQL operations by operationName in the POST body and stub responses for specific queries without affecting others.

## Story

GraphQL uses a single endpoint for everything, making URL matching alone useless. The GraphQL Oracle teaches you to peer inside the request body and intercept by operationName — the true identity of each query or mutation.

## Hints
1. GraphQL always POSTs to the same URL — use req.body.operationName inside the handler to distinguish queries from mutations
2. Call req.reply({ data: ... }) to return a stubbed response immediately from inside the handler
3. Call req.continue() for non-matching operations so they reach the real server unmodified
4. Define a reusable helper function like interceptGql(name, data) to avoid repeating the same intercept boilerplate

## Solution

```javascript
describe('The GraphQL Oracle', () => {
  it('GraphQL intercept matches POST method', () => {
      cy.intercept('POST', '/graphql').as('anyGraphql');
      cy.visit('/pages/level-08/');
      cy.get('#load-heroes-btn').click();
      cy.wait('@anyGraphql').its('request.method').should('equal', 'POST');
    });
});
```

## Starter Code

```javascript
describe('The GraphQL Oracle', () => {
  it('GraphQL intercept matches POST method', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#load-heroes-btn"
    // Hint: wait for a request or timeout
  });
});
```
