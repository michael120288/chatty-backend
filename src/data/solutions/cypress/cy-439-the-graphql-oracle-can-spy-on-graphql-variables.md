# The GraphQL Oracle — can spy on GraphQL variables

**Level:** 439
**ID:** `cy-439`
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
  it('can spy on GraphQL variables', () => {
      cy.intercept('POST', '/graphql', (req) => {
        if (req.body.operationName === 'GetHero') {
          expect(req.body.variables).to.have.property('id');
          req.reply({ data: { hero: { name: 'Aria' } } });
        }
      }).as('getHero');
      cy.visit('/pages/level-08/');
      cy.get('#load-hero-btn').click();
      cy.wait('@getHero');
    });
});
```

## Starter Code

```javascript
describe('The GraphQL Oracle', () => {
  it('can spy on GraphQL variables', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#load-hero-btn"
    // Hint: wait for a request or timeout
  });
});
```
