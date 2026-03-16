# The Cross-Origin Courier — cookies across origins

**Level:** 495
**ID:** `cy-495`
**Difficulty:** hard
**XP:** 250
**Tags:** `cy.origin`, `cy.setCookie`, `cookies`, `cross-origin`


## Objective

Set a cookie then use cy.origin() to verify it on the target origin.

## Story

Cookies do not cross origins by default. The courier uses cy.setCookie() before entering the foreign domain.

## Hints
1. cy.setCookie() before cy.origin() sets the cookie for the primary origin
2. Pass cookie values via args if you need them inside cy.origin()
3. cy.getCookie() inside cy.origin() retrieves cookies for that origin

## Solution

```javascript
describe('The Cross-Origin Courier', () => {
  it('sets a cookie before entering cy.origin', () => {
    cy.setCookie('session', 'abc123', { domain: 'localhost' });
    cy.origin('http://localhost:5000', () => {
      cy.visit('/pages/level-01/');
      cy.get('body').should('be.visible');
    });
  });
});
```

## Starter Code

```javascript
describe('The Cross-Origin Courier', () => {
  it('sets a cookie before entering cy.origin', () => {
    cy.visit('/pages/level-01/');
    // Hint: use cy.setCookie() before entering cy.origin()
  });
});
```
