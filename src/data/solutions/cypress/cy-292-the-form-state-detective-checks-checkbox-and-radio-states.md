# The Form State Detective — checks checkbox and radio states

**Level:** 292
**ID:** `cy-292`
**Difficulty:** easy
**XP:** 100
**Tags:** `assertions`, `chai-jquery`, `forms`, `be.checked`, `be.selected`, `be.enabled`, `be.disabled`


## Objective

Use be.checked, be.selected, be.enabled, and be.disabled to verify form element states.

## Story

The enchanted form has checkboxes, selects, and inputs in various states. Some are checked, some selected, some disabled. The Form State Detective reads each one.

## Hints
1. be.checked works on checkboxes and radio buttons — checks the .checked DOM property
2. be.selected targets <option> elements, not the <select> itself
3. be.disabled checks the disabled HTML attribute — works on inputs, buttons, selects

## Solution

```javascript
describe('The Form State Detective', () => {
  it('checks checkbox and radio states', () => {
      cy.get('#archery-check').should('be.checked');
      cy.get('#magic-check').should('not.be.checked');
      cy.get('#stealth-check').should('not.be.checked');
      cy.get('input[name="difficulty"][value="normal"]').should('be.checked');
      cy.get('input[name="difficulty"][value="easy"]').should('not.be.checked');
      cy.get('input[name="difficulty"][value="hard"]').should('not.be.checked');
    });
});
```

## Starter Code

```javascript
describe('The Form State Detective', () => {
  it('checks checkbox and radio states', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
