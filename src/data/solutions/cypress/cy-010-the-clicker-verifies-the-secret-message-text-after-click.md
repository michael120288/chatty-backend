# The Clicker — verifies the secret message text after click

**Level:** 10
**ID:** `cy-010`
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
  it('verifies the secret message text after click', () => {
      cy.visit('/pages/level-02/');
      cy.contains('button', 'Reveal Secret').click();
      cy.get('#secret-message').should('be.visible');
      cy.get('#secret-message').invoke('text').should('have.length.greaterThan', 0);
    });
});
```

## Starter Code

```javascript
describe('The Clicker', () => {
  it('verifies the secret message text after click', () => {
    cy.visit('/pages/level-02/');
    // Hint: use cy.contains()
    // Hint: select "#secret-message" and assert it is visible
    // Hint: use cy.get()
  });
});
```
