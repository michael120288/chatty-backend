# The Cookie Oracle — getCookie reads the cookie value

**Level:** 408
**ID:** `cy-408`
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
  it('getCookie reads the cookie value', () => {
      cy.setCookie('returning-user', 'true');
      cy.getCookie('returning-user').should('have.property', 'value', 'true');
    });
});
```

## Starter Code

```javascript
describe('The Cookie Oracle', () => {
  it('getCookie reads the cookie value', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
