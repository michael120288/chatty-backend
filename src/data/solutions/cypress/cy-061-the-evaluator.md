# The Evaluator

**Level:** 61
**ID:** `cy-061`
**Difficulty:** medium
**XP:** 375
**Tags:** `cy.window`, `its`, `window variable`, `JavaScript context`, `eq`


## Objective

Read window.SECRET_RUNE from the page's JavaScript context and assert it equals 'EXCALIBUR'.

## Story

Not all truths are visible in the DOM. Some secrets live only in the JavaScript realm. Cypress's cy.window() bridges the gap — reach into the browser's window object directly.

## Hints
1. cy.window() yields the browser's window object as a Cypress subject.
2. Chain .its('SECRET_RUNE') to access the property.
3. Assert with .should('eq', 'EXCALIBUR').

## Solution

```javascript
describe('The Evaluator', () => {
  it('reads SECRET_RUNE window variable', () => {
      cy.visit('/pages/level-13/');
      cy.window().its('SECRET_RUNE').should('eq', 'EXCALIBUR');
    });
});
```

## Starter Code

```javascript
describe('The Evaluator', () => {
  it('reads SECRET_RUNE window variable', () => {
    cy.visit('/pages/level-13/');
    // Hint: use cy.window()
  });
});
```
