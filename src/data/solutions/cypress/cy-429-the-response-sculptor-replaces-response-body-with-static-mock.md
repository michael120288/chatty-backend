# The Response Sculptor — replaces response body with static mock

**Level:** 429
**ID:** `cy-429`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.intercept`, `response-modification`, `req.continue`, `real-response`, `handler`


## Objective

Use cy.intercept() with req.continue(res => ...) to modify a real server response — changing the body, status code, and headers — without fully stubbing it.

## Story

Sometimes you do not want to replace a real server response — you want to tweak it. The Response Sculptor uses req.continue() to let the real request fly, then intercepts the response before it hits the browser.

## Hints
1. req.continue(res => ...) sends the real request and gives you the response to modify before the browser sees it
2. res.body, res.statusCode, and res.headers are all writable inside the callback
3. Unlike full stubbing, req.continue() still validates that your real server returns a response
4. Call req.continue() without a callback to simply pass the request through with no modification

## Solution

```javascript
describe('The Response Sculptor', () => {
  it('replaces response body with static mock', () => {
      cy.intercept('GET', '/api/items', { body: { items: ['ghost-blade'] } }).as('staticReq');
      cy.visit('/pages/level-08/');
      cy.wait('@staticReq').its('response.body.items').should('include', 'ghost-blade');
    });
});
```

## Starter Code

```javascript
describe('The Response Sculptor', () => {
  it('replaces response body with static mock', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
  });
});
```
