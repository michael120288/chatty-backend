# The Authentication Flow — logs in and accesses the protected dashboard

**Level:** 222
**ID:** `cy-222`
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
  it('logs in and accesses the protected dashboard', () => {
      cy.visit('/pages/level-75/login.html');
      cy.get('#login-username').type('archmage');
      cy.get('#login-password').type('fireball123');
      cy.get('#login-btn').click();
      cy.url().should('include', 'dashboard.html');
      cy.get('#dashboard').should('be.visible');
      cy.get('#welcome-msg').should('contain', 'archmage');
    });
});
```

## Starter Code

```javascript
describe('The Authentication Flow', () => {
  it('logs in and accesses the protected dashboard', () => {
    cy.visit('/pages/level-75/login.html');
    // Hint: type "archmage" into "#login-username"
    // Hint: type "fireball123" into "#login-password"
    // Hint: click the element "#login-btn"
    // Hint: use cy.url()
    // Hint: select "#dashboard" and assert it is visible
    // Hint: use cy.get()
  });
});
```
