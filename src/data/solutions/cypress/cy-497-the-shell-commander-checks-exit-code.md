# The Shell Commander — checks exit code

**Level:** 497
**ID:** `cy-497`
**Difficulty:** medium
**XP:** 200
**Tags:** `cy.exec`, `exit-code`, `shell`


## Objective

Assert that cy.exec() returns exit code 0.

## Story

A command that exits with code 0 succeeded. The Shell Commander always verifies the exit code before trusting the result.

## Hints
1. cy.exec() yields { code, stdout, stderr }
2. .its('code').should('eq', 0) asserts success
3. Non-zero exit codes indicate failure — Cypress will fail the test by default unless failOnNonZeroExit: false

## Solution

```javascript
describe('The Shell Commander', () => {
  it('asserts on exit code from cy.exec', () => {
    cy.exec('echo success').its('code').should('eq', 0);
  });
});
```

## Starter Code

```javascript
describe('The Shell Commander', () => {
  it('asserts on exit code from cy.exec', () => {
    cy.visit('/pages/level-01/');
    // Hint: check .its('code').should('eq', 0)
  });
});
```
