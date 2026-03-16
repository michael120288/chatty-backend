# The Alias Vault

**Level:** 391
**ID:** `cy-391`
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
  it('accesses alias via this context', function () {
      expect(this.hero.name).to.equal('Aria');
      expect(this.hero.xp).to.equal(500);
    });
});
```

## Starter Code

```javascript
describe('The Alias Vault', () => {
  it('accesses alias via this context', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
