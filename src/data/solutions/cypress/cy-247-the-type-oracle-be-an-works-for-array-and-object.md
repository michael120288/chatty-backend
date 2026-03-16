# The Type Oracle — be.an works for array and object

**Level:** 247
**ID:** `cy-247`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai`, `types`, `be.a`, `instanceof`, `oneOf`


## Objective

Use be.a / be.an (typeof check), instanceof (class check), and oneOf (membership check).

## Story

What manner of creature is this? The Type Oracle can identify any value by its kind. An array, a string, a class instance — none can hide their true nature.

## Hints
1. For arrays use be.an('array') — typeof [] returns 'object', but Chai special-cases it
2. instanceof checks the prototype chain, not typeof
3. oneOf uses strict equality, so cy.wrap('Mage').should('be.oneOf', ['mage']) fails (case-sensitive)

## Solution

```javascript
describe('The Type Oracle', () => {
  it('be.an works for array and object', () => {
      cy.wrap([1, 2, 3]).should('be.an', 'array');
      cy.wrap({}).should('be.a', 'object');
      cy.wrap(null).should('be.a', 'null');
    });
});
```

## Starter Code

```javascript
describe('The Type Oracle', () => {
  it('be.an works for array and object', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
