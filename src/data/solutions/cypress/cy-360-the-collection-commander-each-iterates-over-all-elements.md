# The Collection Commander — .each() iterates over all elements

**Level:** 360
**ID:** `cy-360`
**Difficulty:** medium
**XP:** 125
**Tags:** `lodash`, `Cypress._`, `sortBy`, `uniq`, `groupBy`, `chunk`, `orderBy`, `collections`


## Objective

Use Cypress._ (Lodash) _.sortBy, _.uniqBy, _.groupBy, _.chunk, and _.orderBy on collections.

## Story

Arrays of heroes need sorting, deduplication, and grouping. The Collection Commander masters sortBy, uniq, groupBy, chunk, and flatten for all collection operations.

## Hints
1. _.sortBy always sorts ascending — use _.orderBy(['field'], ['desc']) for descending
2. _.uniqBy keeps the FIRST occurrence of each unique value
3. _.groupBy returns an object where keys are the group values and values are arrays

## Solution

```javascript
describe('The Collection Commander', () => {
  it('.each() iterates over all elements', () => {
      cy.visit('/pages/level-77/');
      cy.get('.member').each(($el) => {
        cy.wrap($el).should('be.visible');
      });
    });
});
```

## Starter Code

```javascript
describe('The Collection Commander', () => {
  it('.each() iterates over all elements', () => {
    cy.visit('/pages/level-77/');
    // Hint: use cy.get()
    // Hint: use cy.wrap()
  });
});
```
