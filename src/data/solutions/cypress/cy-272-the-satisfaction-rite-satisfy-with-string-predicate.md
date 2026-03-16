# The Satisfaction Rite — satisfy with string predicate

**Level:** 272
**ID:** `cy-272`
**Difficulty:** medium
**XP:** 125
**Tags:** `assertions`, `chai`, `satisfy`, `respondTo`, `predicates`, `custom`


## Objective

Use satisfy (custom predicate function) and respondTo (object has a method) to write flexible assertions.

## Story

When standard assertions fall short, the Satisfaction Rite accepts any custom predicate. Define the rule yourself — if the function returns true, the test passes.

## Hints
1. satisfy takes a function that receives the subject — return true to pass, false to fail
2. respondTo checks if the object has a method with that name (own or prototype)
3. You can combine satisfy with not: .should('not.satisfy', fn) for inverse predicate checks

## Solution

```javascript
describe('The Satisfaction Rite', () => {
  it('satisfy with string predicate', () => {
      cy.wrap('ARIA').should('satisfy', (s) => s === s.toUpperCase());
      cy.wrap('Aria').should('not.satisfy', (s) => s === s.toUpperCase());
    });
});
```

## Starter Code

```javascript
describe('The Satisfaction Rite', () => {
  it('satisfy with string predicate', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
