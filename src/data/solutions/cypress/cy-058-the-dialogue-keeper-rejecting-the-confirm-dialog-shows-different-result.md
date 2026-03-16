# The Dialogue Keeper — rejecting the confirm dialog shows different result

**Level:** 58
**ID:** `cy-058`
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
  it('rejecting the confirm dialog shows different result', () => {
      cy.visit('/pages/level-12/');
      cy.on('window:confirm', () => false);
      cy.get('#confirm-btn').click();
      cy.get('#oracle-result').should('not.contain', 'Challenge Accepted!');
    });
});
```

## Starter Code

```javascript
describe('The Dialogue Keeper', () => {
  it('rejecting the confirm dialog shows different result', () => {
    cy.visit('/pages/level-12/');
    // Hint: use cy.on()
    // Hint: click the element "#confirm-btn"
    // Hint: use cy.get()
  });
});
```
