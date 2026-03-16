# The Change Watcher — change works for multiple mutations in sequence

**Level:** 270
**ID:** `cy-270`
**Difficulty:** medium
**XP:** 125
**Tags:** `assertions`, `chai`, `change`, `increase`, `decrease`, `mutations`


## Objective

Use change, increase, and decrease to assert that a function mutates an object property.

## Story

Magic flows. Numbers shift. The Change Watcher observes mutations — does a function increase, decrease, or change a value? Chai's change assertions capture state transitions.

## Hints
1. change, increase, decrease take (fn, object, propertyName) — they call fn and compare before/after
2. increase requires the value to go UP (not just change), decrease requires it to go DOWN
3. These wrap a function, so pass the function reference without calling it: cy.wrap(fn).should('change', ...)

## Solution

```javascript
describe('The Change Watcher', () => {
  it('change works for multiple mutations in sequence', () => {
      const state = { count: 0, xp: 0 };
      const addOne = () => { state.count++; };
      const gainXP = () => { state.xp += 25; };
      cy.wrap(addOne).should('change', state, 'count');
      cy.wrap(gainXP).should('increase', state, 'xp');
    });
});
```

## Starter Code

```javascript
describe('The Change Watcher', () => {
  it('change works for multiple mutations in sequence', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
