# The Nested Chronicles — test

**Level:** 329
**ID:** `cy-329`
**Difficulty:** easy
**XP:** 75
**Tags:** `mocha`, `describe`, `context`, `it`, `test-structure`, `nesting`


## Objective

Write a two-level nested test suite using describe(), context(), and it() blocks with at least one assertion in each test.

## Story

Mocha is the test framework Cypress uses under the hood. Every describe(), context(), and it() you write is Mocha. Learn to nest suites, use context() for conditions, and organise tests clearly.

## Hints
1. context() is a pure alias for describe() — they are identical in behaviour
2. Tests can be nested as deeply as you want — each describe creates a new scope
3. The suite name appears in the Cypress run output, so use descriptive strings

## Solution

```javascript
describe('The Guild Registry', () => {
  it()
});
```

## Starter Code

```javascript
describe('The Guild Registry', () => {
  it('test', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
