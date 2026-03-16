# The Array Spreader — spreads Promise.all results

**Level:** 553
**ID:** `cy-553`
**Difficulty:** hard
**XP:** 250
**Tags:** `.spread`, `Cypress.Promise`, `promises`, `arrays`


## Objective

Use .spread() after resolving multiple Cypress.Promise values.

## Story

Resolving multiple promises at once yields an array. The Spreader unpacks each resolved value.

## Hints
1. cy.wrap(Promise.all([p1, p2])).spread((r1, r2) => { })
2. Each argument corresponds to a resolved promise
3. Useful when fetching multiple resources in parallel

## Solution

```javascript
describe('The Array Spreader', () => {
  it('spreads results from Promise.all', () => {
    cy.wrap(Promise.all([Promise.resolve(10), Promise.resolve(20)])).spread((a, b) => {
      expect(a).to.eq(10);
      expect(b).to.eq(20);
    });
  });
});
```

## Starter Code

```javascript
describe('The Array Spreader', () => {
  it('spreads results from Promise.all', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.wrap(Promise.all([...])).spread()
  });
});
```
