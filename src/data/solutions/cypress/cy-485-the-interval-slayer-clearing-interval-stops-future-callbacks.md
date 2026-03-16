# The Interval Slayer — clearing interval stops future callbacks

**Level:** 485
**ID:** `cy-485`
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
  it('clearing interval stops future callbacks', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.get('#start-counter-btn').click();
      cy.tick(3000);
      cy.get('#counter-display').should('have.text', '3');
      cy.get('#stop-counter-btn').click();
      cy.tick(3000);
      cy.get('#counter-display').should('have.text', '3'); // stopped
    });
});
```

## Starter Code

```javascript
describe('The Interval Slayer', () => {
  it('clearing interval stops future callbacks', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#start-counter-btn"
    // Hint: advance the clock
    // Hint: select "#counter-display" and assert its text equals "3"
    // Hint: click the element "#stop-counter-btn"
    // Hint: advance the clock
    // Hint: select "#counter-display" and assert its text equals "3"
  });
});
```
