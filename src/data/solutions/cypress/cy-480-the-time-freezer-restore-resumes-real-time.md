# The Time Freezer — restore() resumes real time

**Level:** 480
**ID:** `cy-480`
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
  it('restore() resumes real time', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.clock().invoke('restore');
      // After restore, real Date.now() is used
      cy.window().then((win) => {
        expect(win.Date.now()).to.be.closeTo(Date.now(), 1000);
      });
    });
});
```

## Starter Code

```javascript
describe('The Time Freezer', () => {
  it('restore() resumes real time', () => {
    cy.visit('/pages/level-08/');
    // Hint: control the clock
    // Hint: use cy.window()
  });
});
```
