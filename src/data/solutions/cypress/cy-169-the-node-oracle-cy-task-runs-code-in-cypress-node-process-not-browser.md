# The Node Oracle — cy.task() runs code in Cypress Node process, not browser

**Level:** 169
**ID:** `cy-169`
**Difficulty:** medium
**XP:** 190
**Tags:** `cy.task`, `Node.js`, `setupNodeEvents`, `server-side`, `bridge`


## Objective

Use cy.task() to log a message, generate a token, and get a server timestamp — all from inside a browser test.

## Story

Sometimes a test needs to cross the boundary between browser and server — reading files, generating tokens, or seeding data. cy.task() is the bridge that lets your test call Node.js code running in Cypress's process.

## Hints
1. cy.task('name', arg) calls a task registered in setupNodeEvents in cypress.config.js
2. Tasks run in Node.js, not in the browser — use them for file I/O, DB seeding, or token generation
3. cy.task() must return a value or null — returning undefined will cause an error

## Solution

```javascript
describe('The Node Oracle', () => {
  it('cy.task() runs code in Cypress Node process, not browser', () => {
      cy.task('log', 'Running in Node, not the browser');
      cy.task('generateToken').should('be.a', 'string');
    });
});
```

## Starter Code

```javascript
describe('The Node Oracle', () => {
  it('cy.task() runs code in Cypress Node process, not browser', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
