# The Array Alchemist — checks array includes a specific element

**Level:** 347
**ID:** `cy-347`
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
  it('checks array includes a specific element', () => {
      cy.wrap(['fire', 'ice', 'thunder']).should('include', 'ice');
      cy.wrap(['fire', 'ice', 'thunder']).should('not.include', 'earth');
    });
});
```

## Starter Code

```javascript
describe('The Array Alchemist', () => {
  it('checks array includes a specific element', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
