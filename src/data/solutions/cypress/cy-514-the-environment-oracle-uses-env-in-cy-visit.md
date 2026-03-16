# The Environment Oracle — uses env in cy.visit()

**Level:** 514
**ID:** `cy-514`
**Difficulty:** medium
**XP:** 200
**Tags:** `Cypress.env`, `cy.visit`, `baseUrl`, `environment-variables`


## Objective

Construct a cy.visit() URL using a value from Cypress.env().

## Story

Base URLs from environment variables keep tests portable. The Oracle constructs the full URL from Cypress.env() before navigating.

## Hints
1. Cypress.config('baseUrl') reads the configured base URL
2. Combine Cypress.env() values to build dynamic paths
3. This pattern makes tests portable across staging/production

## Solution

```javascript
describe('The Environment Oracle', () => {
  it('uses env variable to build a visit URL', () => {
    const base = Cypress.env('BASE_URL') || 'http://localhost:5000';
    cy.visit(`${base}/pages/level-01/`);
    cy.get('body').should('be.visible');
  });
});
```

## Starter Code

```javascript
describe('The Environment Oracle', () => {
  it('uses env variable to build a visit URL', () => {
    cy.visit('${base}/pages/level-01/');
    // Hint: build the URL string using Cypress.env() then pass it to cy.visit()
  });
});
```
