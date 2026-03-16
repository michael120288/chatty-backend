# The Comparison Crucible — lessThan asserts strict less than

**Level:** 243
**ID:** `cy-243`
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
  it('lessThan asserts strict less than', () => {
      cy.wrap(42).should('be.lessThan', 50);
      cy.wrap(42).should('be.lt', 43);
      cy.wrap(0).should('be.lessThan', 1);
    });
});
```

## Starter Code

```javascript
describe('The Comparison Crucible', () => {
  it('lessThan asserts strict less than', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
