# The Cookie Keeper — clearCookie removes access

**Level:** 75
**ID:** `cy-075`
**Difficulty:** medium
**XP:** 425
**Tags:** `cy.setCookie`, `cookies`, `cy.reload`, `be.visible`, `session`


## Objective

Set a cookie named 'vault-access' with value 'granted', reload the page, then assert '#vault-content' is visible.

## Story

Cookies are the keys to the kingdom. Cypress's cy.setCookie() forges the perfect cookie. Add the right cookie, reload, and walls become doorways.

## Hints
1. Use cy.setCookie('vault-access', 'granted') to set the cookie.
2. After setting the cookie, call cy.reload() so the page re-reads document.cookie.
3. Assert with cy.get('#vault-content').should('be.visible').

## Solution

```javascript
describe('The Cookie Keeper', () => {
  it('clearCookie removes access', () => {
      cy.visit('/pages/level-15/');
      cy.setCookie('vault-access', 'granted');
      cy.clearCookie('vault-access');
      cy.reload();
      cy.get('#vault-content').should('not.be.visible');
    });
});
```

## Starter Code

```javascript
describe('The Cookie Keeper', () => {
  it('clearCookie removes access', () => {
    cy.visit('/pages/level-15/');
    // Hint: use cy.setCookie()
    // Hint: use cy.clearCookie()
    // Hint: reload the page
    // Hint: use cy.get()
  });
});
```
