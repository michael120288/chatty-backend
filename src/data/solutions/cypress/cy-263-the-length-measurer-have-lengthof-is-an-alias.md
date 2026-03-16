# The Length Measurer — have.lengthOf is an alias

**Level:** 263
**ID:** `cy-263`
**Difficulty:** easy
**XP:** 75
**Tags:** `assertions`, `chai`, `length`, `have.length`, `lengthOf`, `collections`


## Objective

Use have.length (alias lengthOf) on strings, arrays, and Cypress element collections.

## Story

Size matters in the realm of data. From the length of a party to the number of items in a chest — the Length Measurer counts what others overlook.

## Hints
1. have.length and have.lengthOf are identical — choose whichever reads better
2. On DOM selections cy.get() returns a jQuery collection — have.length checks how many elements matched
3. cy.wrap([]).should('have.length', 0) passes for empty arrays

## Solution

```javascript
describe('The Length Measurer', () => {
  it('have.lengthOf is an alias', () => {
      cy.wrap('Aria').should('have.lengthOf', 4);
      cy.wrap([1, 2, 3]).should('have.lengthOf', 3);
    });
});
```

## Starter Code

```javascript
describe('The Length Measurer', () => {
  it('have.lengthOf is an alias', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
