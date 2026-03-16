# The Dialogue Keeper — registers the dialog handler before the click

**Level:** 57
**ID:** `cy-057`
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
  it('registers the dialog handler before the click', () => {
      cy.visit('/pages/level-12/');
      cy.on('window:confirm', () => true);
      cy.get('#confirm-btn').should('be.visible').click();
      cy.get('#oracle-result').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Dialogue Keeper', () => {
  it('registers the dialog handler before the click', () => {
    cy.visit('/pages/level-12/');
    // Hint: use cy.on()
    // Hint: select "#confirm-btn" and assert it is visible
    // Hint: select "#oracle-result" and assert it is visible
  });
});
```
