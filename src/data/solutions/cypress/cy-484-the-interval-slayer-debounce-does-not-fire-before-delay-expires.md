# The Interval Slayer — debounce does not fire before delay expires

**Level:** 484
**ID:** `cy-484`
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
  it('debounce does not fire before delay expires', () => {
      cy.clock();
      cy.visit('/pages/level-08/');
      cy.get('#search-input').type('sword');
      cy.tick(100); // not enough
      cy.get('#search-results').should('have.text', '');
      cy.tick(200); // now 300ms total
      cy.get('#search-results').should('not.have.text', '');
    });
});
```

## Starter Code

```javascript
describe('The Interval Slayer', () => {
  it('debounce does not fire before delay expires', () => {
    cy.visit('/pages/level-08/');
    // Hint: type "sword" into "#search-input"
    // Hint: advance the clock
    // Hint: select "#search-results" and assert its text equals ""
    // Hint: advance the clock
    // Hint: use cy.get()
  });
});
```
