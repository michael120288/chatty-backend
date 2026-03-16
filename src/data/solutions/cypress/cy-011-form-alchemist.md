# Form Alchemist

**Level:** 11
**ID:** `cy-011`
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
  it('fills and submits the login form', () => {
      cy.visit('/pages/level-03/');
      cy.get('#username').type('wizard');
      cy.get('#password').type('playwright123');
      cy.get('#submit-btn').click();
      cy.get('#success-message').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('Form Alchemist', () => {
  it('fills and submits the login form', () => {
    cy.visit('/pages/level-03/');
    // Hint: type "wizard" into "#username"
    // Hint: type "playwright123" into "#password"
    // Hint: click the element "#submit-btn"
    // Hint: select "#success-message" and assert it is visible
  });
});
```
