# The Environment Oracle — sets an env variable at runtime

**Level:** 513
**ID:** `cy-513`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.env`, `set`, `runtime`, `environment-variables`


## Objective

Set a Cypress env variable at runtime and read it back.

## Story

The Oracle can inscribe new variables during the test run. Cypress.env(key, value) sets a variable for the remainder of the spec.

## Hints
1. Cypress.env('KEY', value) sets the variable for the current spec
2. Changes do not persist beyond the current spec file
3. Useful for sharing state between tests without global variables

## Solution

```javascript
describe('The Environment Oracle', () => {
  it('sets and reads a Cypress env variable at runtime', () => {
    Cypress.env('testToken', 'abc123');
    expect(Cypress.env('testToken')).to.eq('abc123');
  });
});
```

## Starter Code

```javascript
describe('The Environment Oracle', () => {
  it('sets and reads a Cypress env variable at runtime', () => {
    cy.visit('/pages/level-01/');
    // Hint: use Cypress.env('KEY', 'value') to set, then read it back
  });
});
```
