# The Health Oracle — response body has a message property

**Level:** 132
**ID:** `cy-132`
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
  it('response body has a message property', () => {
      cy.request('GET', '/health').then((response) => {
        expect(response.body).to.have.property('message');
      });
    });
});
```

## Starter Code

```javascript
describe('The Health Oracle', () => {
  it('response body has a message property', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
