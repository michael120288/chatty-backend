# The Alias Vault — accesses alias via cy.get(@)

**Level:** 392
**ID:** `cy-392`
**Difficulty:** medium
**XP:** 125
**Tags:** `mocha`, `aliases`, `cy.as`, `this-context`, `beforeEach`, `shared-state`


## Objective

Use cy.wrap().as() to create aliases and access them via this in beforeEach and it blocks using regular functions.

## Story

Mocha's this context lets tests share values through cy.wrap().as() aliases and access them with this.aliasName in subsequent hooks and tests — no variables needed in the outer scope.

## Hints
1. Always use function() not arrow functions when using this.aliasName — arrow functions don't bind 'this'
2. Aliases set in beforeEach are available in every it() test in the same suite
3. cy.get('@alias') retrieves DOM aliases; this.alias retrieves wrapped value aliases

## Solution

```javascript
describe('The Alias Vault', () => {
  it('accesses alias via cy.get(@)', function () {
      cy.get('@hero').should('have.property', 'name', 'Aria');
    });
});
```

## Starter Code

```javascript
describe('The Alias Vault', () => {
  it('accesses alias via cy.get(@)', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
