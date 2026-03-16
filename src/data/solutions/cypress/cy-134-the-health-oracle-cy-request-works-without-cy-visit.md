# The Health Oracle — cy.request works without cy.visit()

**Level:** 134
**ID:** `cy-134`
**Difficulty:** medium
**XP:** 185
**Tags:** `cy.request`, `API testing`, `HTTP`, `response`, `status code`


## Objective

Use cy.request() to call the /health endpoint and assert on the response status and body.

## Story

Not all quests require a browser — some demand speaking directly with the server. cy.request() sends HTTP requests and yields full responses, letting you test APIs without loading any UI.

## Hints
1. cy.request() does not require a page to be loaded
2. The response object has .status, .body, .headers, and .duration properties
3. Use expect(response.body).to.have.property('key') to assert on JSON fields

## Solution

```javascript
describe('The Health Oracle', () => {
  it('cy.request works without cy.visit()', () => {
      // No visit needed — cy.request is a direct HTTP call
      cy.request('GET', '/health').its('status').should('eq', 200);
    });
});
```

## Starter Code

```javascript
describe('The Health Oracle', () => {
  it('cy.request works without cy.visit()', () => {
    cy.visit('/');
    // Hint: make an HTTP request with cy.request()
    // Hint: make an HTTP request with cy.request()
  });
});
```
