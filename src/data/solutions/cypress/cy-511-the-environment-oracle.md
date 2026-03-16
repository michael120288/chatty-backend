# The Environment Oracle

**Level:** 511
**ID:** `cy-511`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.env`, `environment-variables`, `configuration`, `config`


## Objective

Use Cypress.env() to read an environment variable inside a test.

## Story

Test configuration varies by environment. The Environment Oracle reads from Cypress.env() to keep credentials, URLs, and flags out of test code.

## Hints
1. Cypress.env('KEY') reads a variable set in cypress.config.js env block
2. You can also set env vars via CLI: --env KEY=value
3. Cypress.env() returns all env vars as an object when called with no arguments

## Solution

```javascript
describe('The Environment Oracle', () => {
  it('reads all env variables with Cypress.env()', () => {
    const env = Cypress.env();
    expect(env).to.be.an('object');
  });
});
```

## Starter Code

```javascript
describe('The Environment Oracle', () => {
  it('reads all env variables with Cypress.env()', () => {
    cy.visit('/pages/level-01/');
    // Hint: call Cypress.env() with no args and assert it is an object
  });
});
```
