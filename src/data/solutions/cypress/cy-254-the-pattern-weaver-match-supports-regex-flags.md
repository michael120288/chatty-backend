# The Pattern Weaver — match supports regex flags

**Level:** 254
**ID:** `cy-254`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai`, `strings`, `include`, `match`, `regex`, `have.string`


## Objective

Use include (substring / array membership), match (regex), and have.string on wrapped strings and arrays.

## Story

Words carry power. The Pattern Weaver can sense when a string contains a rune, matches a pattern, or bears a particular mark. Master these string assertions.

## Hints
1. include works on both strings (substring check) and arrays (element check)
2. match takes a regex literal or RegExp object — flags like /i work normally
3. have.string is an alias for include when used on strings

## Solution

```javascript
describe('The Pattern Weaver', () => {
  it('match supports regex flags', () => {
      cy.wrap('ARIA STORMWIND').should('match', /aria/i);
      cy.wrap('Aria123').should('match', /\d+/);
    });
});
```

## Starter Code

```javascript
describe('The Pattern Weaver', () => {
  it('match supports regex flags', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
