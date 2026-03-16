# The GraphQL Oracle

**Level:** 436
**ID:** `cy-436`
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
  it('intercepts GraphQL POST by operationName', () => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'GetHeroes') {
          req.reply({ data: { heroes: [{ name: 'Aria' }] } });
        }
      }).as('getHeroes');
      cy.visit('/pages/level-08/');
      cy.get('#load-heroes-btn').click();
      cy.wait('@getHeroes').its('request.body.operationName').should('equal', 'GetHeroes');
    });
});
```

## Starter Code

```javascript
describe('The GraphQL Oracle', () => {
  it('intercepts GraphQL POST by operationName', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#load-heroes-btn"
    // Hint: wait for a request or timeout
  });
});
```
