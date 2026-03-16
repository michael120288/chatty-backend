# The Environment Oracle — Cypress.config()

**Level:** 515
**ID:** `cy-515`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.config`, `configuration`, `runtime`, `baseUrl`


## Objective

Use Cypress.config() to read a configuration value at runtime.

## Story

Beyond env vars, the Oracle reads Cypress configuration values at runtime. Cypress.config() exposes timeout, baseUrl, viewportWidth and more.

## Hints
1. Cypress.config('defaultCommandTimeout') returns the default timeout in ms
2. Cypress.config('viewportWidth') returns current viewport width
3. Cypress.config('baseUrl') returns the configured base URL

## Solution

```javascript
describe('The Environment Oracle', () => {
  it('reads a config value with Cypress.config()', () => {
    const timeout = Cypress.config('defaultCommandTimeout');
    expect(timeout).to.be.a('number');
  });
});
```

## Starter Code

```javascript
describe('The Environment Oracle', () => {
  it('reads a config value with Cypress.config()', () => {
    cy.visit('/pages/level-01/');
    // Hint: call Cypress.config('defaultCommandTimeout') and assert it is a number
  });
});
```
