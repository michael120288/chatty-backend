# The Stability Ritual — stable element is visible on every run

**Level:** 417
**ID:** `cy-417`
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
  it('stable element is visible on every run', () => {
      Cypress._.times(3, () => {
        cy.visit('/pages/level-82/');
        cy.get('#main-content').should('exist');
      });
    });
});
```

## Starter Code

```javascript
describe('The Stability Ritual', () => {
  it('stable element is visible on every run', () => {
    cy.visit('/pages/level-82/');
    // Hint: select "#main-content" and assert it exists in the DOM
  });
});
```
