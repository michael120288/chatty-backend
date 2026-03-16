# The Comparison Crucible — within is inclusive on both ends

**Level:** 245
**ID:** `cy-245`
**Difficulty:** easy
**XP:** 75
**Tags:** `assertions`, `chai`, `comparison`, `greaterThan`, `lessThan`, `within`, `at.least`


## Objective

Use greaterThan (gt), at.least (gte), lessThan (lt), at.most (lte), and within on wrapped numbers.

## Story

The guild's ranking system demands precise comparisons. A hero's power level must exceed a minimum, fall below a maximum, and sit within an acceptable range.

## Hints
1. greaterThan and gt are aliases — pick whichever reads better
2. at.least means >= (greater than OR equal), so cy.wrap(85).should('be.at.least', 85) passes
3. within is inclusive on both ends: within(40, 50) means 40 <= x <= 50

## Solution

```javascript
describe('The Comparison Crucible', () => {
  it('within is inclusive on both ends', () => {
      cy.wrap(85).should('be.within', 80, 90);
      cy.wrap(80).should('be.within', 80, 90);
      cy.wrap(90).should('be.within', 80, 90);
      cy.wrap(42).should('be.within', 40, 50);
    });
});
```

## Starter Code

```javascript
describe('The Comparison Crucible', () => {
  it('within is inclusive on both ends', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
