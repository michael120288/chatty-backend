# The Change Watcher — not.change detects no mutation

**Level:** 269
**ID:** `cy-269`
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
  it('not.change detects no mutation', () => {
      const state = { xp: 100 };
      const doNothing = () => {};
      cy.wrap(doNothing).should('not.change', state, 'xp');
    });
});
```

## Starter Code

```javascript
describe('The Change Watcher', () => {
  it('not.change detects no mutation', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
