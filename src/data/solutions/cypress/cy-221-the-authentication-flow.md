# The Authentication Flow

**Level:** 221
**ID:** `cy-221`
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
  it('redirects to login when not authenticated', () => {
      cy.visit('/pages/level-75/');
      cy.url().should('include', 'login.html');
      cy.get('#login-form').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Authentication Flow', () => {
  it('redirects to login when not authenticated', () => {
    cy.visit('/pages/level-75/');
    // Hint: use cy.url()
    // Hint: select "#login-form" and assert it is visible
  });
});
```
