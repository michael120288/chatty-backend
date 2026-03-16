# The Length Measurer

**Level:** 261
**ID:** `cy-261`
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
  it('have.length on strings', () => {
      cy.wrap('Aria').should('have.length', 4);
      cy.wrap('').should('have.length', 0);
      cy.wrap('hello world').should('have.length', 11);
    });
});
```

## Starter Code

```javascript
describe('The Length Measurer', () => {
  it('have.length on strings', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
