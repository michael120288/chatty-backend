# The Form State Detective — checks selected options in a select

**Level:** 293
**ID:** `cy-293`
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
  it('checks selected options in a select', () => {
      cy.get('#class-select option[value="mage"]').should('be.selected');
      cy.get('#class-select option[value="warrior"]').should('not.be.selected');
      cy.get('#class-select option[value="rogue"]').should('not.be.selected');
    });
});
```

## Starter Code

```javascript
describe('The Form State Detective', () => {
  it('checks selected options in a select', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
