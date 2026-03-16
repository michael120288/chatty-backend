# The Stability Ritual — page title is stable across multiple visits

**Level:** 420
**ID:** `cy-420`
**Difficulty:** medium
**XP:** 150
**Tags:** `conditional-testing`, `stability`, `Cypress._.times`, `flakiness`, `non-determinism`, `repetition`


## Objective

Use Cypress._.times() to run repeated test iterations, and write tests that handle non-deterministic UI (the random modal) reliably on every run.

## Story

A test that passes once might be hiding non-determinism. The Stability Ritual uses Cypress._.times() to run the same test dozens of times in one spec — if it fails even once, the instability is exposed.

## Hints
1. Cypress._.times(N, i => ...) is evaluated at parse time — it creates N separate it() blocks in the Cypress UI
2. If a test flickers across runs, the conditional handling inside is incomplete or wrong
3. URL param tests should NEVER flicker — if they do, the page JavaScript has a bug

## Solution

```javascript
describe('The Stability Ritual', () => {
  it('page title is stable across multiple visits', () => {
      Cypress._.times(3, () => {
        cy.visit('/pages/level-82/');
        cy.title().should('be.a', 'string');
      });
    });
});
```

## Starter Code

```javascript
describe('The Stability Ritual', () => {
  it('page title is stable across multiple visits', () => {
    cy.visit('/pages/level-82/');
    // Hint: use cy.title()
  });
});
```
