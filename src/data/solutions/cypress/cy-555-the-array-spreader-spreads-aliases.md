# The Array Spreader — spreads aliases

**Level:** 555
**ID:** `cy-555`
**Difficulty:** medium
**XP:** 200
**Tags:** `.spread`, `.as`, `aliases`, `chaining`


## Objective

Collect multiple aliases and spread them in a then callback.

## Story

Multiple aliases can be collected into an array and spread. The Spreader accesses each aliased subject by name in the callback.

## Hints
1. Store values using .as('name'), then retrieve with cy.get('@name')
2. To spread, collect all aliases first into an array
3. cy.get('@a') and cy.get('@b') return separate subjects — wrap them in an array

## Solution

```javascript
describe('The Array Spreader', () => {
  it('uses spread with multiple wrapped values', () => {
    cy.wrap(['alpha', 'beta', 'gamma']).spread((a, b, c) => {
      expect([a, b, c]).to.deep.eq(['alpha', 'beta', 'gamma']);
    });
  });
});
```

## Starter Code

```javascript
describe('The Array Spreader', () => {
  it('uses spread with multiple wrapped values', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.wrap([]).spread() after collecting multiple values
  });
});
```
