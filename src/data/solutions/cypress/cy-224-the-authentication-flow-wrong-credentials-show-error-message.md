# The Authentication Flow — wrong credentials show error message

**Level:** 224
**ID:** `cy-224`
**Difficulty:** hard
**XP:** 525
**Tags:** `e2e`, `authentication`, `redirect`, `login`, `logout`, `localStorage`, `protected-routes`


## Objective

Test the complete auth lifecycle: redirect on no session, successful login, protected dashboard access, and logout.

## Story

Authentication is the gateway to every protected system. A robust E2E auth test verifies the full cycle: an unauthenticated user is redirected to login, valid credentials grant access, the session persists, and logout returns the user to the gate.

## Hints
1. cy.visit('/pages/level-75/') triggers a JS redirect — cy.url() auto-waits for navigation to finish
2. clearLocalStorage() in beforeEach ensures each test starts unauthenticated
3. The logout button clears localStorage and redirects — no server call needed

## Solution

```javascript
describe('The Authentication Flow', () => {
  it('wrong credentials show error message', () => {
      cy.visit('/pages/level-75/login.html');
      cy.get('#login-username').type('wronguser');
      cy.get('#login-password').type('wrongpass');
      cy.get('#login-btn').click();
      cy.get('#login-error').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Authentication Flow', () => {
  it('wrong credentials show error message', () => {
    cy.visit('/pages/level-75/login.html');
    // Hint: type "wronguser" into "#login-username"
    // Hint: type "wrongpass" into "#login-password"
    // Hint: click the element "#login-btn"
    // Hint: select "#login-error" and assert it is visible
  });
});
```
