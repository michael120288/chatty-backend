# The Interval Slayer

**Level:** 481
**ID:** `cy-481`
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
  it('cy.tick() fires setInterval callbacks', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.get('#start-counter-btn').click();
      cy.get('#counter-display').should('have.text', '0');
      cy.tick(1000);
      cy.get('#counter-display').should('have.text', '1');
      cy.tick(1000);
      cy.get('#counter-display').should('have.text', '2');
    });
});
```

## Starter Code

```javascript
describe('The Interval Slayer', () => {
  it('cy.tick() fires setInterval callbacks', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#start-counter-btn"
    // Hint: select "#counter-display" and assert its text equals "0"
    // Hint: advance the clock
    // Hint: select "#counter-display" and assert its text equals "1"
    // Hint: advance the clock
    // Hint: select "#counter-display" and assert its text equals "2"
  });
});
```
