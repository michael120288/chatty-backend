# The URL Pattern Weaver — intercept with query string in URL

**Level:** 455
**ID:** `cy-455`
**Difficulty:** medium
**XP:** 175
**Tags:** `cy.intercept`, `glob`, `wildcard`, `regex`, `url-pattern`


## Objective

Use glob wildcards and regex patterns in cy.intercept() to match dynamic URLs, and verify which requests are caught by each pattern.

## Story

Not every request has a predictable URL. The URL Pattern Weaver teaches you to match routes using glob wildcards and regex — catching any path that fits the pattern, no matter how dynamic the URL.

## Hints
1. Use ** in a string URL to match any number of path segments: /api/users/** catches /api/users/1, /api/users/1/posts, etc.
2. Pass a RegExp literal as the URL argument: cy.intercept(GET, /pattern/, handler)
3. Each HTTP method needs its own cy.intercept() call — GET and POST on the same URL are independent routes

## Solution

```javascript
describe('The URL Pattern Weaver', () => {
  it('intercept with query string in URL', () => {
      cy.intercept('GET', '/api/items?*').as('withQuery');
      cy.visit('/pages/level-08/?source=test');
      cy.get('#load-items-btn').click();
      cy.get('@withQuery').should('exist');
    });
});
```

## Starter Code

```javascript
describe('The URL Pattern Weaver', () => {
  it('intercept with query string in URL', () => {
    cy.visit('/pages/level-08/?source=test');
    // Hint: click the element "#load-items-btn"
    // Hint: select "@withQuery" and assert it exists in the DOM
  });
});
```
