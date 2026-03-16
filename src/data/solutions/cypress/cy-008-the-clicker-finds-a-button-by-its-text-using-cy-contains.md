# The Clicker — finds a button by its text using cy.contains

**Level:** 8
**ID:** `cy-008`
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
  it('finds a button by its text using cy.contains', () => {
      cy.visit('/pages/level-02/');
      cy.contains('Reveal Secret').should('exist');
      cy.contains('button', 'Reveal Secret').should('have.attr', 'type', 'button');
    });
});
```

## Starter Code

```javascript
describe('The Clicker', () => {
  it('finds a button by its text using cy.contains', () => {
    cy.visit('/pages/level-02/');
    // Hint: find an element containing the text "Reveal Secret"
    // Hint: use cy.contains()
  });
});
```
