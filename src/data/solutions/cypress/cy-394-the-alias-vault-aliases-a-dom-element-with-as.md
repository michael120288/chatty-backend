# The Alias Vault — aliases a DOM element with .as()

**Level:** 394
**ID:** `cy-394`
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
  it('aliases a DOM element with .as()', function () {
      cy.visit('/pages/level-77/');
      cy.get('#guild-panel').as('guild');
      cy.get('@guild').should('be.visible');
      cy.get('@guild').find('.member').should('have.length.at.least', 1);
    });
});
```

## Starter Code

```javascript
describe('The Alias Vault', () => {
  it('aliases a DOM element with .as()', () => {
    cy.visit('/pages/level-77/');
    // Hint: use cy.get()
    // Hint: select "@guild" and assert it is visible
    // Hint: use cy.get()
  });
});
```
