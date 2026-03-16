# The Focus Detective — blur removes focus

**Level:** 549
**ID:** `cy-549`
**Difficulty:** medium
**XP:** 200
**Tags:** `.blur`, `cy.focused`, `focus`, `forms`


## Objective

Use .blur() and verify cy.focused() no longer returns the blurred element.

## Story

Calling .blur() removes focus from an element. The Detective verifies focus is no longer on the element after blurring.

## Hints
1. .blur() removes focus from the currently focused element
2. After blur, cy.focused() may return a different element or fail
3. Blur events trigger validation in many form libraries

## Solution

```javascript
describe('The Focus Detective', () => {
  it('loses focus after calling .blur()', () => {
    cy.visit('/pages/level-03/');
    cy.get('#username').focus().blur();
    cy.get('#username').should('not.have.focus');
  });
});
```

## Starter Code

```javascript
describe('The Focus Detective', () => {
  it('loses focus after calling .blur()', () => {
    cy.visit('/pages/level-03/');
    // Hint: call .focus() then .blur() then check cy.focused() is different
  });
});
```
