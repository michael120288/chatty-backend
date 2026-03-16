# The Time Weaver — delayed message is hidden before tick

**Level:** 142
**ID:** `cy-142`
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
  it('delayed message is hidden before tick', () => {
      cy.clock();
      cy.visit('/pages/level-71/');
      cy.get('#delayed-msg').should('not.be.visible');
      cy.get('#start-timer-btn').click();
      cy.get('#delayed-msg').should('not.be.visible'); // still hidden
      cy.tick(3000);
      cy.get('#delayed-msg').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Time Weaver', () => {
  it('delayed message is hidden before tick', () => {
    cy.visit('/pages/level-71/');
    // Hint: use cy.get()
    // Hint: click the element "#start-timer-btn"
    // Hint: use cy.get()
    // Hint: advance the clock
    // Hint: select "#delayed-msg" and assert it is visible
  });
});
```
