# The Form State Detective — checks enabled and disabled states

**Level:** 294
**ID:** `cy-294`
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
  it('checks enabled and disabled states', () => {
      cy.get('#hero-name').should('be.enabled');
      cy.get('#save-btn').should('be.enabled');
      cy.get('#hero-id').should('be.disabled');
      cy.get('#locked-btn').should('be.disabled');
      cy.get('#stealth-check').should('be.disabled');
      cy.get('#search-input').should('be.enabled');
      cy.get('#class-select').should('be.enabled');
    });
});
```

## Starter Code

```javascript
describe('The Form State Detective', () => {
  it('checks enabled and disabled states', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
