# The Equality Enchantment — eql fails if any field differs

**Level:** 239
**ID:** `cy-239`
**Difficulty:** easy
**XP:** 75
**Tags:** `assertions`, `chai`, `equality`, `equal`, `eql`, `deep.equal`


## Objective

Use equal (strict ===), eql / deep.equal (deep comparison), and not.equal on wrapped values.

## Story

Two values stand before the enchantment circle. Are they truly equal — or merely similar? Chai offers strict and deep equality for your scrutiny.

## Hints
1. equal uses === (strict), so cy.wrap({}).should('equal', {}) FAILS — different references
2. eql does deep value comparison, so cy.wrap({a:1}).should('eql', {a:1}) PASSES
3. deep.equal is an alias for eql — either works

## Solution

```javascript
describe('The Equality Enchantment', () => {
  it('eql fails if any field differs', () => {
      cy.wrap({ a: 1 }).should('not.eql', { a: 2 });
      cy.wrap([1, 2]).should('not.eql', [1, 3]);
    });
});
```

## Starter Code

```javascript
describe('The Equality Enchantment', () => {
  it('eql fails if any field differs', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
