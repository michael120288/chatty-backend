# The Object Sage — have.all.keys checks exact key set

**Level:** 355
**ID:** `cy-355`
**Difficulty:** medium
**XP:** 125
**Tags:** `lodash`, `Cypress._`, `pick`, `omit`, `get`, `merge`, `cloneDeep`, `objects`


## Objective

Use Cypress._ (Lodash) _.pick, _.omit, _.get, _.merge, and _.cloneDeep on objects.

## Story

Objects hold secrets. The Object Sage uses Lodash to pick only the keys needed, omit sensitive data, safely read nested values, and merge configurations without mutation.

## Hints
1. _.pick returns a NEW object with only the specified keys — the original is untouched
2. _.get(obj, 'a.b.c') is safe — it returns undefined instead of throwing if any key is missing
3. _.merge mutates the first argument — use _.merge({}, base, patch) to avoid mutation

## Solution

```javascript
describe('The Object Sage', () => {
  it('have.all.keys checks exact key set', () => {
      cy.wrap({ x: 1, y: 2 }).should('have.all.keys', ['x', 'y']);
      cy.wrap({ name: 'Aria' }).should('have.all.keys', 'name');
    });
});
```

## Starter Code

```javascript
describe('The Object Sage', () => {
  it('have.all.keys checks exact key set', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
