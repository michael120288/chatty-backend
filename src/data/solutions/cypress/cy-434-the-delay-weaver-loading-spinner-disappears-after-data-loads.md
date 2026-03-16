# The Delay Weaver — loading spinner disappears after data loads

**Level:** 434
**ID:** `cy-434`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.intercept`, `delay`, `loading-state`, `slow-network`, `network-conditions`


## Objective

Use cy.intercept() with a delay option to simulate slow network responses and assert that loading states and error states appear correctly.

## Story

Not all networks are fast. The Delay Weaver simulates sluggish servers and spotty connections — intercepting requests and injecting delays to verify your app handles loading states gracefully under pressure.

## Hints
1. Add delay: N (milliseconds) to any static intercept response object to simulate slow networks
2. Your loading state UI must render synchronously — assert it immediately after cy.visit() before cy.wait()
3. Combine delay with statusCode and body in the same object to simulate real error scenarios
4. Pass { timeout: N } to cy.wait() when the delay is longer than Cypress's default 4000ms command timeout

## Solution

```javascript
describe('The Delay Weaver', () => {
  it('loading spinner disappears after data loads', () => {
      cy.intercept('GET', '/api/items', { delay: 500, body: { items: ['item'] } }).as('req');
      cy.visit('/pages/level-08/');
      cy.wait('@req');
      cy.get('#loading-spinner').should('not.be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Delay Weaver', () => {
  it('loading spinner disappears after data loads', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
