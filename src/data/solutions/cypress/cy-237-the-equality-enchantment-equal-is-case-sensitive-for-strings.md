# The Equality Enchantment — equal is case-sensitive for strings

**Level:** 237
**ID:** `cy-237`
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
  it('equal is case-sensitive for strings', () => {
      cy.wrap('Aria').should('equal', 'Aria');
      cy.wrap('Aria').should('not.equal', 'aria');
    });
});
```

## Starter Code

```javascript
describe('The Equality Enchantment', () => {
  it('equal is case-sensitive for strings', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
