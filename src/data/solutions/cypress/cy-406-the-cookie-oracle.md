# The Cookie Oracle

**Level:** 406
**ID:** `cy-406`
**Difficulty:** easy
**XP:** 125
**Tags:** `conditional-testing`, `cookies`, `cy.setCookie`, `cy.getCookie`, `state`, `returning-user`


## Objective

Use cy.setCookie() to set state before visiting, and cy.getCookie() to read and branch on cookie values inside tests.

## Story

Cookies hold truth. Instead of guessing what the UI will show, read the cookie first — then you know exactly what state to expect. Set a cookie before visiting and the page renders predictably.

## Hints
1. Set cookies with cy.setCookie() BEFORE cy.visit() — cookies must exist when the page loads
2. cy.getCookie() returns null if the cookie doesn't exist — check for this before reading .value
3. cy.clearCookies() in beforeEach ensures each test starts with a clean slate

## Solution

```javascript
describe('The Cookie Oracle', () => {
  it('no returning-user cookie shows first-visit UI', () => {
      cy.clearCookies();
      cy.visit('/pages/level-82/');
      cy.get('#first-visit-msg').should('be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Cookie Oracle', () => {
  it('no returning-user cookie shows first-visit UI', () => {
    cy.visit('/pages/level-82/');
    // Hint: select "#first-visit-msg" and assert it is visible
  });
});
```
