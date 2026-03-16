# The Array Spreader — spreads cookie array

**Level:** 552
**ID:** `cy-552`
**Difficulty:** medium
**XP:** 200
**Tags:** `.spread`, `cy.getCookies`, `cookies`, `arrays`


## Objective

Use .spread() on cy.getCookies() to access individual cookies.

## Story

cy.getCookies() yields an array of cookies. The Spreader extracts each one by position.

## Hints
1. cy.setCookie() then cy.getCookies() then .spread((c1) => { }) works
2. Each spread argument is a cookie object with name, value, domain, etc.
3. .spread() is preferable to .then((cookies) => cookies[0]) for clarity

## Solution

```javascript
describe('The Array Spreader', () => {
  it('spreads getCookies result', () => {
    cy.setCookie('token', 'abc');
    cy.getCookies().spread((cookie) => {
      expect(cookie.name).to.eq('token');
      expect(cookie.value).to.eq('abc');
    });
  });
});
```

## Starter Code

```javascript
describe('The Array Spreader', () => {
  it('spreads getCookies result', () => {
    cy.visit('/pages/level-01/');
    // Hint: set a cookie, then use cy.getCookies().spread(c => { })
  });
});
```
