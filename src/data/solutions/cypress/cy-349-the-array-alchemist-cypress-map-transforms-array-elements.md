# The Array Alchemist — Cypress._.map transforms array elements

**Level:** 349
**ID:** `cy-349`
**Difficulty:** medium
**XP:** 125
**Tags:** `lodash`, `Cypress._`, `filter`, `map`, `find`, `reject`, `arrays`


## Objective

Use Cypress._ (Lodash) to filter, map, find, reject, and flatten arrays inside Cypress tests.

## Story

Cypress bundles Lodash and exposes it as Cypress._. Inside a test you wield the full power of Lodash on any JavaScript value — filtering heroes, mapping names, finding items by property.

## Hints
1. Cypress._ is the full Lodash library — all methods like _.map, _.filter, _.find are available
2. _.filter(arr, { key: value }) is shorthand for filtering by matching property
3. _.find returns the first match (or undefined); _.filter returns ALL matches

## Solution

```javascript
describe('The Array Alchemist', () => {
  it('Cypress._.map transforms array elements', () => {
      const numbers = [1, 2, 3, 4];
      const doubled = Cypress._.map(numbers, (n) => n * 2);
      cy.wrap(doubled).should('eql', [2, 4, 6, 8]);
    });
});
```

## Starter Code

```javascript
describe('The Array Alchemist', () => {
  it('Cypress._.map transforms array elements', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
