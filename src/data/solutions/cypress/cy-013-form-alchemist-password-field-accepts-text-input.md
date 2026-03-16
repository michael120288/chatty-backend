# Form Alchemist — password field accepts text input

**Level:** 13
**ID:** `cy-013`
**Difficulty:** medium
**XP:** 175
**Tags:** `cy.type`, `forms`, `input`, `submit`, `be.visible`


## Objective

Fill the login form with username 'wizard' and password 'playwright123', submit it, and assert the success message is visible.

## Story

The Gate of Authentication bars your path. The ancient login ritual requires username, password, and the courage to submit. In Cypress, cy.type() is your quill.

## Hints
1. Use cy.get('#username').type('wizard') and cy.get('#password').type('playwright123') to fill the fields.
2. Click the submit button with cy.get('#submit-btn').click().
3. Assert success with cy.get('#success-message').should('be.visible').

## Solution

```javascript
describe('Form Alchemist', () => {
  it('password field accepts text input', () => {
      cy.visit('/pages/level-03/');
      cy.get('#password').type('playwright123');
      cy.get('#password').should('have.value', 'playwright123');
    });
});
```

## Starter Code

```javascript
describe('Form Alchemist', () => {
  it('password field accepts text input', () => {
    cy.visit('/pages/level-03/');
    // Hint: type "playwright123" into "#password"
    // Hint: select "#password" and assert its value equals "playwright123"
  });
});
```
