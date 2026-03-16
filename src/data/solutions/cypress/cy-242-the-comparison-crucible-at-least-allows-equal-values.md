# The Comparison Crucible — at.least allows equal values

**Level:** 242
**ID:** `cy-242`
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
  it('at.least allows equal values', () => {
      cy.wrap(100).should('be.at.least', 100);
      cy.wrap(85).should('be.at.least', 85);
      cy.wrap(90).should('be.at.least', 85);
    });
});
```

## Starter Code

```javascript
describe('The Comparison Crucible', () => {
  it('at.least allows equal values', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
