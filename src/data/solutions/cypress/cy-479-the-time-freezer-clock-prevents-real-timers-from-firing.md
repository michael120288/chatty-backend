# The Time Freezer — clock prevents real timers from firing

**Level:** 479
**ID:** `cy-479`
**Difficulty:** medium
**XP:** 175
**Tags:** `cy.clock`, `Date.now`, `freeze-time`, `timestamps`, `fake-timers`


## Objective

Use cy.clock() to freeze Date.now() and new Date() at a specific timestamp, and assert that date-dependent UI renders the expected values.

## Story

Date.now() lies — its value changes every millisecond, making date-dependent tests flaky. The Time Freezer locks the clock at a precise moment before the page even loads, so every timestamp is predictable and testable.

## Hints
1. Pass a Unix timestamp (milliseconds) to cy.clock(timestamp) to freeze time at that exact moment
2. cy.clock() must be called BEFORE cy.visit() to freeze time during the initial page load
3. Cypress automatically restores the real clock after each test — call clock.restore() inside the test for early restoration

## Solution

```javascript
describe('The Time Freezer', () => {
  it('clock prevents real timers from firing', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.get('#start-auto-refresh').click();
      // Without cy.tick(), the interval never fires
      cy.get('#refresh-count').should('have.text', '0');
      cy.tick(1000);
      cy.get('#refresh-count').should('have.text', '1');
    });
});
```

## Starter Code

```javascript
describe('The Time Freezer', () => {
  it('clock prevents real timers from firing', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#start-auto-refresh"
    // Hint: advance the clock
    // Hint: select "#refresh-count" and assert its text equals "0"
    // Hint: advance the clock
    // Hint: select "#refresh-count" and assert its text equals "1"
  });
});
```
