# The Time Freezer — cy.tick() advances frozen time

**Level:** 478
**ID:** `cy-478`
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
  it('cy.tick() advances frozen time', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.tick(5000); // advance 5 seconds
      cy.window().then((win) => {
        expect(win.Date.now()).to.be.greaterThan(0);
      });
    });
});
```

## Starter Code

```javascript
describe('The Time Freezer', () => {
  it('cy.tick() advances frozen time', () => {
    cy.visit('/pages/level-08/');
    // Hint: advance the clock
    // Hint: use cy.window()
  });
});
```
