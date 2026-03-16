# The Focus Detective

**Level:** 546
**ID:** `cy-546`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.focused`, `focus`, `accessibility`, `keyboard`


## Objective

Use cy.focused() to get the currently focused element.

## Story

Keyboard navigation and accessibility depend on focus management. The Focus Detective uses cy.focused() to get the currently focused element and assert it is the right one.

## Hints
1. cy.focused() yields the element that currently has focus
2. If no element is focused, cy.focused() fails — use cy.focused({ log: false }) to suppress the error
3. Chain should() on cy.focused() to assert on the focused element

## Solution

```javascript
describe('The Focus Detective', () => {
  it('gets the focused element with cy.focused()', () => {
    cy.visit('/pages/level-03/');
    cy.get('#username').click();
    cy.focused().should('have.id', 'username');
  });
});
```

## Starter Code

```javascript
describe('The Focus Detective', () => {
  it('gets the focused element with cy.focused()', () => {
    cy.visit('/pages/level-03/');
    // Hint: call cy.focused() after clicking/focusing an input
  });
});
```
