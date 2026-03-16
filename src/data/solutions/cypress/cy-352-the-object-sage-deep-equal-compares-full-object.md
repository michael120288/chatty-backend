# The Object Sage — deep.equal compares full object

**Level:** 352
**ID:** `cy-352`
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
  it('deep.equal compares full object', () => {
      cy.wrap({ a: 1, b: 2 }).should('deep.equal', { a: 1, b: 2 });
      cy.wrap({ name: 'Aria' }).should('eql', { name: 'Aria' });
    });
});
```

## Starter Code

```javascript
describe('The Object Sage', () => {
  it('deep.equal compares full object', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
