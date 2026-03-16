# The Truthiness Tribunal — empty array is truthy, not null or undefined

**Level:** 235
**ID:** `cy-235`
**Difficulty:** easy
**XP:** 75
**Tags:** `assertions`, `chai`, `truthiness`, `be.ok`, `be.true`, `be.null`


## Objective

Use be.ok, be.true, be.false, be.null, and be.undefined on wrapped values to complete all assertions.

## Story

The Oracle demands proof. Some values are truthy, some falsy, some null, some undefined. Use Chai's truthiness assertions to pass judgement on each one.

## Hints
1. be.ok is truthy check — 1, 'hello', [], {} all pass; 0, '', null, undefined, false all fail
2. be.true is strict (=== true), not just truthy — cy.wrap(1).should('not.be.true') passes
3. Chain not before any assertion to negate it: .should('not.be.null')

## Solution

```javascript
describe('The Truthiness Tribunal', () => {
  it('empty array is truthy, not null or undefined', () => {
      cy.wrap([]).should('be.ok');
      cy.wrap([]).should('not.be.null');
      cy.wrap([]).should('not.be.undefined');
    });
});
```

## Starter Code

```javascript
describe('The Truthiness Tribunal', () => {
  it('empty array is truthy, not null or undefined', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
