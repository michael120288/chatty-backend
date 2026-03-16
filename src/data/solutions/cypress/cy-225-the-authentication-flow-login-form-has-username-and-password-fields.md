# The Authentication Flow — login form has username and password fields

**Level:** 225
**ID:** `cy-225`
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
  it('login form has username and password fields', () => {
      cy.visit('/pages/level-75/login.html');
      cy.get('#login-username').should('exist').and('be.enabled');
      cy.get('#login-password').should('exist').and('be.enabled');
      cy.get('#login-btn').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Authentication Flow', () => {
  it('login form has username and password fields', () => {
    cy.visit('/pages/level-75/login.html');
    // Hint: select "#login-username" and assert it exists in the DOM
    // Hint: select "#login-password" and assert it exists in the DOM
    // Hint: select "#login-btn" and assert it is visible
  });
});
```
