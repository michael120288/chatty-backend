# The Interval Slayer — ticking multiple intervals fires handler multiple times

**Level:** 482
**ID:** `cy-482`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.clock`, `cy.tick`, `setInterval`, `debounce`, `fake-timers`


## Objective

Use cy.clock() and cy.tick() to control setInterval and debounced function behavior without waiting for real time to pass.

## Story

Polling loops and debounced inputs run on real time — making them either too slow or too unpredictable to test. The Interval Slayer seizes control of setInterval and setTimeout, then fast-forwards the clock to trigger them on demand.

## Hints
1. cy.clock() with no arguments freezes time at the current moment — use cy.tick(ms) to advance it
2. cy.tick() is synchronous in the Cypress command queue — UI updates happen immediately after ticking
3. Debounced functions need tick(debounceDelay + 1) to fire — tick the clock just past the threshold

## Solution

```javascript
describe('The Interval Slayer', () => {
  it('ticking multiple intervals fires handler multiple times', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.get('#start-counter-btn').click();
      cy.tick(5000);
      cy.get('#counter-display').should('have.text', '5');
    });
});
```

## Starter Code

```javascript
describe('The Interval Slayer', () => {
  it('ticking multiple intervals fires handler multiple times', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#start-counter-btn"
    // Hint: advance the clock
    // Hint: select "#counter-display" and assert its text equals "5"
  });
});
```
