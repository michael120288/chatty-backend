# The Type Oracle

**Level:** 246
**ID:** `cy-246`
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
  it('be.a identifies primitive types', () => {
      cy.wrap('hello').should('be.a', 'string');
      cy.wrap(42).should('be.a', 'number');
      cy.wrap(true).should('be.a', 'boolean');
      cy.wrap(() => {}).should('be.a', 'function');
    });
});
```

## Starter Code

```javascript
describe('The Type Oracle', () => {
  it('be.a identifies primitive types', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
