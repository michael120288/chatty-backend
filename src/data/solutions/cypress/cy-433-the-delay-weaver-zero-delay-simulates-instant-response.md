# The Delay Weaver — zero delay simulates instant response

**Level:** 433
**ID:** `cy-433`
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
  it('zero delay simulates instant response', () => {
      cy.intercept('GET', '/api/items', { delay: 0, body: { items: ['fast-item'] } }).as('fastReq');
      cy.visit('/pages/level-08/');
      cy.wait('@fastReq');
      cy.get('.item-entry').should('contain', 'fast-item');
    });
});
```

## Starter Code

```javascript
describe('The Delay Weaver', () => {
  it('zero delay simulates instant response', () => {
    cy.visit('/pages/level-08/');
    // Hint: wait for a request or timeout
    // Hint: use cy.get()
  });
});
```
