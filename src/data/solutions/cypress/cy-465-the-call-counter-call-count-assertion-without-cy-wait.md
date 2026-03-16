# The Call Counter — call count assertion without cy.wait()

**Level:** 465
**ID:** `cy-465`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.intercept`, `@alias.all`, `call-count`, `assertions`, `network-inspection`


## Objective

Use @alias.all to assert the exact number of times a route was called, and verify the payload of specific calls by index.

## Story

How many times did the app call the server? The Call Counter uses @alias.all to retrieve every interception that matched a route, turning vague network activity into precise, countable assertions.

## Hints
1. cy.get("@alias.all") yields an array of every interception for that alias — use .should("have.length", N) to assert call count
2. Access individual calls by index: cy.get("@alias.all").its("0.request.body") for the first call, 1 for the second, etc.
3. No cy.wait() needed before @alias.all if the trigger already completed — but use cy.wait() first when the call is async

## Solution

```javascript
describe('The Call Counter', () => {
  it('call count assertion without cy.wait()', () => {
      cy.intercept('GET', '/api/items').as('getItems');
      cy.visit('/pages/level-08/');
      cy.get('#reload-btn').click();
      cy.get('#reload-btn').click();
      cy.get('@getItems.all').should('have.length', 3);
    });
});
```

## Starter Code

```javascript
describe('The Call Counter', () => {
  it('call count assertion without cy.wait()', () => {
    cy.visit('/pages/level-08/');
    // Hint: click the element "#reload-btn"
    // Hint: click the element "#reload-btn"
    // Hint: select "@getItems.all" and assert there are 3 of them
  });
});
```
