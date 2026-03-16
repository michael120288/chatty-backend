# The Length Measurer — have.length on DOM collections

**Level:** 264
**ID:** `cy-264`
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
  it('have.length on DOM collections', () => {
      cy.visit('/pages/level-77/');
      cy.get('.member').should('have.length', 3);
      cy.get('.stat').should('have.length', 3);
      cy.get('h1').should('have.length', 1);
    });
});
```

## Starter Code

```javascript
describe('The Length Measurer', () => {
  it('have.length on DOM collections', () => {
    cy.visit('/pages/level-77/');
    // Hint: select ".member" and assert there are 3 of them
    // Hint: select ".stat" and assert there are 3 of them
    // Hint: select "h1" and assert there are 1 of them
  });
});
```
