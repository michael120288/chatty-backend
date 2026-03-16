# The Warden's Gate — restores session on subsequent visit

**Level:** 138
**ID:** `cy-138`
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
  it('restores session on subsequent visit', () => {
      loginToGuild();
      cy.visit('/pages/level-70/');
      cy.get('#login-result').should('contain', 'restored');
    });
});
```

## Starter Code

```javascript
describe('The Warden', () => {
  it('restores session on subsequent visit', () => {
    cy.visit('/pages/level-70/');
    // Hint: use cy.get()
  });
});
```
