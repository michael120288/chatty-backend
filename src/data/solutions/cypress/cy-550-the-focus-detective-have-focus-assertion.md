# The Focus Detective — have.focus assertion

**Level:** 550
**ID:** `cy-550`
**Difficulty:** easy
**XP:** 150
**Tags:** `cy.focused`, `have.focus`, `assertions`, `accessibility`


## Objective

Assert that a specific element has focus using should('have.focus').

## Story

The simplest focus assertion. The Detective uses .should('have.focus') directly on an element.

## Hints
1. .should('have.focus') asserts the element is currently focused
2. .should('not.have.focus') asserts it is not focused
3. This is equivalent to document.activeElement === el

## Solution

```javascript
describe('The Focus Detective', () => {
  it('asserts have.focus on a specific element', () => {
    cy.visit('/pages/level-03/');
    cy.get('#username').focus().should('have.focus');
  });
});
```

## Starter Code

```javascript
describe('The Focus Detective', () => {
  it('asserts have.focus on a specific element', () => {
    cy.visit('/pages/level-03/');
    // Hint: use .focus() then .should('have.focus')
  });
});
```
