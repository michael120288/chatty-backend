# The Clicker — asserts button is clickable (enabled)

**Level:** 9
**ID:** `cy-009`
**Difficulty:** medium
**XP:** 150
**Tags:** `cy.contains`, `click`, `be.visible`, `interaction`, `assertions`


## Objective

Click the 'Reveal Secret' button, then assert the secret message is visible.

## Story

Deep in the Forest of Interactions, a mysterious button awaits. Warriors who have mastered the click have unlocked powers beyond imagination. Cypress gives you cy.click() — use it wisely.

## Hints
1. Use cy.contains('button', 'Reveal Secret') to find the button by its text and role.
2. Chain .click() to trigger the click event.
3. After clicking, use cy.get('#secret-message').should('be.visible') to assert the message appeared.

## Solution

```javascript
describe('The Clicker', () => {
  it('asserts button is clickable (enabled)', () => {
      cy.visit('/pages/level-02/');
      cy.contains('button', 'Reveal Secret').should('be.enabled');
      cy.contains('button', 'Reveal Secret').should('not.be.disabled');
    });
});
```

## Starter Code

```javascript
describe('The Clicker', () => {
  it('asserts button is clickable (enabled)', () => {
    cy.visit('/pages/level-02/');
    // Hint: use cy.contains()
    // Hint: use cy.contains()
  });
});
```
