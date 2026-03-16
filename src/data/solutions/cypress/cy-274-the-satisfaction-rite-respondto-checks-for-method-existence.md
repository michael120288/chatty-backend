# The Satisfaction Rite — respondTo checks for method existence

**Level:** 274
**ID:** `cy-274`
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
  it('respondTo checks for method existence', () => {
      const hero = { greet() { return 'Hello!'; }, attack() { return 'Strike!'; } };
      cy.wrap(hero).should('respondTo', 'greet');
      cy.wrap(hero).should('respondTo', 'attack');
      cy.wrap(hero).should('not.respondTo', 'fly');
    });
});
```

## Starter Code

```javascript
describe('The Satisfaction Rite', () => {
  it('respondTo checks for method existence', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
