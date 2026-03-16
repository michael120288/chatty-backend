# The Clicker — clicking the button toggles the message

**Level:** 7
**ID:** `cy-007`
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
  it('clicking the button toggles the message', () => {
      cy.visit('/pages/level-02/');
      cy.get('#secret-message').should('not.be.visible');
      cy.contains('button', 'Reveal Secret').click();
      cy.get('#secret-message').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Clicker', () => {
  it('clicking the button toggles the message', () => {
    cy.visit('/pages/level-02/');
    // Hint: use cy.get()
    // Hint: use cy.contains()
    // Hint: select "#secret-message" and assert it is visible
  });
});
```
