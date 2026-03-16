# The Scroll Scribe — overwrites fixture file

**Level:** 510
**ID:** `cy-510`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.writeFile`, `fixtures`, `reset`, `test-isolation`


## Objective

Use cy.writeFile() to reset a fixture before a test runs.

## Story

Test fixtures sometimes need resetting. The Scribe overwrites them cleanly before each run.

## Hints
1. cy.writeFile('cypress/fixtures/data.json', { ... }) overwrites the fixture
2. Do this in beforeEach to ensure a clean state
3. cy.fixture() will then read the freshly written version

## Solution

```javascript
describe('The Scroll Scribe', () => {
  it('resets a fixture file using cy.writeFile', () => {
    cy.writeFile('cypress/fixtures/reset.json', { items: [] });
    cy.fixture('reset').its('items').should('have.length', 0);
  });
});
```

## Starter Code

```javascript
describe('The Scroll Scribe', () => {
  it('resets a fixture file using cy.writeFile', () => {
    cy.visit('/pages/level-01/');
    // Hint: write to cypress/fixtures/ to reset test data
  });
});
```
