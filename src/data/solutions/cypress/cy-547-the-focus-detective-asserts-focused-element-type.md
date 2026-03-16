# The Focus Detective — asserts focused element type

**Level:** 547
**ID:** `cy-547`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.focused`, `focus`, `.invoke`, `assertions`


## Objective

Assert the tag name of the focused element using cy.focused().

## Story

The Detective checks not just which element is focused, but what kind of element it is.

## Hints
1. cy.focused().invoke('prop', 'tagName') returns the tag name in uppercase
2. cy.focused().should('have.prop', 'tagName', 'INPUT') asserts the tag
3. Or: cy.focused().should('match', 'input') using CSS selector matching

## Solution

```javascript
describe('The Focus Detective', () => {
  it('asserts the focused element is an input', () => {
    cy.visit('/pages/level-03/');
    cy.get('#username').focus();
    cy.focused().should('match', 'input');
  });
});
```

## Starter Code

```javascript
describe('The Focus Detective', () => {
  it('asserts the focused element is an input', () => {
    cy.visit('/pages/level-03/');
    // Hint: use cy.focused().should('match', 'input')
  });
});
```
