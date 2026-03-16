# The Network Sentinel — @alias.1 gets the second call

**Level:** 445
**ID:** `cy-445`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.intercept`, `cy.wait`, `multiple-requests`, `request-assertions`, `network-inspection`


## Objective

Alias multiple intercepts and use cy.wait() on an array of aliases to assert on request headers, response status codes, response bodies, and call counts.

## Story

In complex pages, multiple requests fly at once. The Network Sentinel waits on several network calls simultaneously, inspects the full request and response objects, and asserts network contracts — not just the UI.

## Hints
1. cy.wait(["@alias1", "@alias2"]) returns an array of interception objects in the same order as the aliases
2. interception.request has .method, .url, .headers, and .body
3. interception.response has .statusCode, .headers, and .body
4. Use cy.get("@alias.all") to get an array of every call to that intercept — great for asserting call counts

## Solution

```javascript
describe('The Network Sentinel', () => {
  it('@alias.1 gets the second call', () => {
      cy.intercept('GET', '/api/items').as('getItems');
      cy.visit('/pages/level-08/');
      cy.get('#reload-btn').click();
      cy.get('@getItems.1').should('have.property', 'request');
    });
});
```

## Starter Code

```javascript
describe('The Network Sentinel', () => {
  it('@alias.1 gets the second call', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#reload-btn"
    // Hint: use cy.get()
  });
});
```
