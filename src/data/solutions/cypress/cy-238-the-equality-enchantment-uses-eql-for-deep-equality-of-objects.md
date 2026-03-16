# The Equality Enchantment — uses eql for deep equality of objects

**Level:** 238
**ID:** `cy-238`
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
  it('uses eql for deep equality of objects', () => {
      cy.wrap({ name: 'Aria', xp: 100 }).should('eql', { name: 'Aria', xp: 100 });
      cy.wrap([1, 2, 3]).should('eql', [1, 2, 3]);
    });
});
```

## Starter Code

```javascript
describe('The Equality Enchantment', () => {
  it('uses eql for deep equality of objects', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
