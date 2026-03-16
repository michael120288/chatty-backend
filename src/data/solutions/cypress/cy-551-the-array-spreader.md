# The Array Spreader

**Level:** 551
**ID:** `cy-551`
**Difficulty:** medium
**XP:** 200
**Tags:** `.spread`, `arrays`, `chaining`, `callbacks`


## Objective

Use .spread() to destructure an array yielded by a Cypress command.

## Story

When a command yields an array, .spread() distributes each item as a separate argument to a callback. The Spreader handles multi-value yields with elegance.

## Hints
1. .spread(fn) calls fn with each array item as a separate argument
2. Like .then() but spreads the array: .spread((a, b) => { })
3. Works on any command that yields an array

## Solution

```javascript
describe('The Array Spreader', () => {
  it('spreads array items as separate callback args', () => {
    cy.wrap([1, 2, 3]).spread((a, b, c) => {
      expect(a).to.eq(1);
      expect(b).to.eq(2);
      expect(c).to.eq(3);
    });
  });
});
```

## Starter Code

```javascript
describe('The Array Spreader', () => {
  it('spreads array items as separate callback args', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.getCookies().spread((c1, c2) => { }) or cy.wrap([1,2]).spread()
  });
});
```
