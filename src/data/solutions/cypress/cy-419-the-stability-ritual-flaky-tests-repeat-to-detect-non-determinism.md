# The Stability Ritual — flaky tests repeat to detect non-determinism

**Level:** 419
**ID:** `cy-419`
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
  it('flaky tests repeat to detect non-determinism', () => {
      Cypress._.times(2, (i) => {
        cy.visit('/pages/level-82/?variant=a');
        cy.get('#variant-a').should('be.visible');
        cy.log('Stability check ' + (i + 1));
      });
    });
});
```

## Starter Code

```javascript
describe('The Stability Ritual', () => {
  it('flaky tests repeat to detect non-determinism', () => {
    cy.visit('/pages/level-82/?variant=a');
    // Hint: select "#variant-a" and assert it is visible
    // Hint: use cy.log()
  });
});
```
