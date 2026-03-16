# The Length Measurer — length.at.least and length.at.most

**Level:** 265
**ID:** `cy-265`
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
  it('length.at.least and length.at.most', () => {
      cy.wrap([1, 2, 3]).should('have.length.at.least', 2);
      cy.wrap([1, 2]).should('have.length.at.most', 5);
      cy.wrap('Aria').should('have.length.greaterThan', 3);
    });
});
```

## Starter Code

```javascript
describe('The Length Measurer', () => {
  it('length.at.least and length.at.most', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
