# The Environment Oracle — reads a specific key

**Level:** 512
**ID:** `cy-512`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.env`, `environment-variables`, `config`


## Objective

Read a specific Cypress env key and use its value.

## Story

Each variable has a name. The Oracle reads a specific key and uses it in the test logic.

## Hints
1. Cypress.env('KEY') returns the value for that key, or undefined if not set
2. You can set a default: const val = Cypress.env('KEY') || 'default'
3. Avoid hardcoding secrets — use Cypress.env() instead

## Solution

```javascript
describe('The Environment Oracle', () => {
  it('reads a specific env key with a fallback', () => {
    const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:5000';
    expect(baseUrl).to.be.a('string');
  });
});
```

## Starter Code

```javascript
describe('The Environment Oracle', () => {
  it('reads a specific env key with a fallback', () => {
    cy.visit('/pages/level-01/');
    // Hint: use Cypress.env('SOME_KEY') and handle the undefined case
  });
});
```
