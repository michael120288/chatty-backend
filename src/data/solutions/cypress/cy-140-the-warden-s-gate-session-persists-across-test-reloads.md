# The Warden's Gate — session persists across test reloads

**Level:** 140
**ID:** `cy-140`
**Difficulty:** hard
**XP:** 200
**Tags:** `cy.session`, `session caching`, `login`, `authentication`, `performance`


## Objective

Use cy.session() to cache the login state and verify the session is restored on the second visit.

## Story

Every adventure begins at the gate. But logging in before every single test wastes precious time. cy.session() caches the browser state after login so it can be restored instantly in subsequent tests.

## Hints
1. cy.session(id, setup) runs the setup function once, then caches the browser state
2. On subsequent calls with the same id, Cypress restores the cached state instead of re-running setup
3. The session cache persists across tests in the same spec, reducing repeated login overhead

## Solution

```javascript
describe('The Warden's Gate', () => {
  it('session persists across test reloads', () => {
      loginToGuild();
      cy.visit('/pages/level-70/');
      cy.reload();
      cy.get('#login-result').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The Warden', () => {
  it('session persists across test reloads', () => {
    cy.visit('/pages/level-70/');
    // Hint: reload the page
    // Hint: select "#login-result" and assert it exists in the DOM
  });
});
```
