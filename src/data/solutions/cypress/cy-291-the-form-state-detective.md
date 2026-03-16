# The Form State Detective

**Level:** 291
**ID:** `cy-291`
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
  it('/pages/level-78/');
});
```

## Starter Code

```javascript
describe('The Form State Detective', () => {
  it('/pages/level-78/', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
