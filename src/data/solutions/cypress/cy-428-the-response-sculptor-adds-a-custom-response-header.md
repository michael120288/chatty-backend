# The Response Sculptor — adds a custom response header

**Level:** 428
**ID:** `cy-428`
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
  it('adds a custom response header', () => {
      cy.intercept('GET', '/api/items', (req) => {
        req.continue((res) => {
          res.headers['x-custom-header'] = 'test-value';
        });
      }).as('headerReq');
      cy.visit('/pages/level-08/');
      cy.wait('@headerReq').its('response.headers').should('have.property', 'x-custom-header');
    });
});
```

## Starter Code

```javascript
describe('The Response Sculptor', () => {
  it('adds a custom response header', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
  });
});
```
