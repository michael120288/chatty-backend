# The Node Oracle — gets a server timestamp matching ISO date format

**Level:** 168
**ID:** `cy-168`
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
  it('gets a server timestamp matching ISO date format', () => {
      cy.task('getTimestamp').then((ts) => {
        expect(ts).to.match(/^\d{4}-\d{2}-\d{2}/);
      });
    });
});
```

## Starter Code

```javascript
describe('The Node Oracle', () => {
  it('gets a server timestamp matching ISO date format', () => {
    cy.visit('/');
    // Hint: write your Cypress commands here
  });
});
```
