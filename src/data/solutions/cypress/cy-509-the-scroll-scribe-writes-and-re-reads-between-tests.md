# The Scroll Scribe — writes and re-reads between tests

**Level:** 509
**ID:** `cy-509`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.writeFile`, `cy.readFile`, `state-sharing`, `test-isolation`


## Objective

Write a file in one test and read it back in a subsequent test.

## Story

Data written in one test can be read back in another. The Scribe uses beforeEach and cy.readFile() to share state without brittle globals.

## Hints
1. cy.writeFile in beforeEach is a good pattern for shared test data
2. Avoid using JavaScript variables across tests — prefer cy.readFile()
3. cy.writeFile is synchronous from Cypress's perspective — it completes before the next command

## Solution

```javascript
describe('The Scroll Scribe', () => {
  beforeEach(() => {
    cy.writeFile('/tmp/cy-shared.json', { token: 'abc' });
  });
  it('reads back data written in beforeEach', () => {
    cy.readFile('/tmp/cy-shared.json').its('token').should('eq', 'abc');
  });
});
```

## Starter Code

```javascript
describe('The Scroll Scribe', () => {
  it('reads back data written in beforeEach', () => {
    cy.visit('/pages/level-01/');
    // Hint: write in beforeEach, then read inside the it() block
  });
});
```
