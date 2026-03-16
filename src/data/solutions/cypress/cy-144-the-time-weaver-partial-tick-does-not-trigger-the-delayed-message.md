# The Time Weaver — partial tick does not trigger the delayed message

**Level:** 144
**ID:** `cy-144`
**Difficulty:** medium
**XP:** 195
**Tags:** `cy.clock`, `cy.tick`, `setTimeout`, `time control`, `fake timers`


## Objective

Use cy.clock() and cy.tick() to instantly trigger a setTimeout without waiting 3 real seconds.

## Story

Time-based magic — setTimeouts, setIntervals, Date — can make tests flaky and slow. cy.clock() freezes the browser's clock, and cy.tick() advances it precisely, giving you full control over temporal spells.

## Hints
1. cy.clock() must be called BEFORE cy.visit() to take effect on the page
2. cy.tick(ms) advances the fake clock by the given milliseconds
3. cy.clock() controls setTimeout, setInterval, and Date — all at once

## Solution

```javascript
describe('The Time Weaver', () => {
  it('partial tick does not trigger the delayed message', () => {
      cy.clock();
      cy.visit('/pages/level-71/');
      cy.get('#start-timer-btn').click();
      cy.tick(1000); // only 1 second — not enough
      cy.get('#delayed-msg').should('not.be.visible');
      cy.tick(2000); // now 3 seconds total
      cy.get('#delayed-msg').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Time Weaver', () => {
  it('partial tick does not trigger the delayed message', () => {
    cy.visit('/pages/level-71/');
    // Hint: click the element "#start-timer-btn"
    // Hint: advance the clock
    // Hint: use cy.get()
    // Hint: advance the clock
    // Hint: select "#delayed-msg" and assert it is visible
  });
});
```
