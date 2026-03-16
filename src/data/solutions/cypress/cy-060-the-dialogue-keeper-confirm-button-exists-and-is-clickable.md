# The Dialogue Keeper — confirm button exists and is clickable

**Level:** 60
**ID:** `cy-060`
**Difficulty:** medium
**XP:** 350
**Tags:** `cy.on`, `window:confirm`, `dialog`, `alert`, `event handler`


## Objective

Handle the confirm dialog by returning true, click 'Challenge the Oracle', then assert '#oracle-result' contains 'Challenge Accepted!'.

## Story

The Oracle speaks through dialogs — confirm, alert, and prompt. Cypress handles these with cy.on('window:confirm') — register the handler before the click and the Oracle's secrets are yours.

## Hints
1. Use cy.on('window:confirm', () => true) to automatically accept all confirm dialogs.
2. Register it BEFORE clicking the button that triggers the dialog.
3. Assert the result: cy.get('#oracle-result').should('contain', 'Challenge Accepted!').

## Solution

```javascript
describe('The Dialogue Keeper', () => {
  it('confirm button exists and is clickable', () => {
      cy.visit('/pages/level-12/');
      cy.on('window:confirm', () => true);
      cy.get('#confirm-btn').should('exist').and('be.enabled');
      cy.get('#confirm-btn').click();
    });
});
```

## Starter Code

```javascript
describe('The Dialogue Keeper', () => {
  it('confirm button exists and is clickable', () => {
    cy.visit('/pages/level-12/');
    // Hint: use cy.on()
    // Hint: select "#confirm-btn" and assert it exists in the DOM
    // Hint: click the element "#confirm-btn"
  });
});
```
